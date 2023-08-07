import React, { createRef, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import FileReferenceTag from "./FileReferenceTag";
import { ChevronLeftIcon, PlusIcon } from "@heroicons/react/20/solid";

export type File = {
  name: string;
  lineNumber?: string;
  id: string;
};

export default function FileReferenceContainer({
  files,
  expand,
  setExpand,
  setFiles,
}: {
  files: File[];
  expand: boolean;
  setExpand: React.Dispatch<React.SetStateAction<boolean>>;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}) {
  const [visibleFiles, setVisibleFiles] = useState<File[]>([]);
  const [remainingCount, setRemainingCount] = useState(0);

  const containerRef = useRef(null);
  // const tempTagRef = useRef(files.map(() => createRef()));

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = 224;
      let usedWidth = 0;
      const tempVisibleFiles = [];
      let index = 0;
      const tagMargin = 2; // this should match the gap in your FileReferences styled component

      // Create temp elements to measure the width of the tags
      const width = files.map((file) => {
        const temp = document.createElement("div");
        temp.innerHTML = files[index].name;
        temp.style.font = "12px Inter";
        temp.style.visibility = "hidden";
        temp.style.position = "absolute";
        temp.style.left = "-1000px";

        const tempLineNum = document.createElement("div");
        if (files[index].lineNumber) {
          tempLineNum.innerHTML = files[index].lineNumber!;
          tempLineNum.style.font = "12px monospace";
          tempLineNum.style.marginLeft = "2px";
          tempLineNum.style.letterSpacing = "-0.5px";
          tempLineNum.style.visibility = "hidden";
          temp.style.position = "absolute";
          temp.style.left = "-1000px";
        }

        document.body.appendChild(temp);
        document.body.appendChild(tempLineNum);

        return {
          temp,
          tempLineNum,
          width: temp.clientWidth + tempLineNum.clientWidth + 12,
        };
      });

      // Only show tags that fit in the container
      while (
        index < files.length &&
        usedWidth + width[index].width <= containerWidth
      ) {
        tempVisibleFiles.push(files[index]);
        usedWidth += width[index].width + tagMargin; // you need to have an estimated or average width for a tag
        index++;
      }
      setVisibleFiles(tempVisibleFiles);
      setRemainingCount(files.length - tempVisibleFiles.length);

      // Clean up the temp elements
      width.forEach(({ temp, tempLineNum }) => {
        document.body.removeChild(temp);
        document.body.removeChild(tempLineNum);
      });
    }
  }, [containerRef, files]);

  return (
    <Container>
      <UseText>Use</UseText>
      <FileReferences ref={containerRef} expanded={expand}>
        {!expand
          ? visibleFiles.map((file, index) => (
              <FileReferenceTag
                file={file}
                key={index}
                onDelete={() => {
                  const newFiles = files.filter((f) => f.id !== file.id);
                  setFiles(newFiles);
                }}
              />
            ))
          : files.map((file, index) => (
              <FileReferenceTag
                file={file}
                key={index}
                onDelete={() => {
                  const newFiles = files.filter((f) => f.id !== file.id);
                  setFiles(newFiles);
                }}
              />
            ))}
        {visibleFiles.length < files.length && !expand && (
          <MoreButton onClick={() => setExpand(true)}>
            +{remainingCount}
          </MoreButton>
        )}
      </FileReferences>
      {expand ? (
        <Button onClick={() => setExpand(false)}>
          <ChevronLeftIcon width={16} height={16} />
        </Button>
      ) : (
        <Button>
          <PlusIcon width={16} height={16} />
        </Button>
      )}
    </Container>
  );
}

const FileReferences = styled.div<{ expanded: boolean }>`
  display: flex;
  flex-direction: row;
  gap: 2px;
  overflow: scroll;
  width: 100%;
  max-width: ${(props) => (props.expanded ? "288px" : "fit-content")};

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1 0 0;
  height: fit-content;
`;

const Button = styled.button`
  display: flex;
  width: 18px;
  height: 18px;
  padding: 2px;
  justify-content: center;
  align-items: center;
  color: #545454;
  border-radius: 4px;

  &:hover {
    background-color: #363636;
  }
`;

const UseText = styled.span`
  color: #525151;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const MoreButton = styled.div`
  display: flex;
  flex-direction: row;
  height: 18px;
  padding: 2px 6px;
  align-items: center;
  gap: 2px;
  border-radius: 1000px;
  border: 1px solid #313131;
  jusify-content: center;
  color: #b8b8b8;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-wrap: nowrap;
  cursor: pointer;

  &:hover {
    background-color: #363636;
    margin-right: 2px !important;
  }
`;
