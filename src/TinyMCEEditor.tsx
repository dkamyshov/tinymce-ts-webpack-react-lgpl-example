import React from "react";
import { useTinyMCE } from "./useTinyMCE";

export const TinyMCEEditor = React.memo(() => {
  const ref = React.useRef<HTMLTextAreaElement>(null);

  const rootTinyMCEUrl = `js/thirdparty/tinymce/${TINYMCE_CACHE_BUSTING_TOKEN}`;
  const tinyMCEScriptUrl = `${rootTinyMCEUrl}/tinymce.min.js`;

  useTinyMCE(ref, rootTinyMCEUrl, tinyMCEScriptUrl);

  return <textarea ref={ref} />;
});
