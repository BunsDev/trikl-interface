import React, { Component, useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "./TextEditorStyle.css";

// TOOLBAR ICONS
import boldIcon from "../../../../assets/bold-icon.png";
import italicIcon from "../../../../assets/italic-icon.png";
import underlineIcon from "../../../../assets/underline-icon.png";
import listIcon from "../../../../assets/list-icon.png";
import leftAlignIcon from "../../../../assets/left-align-icon.png";
import centerAlignIcon from "../../../../assets/center-align-icon.png";
import colorIcon from "../../../../assets/color-icon.png";
import imageIcon from "../../../../assets/image-icon.png";

const TextEditor = ({ aboutMsg, setAboutMsg }) => {
  let editorState = EditorState.createEmpty();
  const [description, setDescription] = useState(editorState);
  const onEditorStateChange = (editorState) => {
    setDescription(editorState);
  };

  setAboutMsg(draftToHtml(convertToRaw(description.getCurrentContent())));

  return (
    <div className="w-full mx-auto text-left h-[20rem] flex flex-col gap-10">
      <Editor
        editorState={description}
        toolbar={{
          options: ["inline", "blockType", "list", "textAlign", "image"],
          inline: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ["bold", "italic", "underline"],
            bold: { icon: boldIcon, className: "editor-icon" },
            italic: { icon: italicIcon, className: "editor-icon" },
            underline: { icon: underlineIcon, className: "editor-icon" },
          },
          blockType: {
            inDropdown: true,
            options: ["Normal", "Blockquote", "Code"],
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
          },
          fontSize: {
            options: [8, 9, 10, 11, 12, 14, 16, 18, 20],
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
          },
          list: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ["unordered"],
            unordered: { icon: listIcon, className: "editor-icon" },
          },
          textAlign: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ["left", "center"],
            left: { icon: leftAlignIcon, className: "editor-icon" },
            center: { icon: centerAlignIcon, className: "editor-icon" },
          },
          colorPicker: {
            icon: colorIcon,
            className: "editor-icon",
            component: undefined,
            popupClassName: undefined,
            colors: [
              "rgb(97,189,109)",
              "rgb(26,188,156)",
              "rgb(84,172,210)",
              "rgb(44,130,201)",
              "rgb(147,101,184)",
              "rgb(71,85,119)",
              "rgb(204,204,204)",
              "rgb(65,168,95)",
              "rgb(0,168,133)",
              "rgb(61,142,185)",
              "rgb(41,105,176)",
              "rgb(85,57,130)",
              "rgb(40,50,78)",
              "rgb(0,0,0)",
              "rgb(247,218,100)",
              "rgb(251,160,38)",
              "rgb(235,107,86)",
              "rgb(226,80,65)",
              "rgb(163,143,132)",
              "rgb(239,239,239)",
              "rgb(255,255,255)",
              "rgb(250,197,28)",
              "rgb(243,121,52)",
              "rgb(209,72,65)",
              "rgb(184,49,47)",
              "rgb(124,112,107)",
              "rgb(209,213,216)",
            ],
          },
          image: {
            icon: imageIcon,
            className: "editor-icon",
            component: undefined,
            popupClassName: undefined,
            urlEnabled: true,
            uploadEnabled: true,
            alignmentEnabled: true,
            uploadCallback: undefined,
            previewImage: false,
            inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
            alt: { present: false, mandatory: false },
            defaultSize: {
              height: "auto",
              width: "auto",
            },
          },
        }}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
};

export default TextEditor;
