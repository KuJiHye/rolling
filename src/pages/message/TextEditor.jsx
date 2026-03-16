import "quill/dist/quill.snow.css";
import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import ContentWrapper from "../../components/ContentWrapper";
import StyledLabel from "./StyledLabel";
import styled from "styled-components";
import { fontMap } from "../../constants/fontMap";

const modules = {
  toolbar: [
    ["bold", "italic", "underline"],
    [{ align: "" }, { align: "center" }, { align: "right" }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ background: [] }],
  ],
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
  border: 1px solid var(--gray-300);
  border-radius: 8px;
  overflow: hidden;

  .ql-toolbar {
    border: none;
    border-bottom: 1px solid var(--gray-300);
    background-color: var(--gray-100);
  }

  .ql-container {
    border: none;
    height: 200px;
    font: var(--font-16-regular);
  }

  .ql-editor {
    height: 200px;
  }
  .ql-editor ol,
  .ql-editor ul {
    padding-left: 1.5em;
    list-style-type: none;
  }

  .ql-editor li[data-list="bullet"] {
    list-style-type: disc;
  }

  .ql-editor li[data-list="ordered"] {
    list-style-type: decimal;
  }
  .ql-editor li > .ql-ui {
    display: none;
  }

  .ql-editor li[data-list="bullet"],
  .ql-editor li[data-list="ordered"] {
    padding-left: 0.3em; /* 간격 줄이기 */
  }

  @media ${({ theme }) => theme.mobile} {
    width: 100%;
  }
`;

export default TextEditor;
