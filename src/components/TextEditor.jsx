import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import styled from "styled-components";
import "quill/dist/quill.snow.css";

const EditorWrapper = styled.div`
  .ql-editor strong {
    font-weight: bold !important;
  }
  .ql-editor em {
    font-style: italic !important;
  }
  .ql-editor u {
    text-decoration: underline !important;
  }
`;

const modules = {
  toolbar: [
    ["bold", "italic", "underline"],
    [{ align: "" }, { align: "center" }, { align: "right" }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ background: [] }],
  ],
};

const fontMap = {
  "Noto Sans": "Noto Sans KR",
  Pretendard: "Pretendard",
  나눔명조: "Nanum Myeongjo",
  "나눔손글씨 손편지체": "Nanum Pen Script",
};

function TextEditor({ onChange, font }) {
  const { quill, quillRef } = useQuill({
    modules,
  });

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        onChange(quill.root.innerHTML);
      });
    }
  }, [quill, onChange]);

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.querySelector(".ql-editor");
      if (editor) {
        editor.style.fontFamily = fontMap[font] || font;
      }
    }
  }, [font]);

  return (
    <>
      <label>내용을 입력해 주세요</label>
      <EditorWrapper>
        <div ref={quillRef} />
      </EditorWrapper>
    </>
  );
}

export default TextEditor;
