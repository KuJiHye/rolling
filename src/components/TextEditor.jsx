import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

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
        onChange(quill.getText());
      });
    }
  }, [quill, onChange]);

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.querySelector(".ql-editor");
      if (editor) {
        editor.style.fontFamily = font;
      }
    }
  }, [font]);

  return (
    <>
      <label>내용을 입력해 주세요</label>
      <div ref={quillRef} />
    </>
  );
}

export default TextEditor;
