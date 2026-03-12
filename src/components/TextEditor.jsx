import "quill/dist/quill.snow.css";
import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import ContentWrapper from "./ContentWrapper";
import StyledLabel from "./StyledLabel";
import styled from "styled-components";
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
  }, [font, quillRef]);

  return (
    <div>
      <StyledLabel>내용을 입력해 주세요</StyledLabel>
      <StyledContentWrapper>
        <div ref={quillRef} />
      </StyledContentWrapper>
    </div>
  );
}

const StyledContentWrapper = styled(ContentWrapper)`
  width: 720px;
  border: 1px solid #cccccc;
  border-radius: 8px;
  overflow: hidden;

  .ql-toolbar {
    border: none;
    border-bottom: 1px solid #cccccc;
    background-color: #f9f9f9;
  }

  .ql-container {
    border: none;
    height: 200px;
    font-size: 16px;
  }

  .ql-editor {
    height: 200px;
  }
`;

export default TextEditor;
