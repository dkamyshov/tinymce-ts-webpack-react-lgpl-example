import React from "react";
import type { Editor } from "tinymce"; // this does not violate LGPL
import { loadScript } from "./loadScript";

// Please use more sophisticated global state in production.
let loader: Promise<void> | null = null;

export const useTinyMCE = (
  ref: React.RefObject<HTMLTextAreaElement>,
  rootTinyMCEUrl: string,
  tinyMCEScriptUrl: string
) => {
  const editorRef = React.useRef<Editor[] | null>(null);
  const [isTinyMCELoaded, setIsTinyMCELoaded] = React.useState(false);

  React.useEffect(() => {
    if (!isTinyMCELoaded) {
      const task = loader ?? loadScript(tinyMCEScriptUrl);
      loader = task;

      task.then(() => {
        setIsTinyMCELoaded(true);

        const targetElement = ref.current;

        if (targetElement !== null) {
          tinymce
            .init({
              target: targetElement,
              base_url: rootTinyMCEUrl,
            })
            .then((editors) => {
              editorRef.current = editors;
            });
        }
      });
    }
  }, [isTinyMCELoaded, ref]);

  React.useEffect(() => {
    const editors = editorRef.current;

    if (editors !== null) {
      editors.forEach((editor) => {
        tinymce.remove(editor);
      });
    }
  }, [editorRef]);
};
