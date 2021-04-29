const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Terser = require("terser-webpack-plugin");

const getTinyMCERelatedConfigOptions = () => {
  // The "cache-busting token" is used here because we can't reliably
  // use the "[contenthash]" from "CopyWebpackPlugin.patterns[].to" as
  // it is not available to user-code in runtime.
  // I use TinyMCE's version, you can use whatever you like: commit ID,
  // build timestamp or even opt-out of cache-busting entirely.
  const TINYMCE_CACHE_BUSTING_TOKEN = require("tinymce/package.json").version;

  const tinymceCopyWebpackPlugin = new CopyWebpackPlugin({
    patterns: [
      {
        from: path.dirname(require.resolve("tinymce/package.json")),
        to: `js/thirdparty/tinymce/${TINYMCE_CACHE_BUSTING_TOKEN}/`,
      },
    ],
  });

  return {
    TINYMCE_CACHE_BUSTING_TOKEN,
    tinymceCopyWebpackPlugin,
  };
};

const tinymceOptions = getTinyMCERelatedConfigOptions();

module.exports = {
  mode: "development",
  devtool: "source-map",

  entry: "./src/index.tsx",

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
    ],
  },

  optimization: {
    minimize: true,
    minimizer: [
      // webpack minimizes assets emitted by CopyWebpackPlugin
      // by default, disable that to comply with LGPL
      new Terser({
        exclude: /js[/\\]thirdparty[/\\]tinymce/,
      }),
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      TINYMCE_CACHE_BUSTING_TOKEN: JSON.stringify(
        tinymceOptions.TINYMCE_CACHE_BUSTING_TOKEN
      ),
    }),

    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),

    tinymceOptions.tinymceCopyWebpackPlugin,
  ],
};
