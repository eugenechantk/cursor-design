import "./App.css";
import { ReactComponent as Enter } from "./assets/enter.svg";
import React from "react";
import FileReferenceContainer, {
  File,
} from "./components/FileReferenceContainer";
import styled from "styled-components";
import ModelSelector, { Model, models } from "./components/ModelSelector";

const allFiles: File[] = [
  { name: "file1.txt", lineNumber: "1-16", id: "file1.txt" },
  { name: "file1.txt", lineNumber: "1-16", id: "file2.txt" },
  { name: "file1.txt", lineNumber: "1-16", id: "file3.txt" },
  { name: "file1.txt", lineNumber: "1-16", id: "file4.txt" },
  { name: "file1.txt", lineNumber: "1-16", id: "file5.txt" },
  { name: "file1.txt", lineNumber: "1-16", id: "file6.txt" },
];

function App() {
  const chatWindowRef = React.useRef<HTMLDivElement>(null);
  const [currentModel, setCurrentModel] = React.useState<Model>(models[0]);
  const [expand, setExpand] = React.useState(false);
  const [files, setFiles] = React.useState<File[]>(allFiles);

  React.useEffect(() => {
    chatWindowRef.current?.addEventListener("keydown", (event) => {
      if (event.key === "Backspace") {
        const s = window.getSelection();
        const r = s!.getRangeAt(0);
        const el = r.startContainer.parentElement;
        // Check if the current element is the .label
        if (el!.classList.contains("label")) {
          // Check if we are exactly at the end of the .label element
          if (
            r.startOffset === r.endOffset &&
            r.endOffset === el!.textContent!.length
          ) {
            // prevent the default delete behavior
            event.preventDefault();
            if (el!.classList.contains("highlight")) {
              // remove the element
              el!.remove();
            } else {
              el!.classList.add("highlight");
            }
            return;
          }
        }
      }
      (event.target as Element)
        .querySelectorAll("span.label.highlight")
        .forEach(function (el) {
          el.classList.remove("highlight");
        });
    });
  }, []);

  return (
    <ChatBoxContainer>
      {/* Chatbox */}
      <ChatWindow contentEditable={true} ref={chatWindowRef}></ChatWindow>
      {/* Action Bar */}
      <ActionBarContainer>
        {/* List of files as AI context */}
        <FileReferenceContainer
          files={files}
          expand={expand}
          setExpand={setExpand}
          setFiles={setFiles}
        />
        {/* Chat button and Model selection */}
        <ModelAndEnterContainer expand={expand}>
          <ModelSelector
            currentModel={currentModel}
            setModel={setCurrentModel}
          />
          <ChatBtn>
            <Enter />
          </ChatBtn>
        </ModelAndEnterContainer>
      </ActionBarContainer>
    </ChatBoxContainer>
  );
}

export default App;

const ChatBoxContainer = styled.div`
  width: 384px;
  height: 116px;
  display: flex;
  flex-direction: column;
  gap: 0;
  border-radius: 6px;
  overflow: hidden;
  background: #342e2e;
  contenteditable: true;
  margin-top: 360px;
`;

const ChatWindow = styled.div`
  padding: 12px;
  overflow-y: scroll;
  flex: 1;
`;

const ActionBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 4px 4px 4px 8px;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border-top: 1px solid #3a3232;
  background: #242020;
  width: 100%;
`;

const ModelAndEnterContainer = styled.div<{ expand: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: flex-end;
  overflow: hidden;

  width: ${(props) => (props.expand ? "28px" : "auto")};
`;

const ChatBtn = styled.button`
  background: linear-gradient(180deg, #214b89 0%, #23395c 100%);
  border-radius: 2px;
  width: 28px;
  height: 28px;
  flex-shrink: 0;
`;
