import Header from "@editorjs/header";
import Checklist from "@editorjs/checklist";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import Quote from "@editorjs/quote";

import SimpleImage from "./simple-image";
import "./simple-image.css";

const PostEditorConfig = () => {
  return {
    holder: "editorjs",
    placeholder: "What's happening in Web 3.0?",

    tools: {
      header: {
        class: Header,
        config: {
          placeholder: "Enter a header",
          levels: [2, 3, 4],
          defaultLevel: 3,
        },
      },

      image: {
        class: SimpleImage,
        inlineToolbar: true,
      },

      list: {
        class: List,
        inlineToolbar: true,
        config: {
          defaultStyle: "unordered",
        },
      },

      embed: {
        class: Embed,
        config: {
          services: {
            youtube: true,
            coub: false,
            facebook: false,
            instagram: false,
            twitter: false,
            vimeo: true,
            miro: false,
            gfycat: false,
            imgur: false,
            vine: false,
            codepen: false,
            pinterest: false,
          },
        },
      },

      quote: {
        class: Quote,
        inlineToolbar: true,
        shortcut: "CMD+SHIFT+O",
        config: {
          quotePlaceholder: "Enter a quote",
          captionPlaceholder: "Quote's author",
        },
      },

      checklist: {
        class: Checklist,
        inlineToolbar: true,
      },
    },

    onReady: () => {
      console.log("Post editor is ready to work!");
    },
  };
};

export default PostEditorConfig;
