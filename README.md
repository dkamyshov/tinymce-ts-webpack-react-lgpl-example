# tinymce-ts-webpack-react-lgpl-example

According to LGPL, you can't statically link LGPL-licensed libraries with your code without releasing it under LGPL license.

Here is the situation I found myself in:

1. I desperately need `tinymce` in my app.
2. The app is proprietary.
3. The app is only available in the organization network, which is restricted (no access to the Internet).

The default option of including a `<script src="https://cdn.tiny.cloud/..."></script>` is not available. The second best option of `import tinymce from 'tinymce';` is also not available, because it still forces me to provide some means of "relinking" ("rebuilding", even) `tinymce` with the app.

So here's the solution I came up with:

1. Install `tinymce` from NPM **but** instead of importing it directly into the app, place (copy, without any modifications) the necessary files somewhere in the webserver's filesystem.

   This allows for easy "relinking" (we use Docker, so it basically is just a matter of mounting a volume with another distribution of `tinymce` inside the container [`-v /path/to/local/tinymce:/var/www/html/js/thirdparty/tinymce`] **or** building a new image from the base):

   ```Dockerfile
   FROM my-app
   COPY tinymce/ /var/www/html/js/thirdparty/tinymce/
   # That's it!
   ```

2. Dynamically load `tinymce` and then proceed as usual (`tinymce.init(...)`) (not with `import(...)`, though, because it still is "static linking").

This solution should fall under the "dynamic linking" category. This repo is a proof-of-concept of how you can approach such a problem if you use webpack (how to configure the bundler correctly), TypeScript (how to resolve `tinymce`'s types correctly) and React.
