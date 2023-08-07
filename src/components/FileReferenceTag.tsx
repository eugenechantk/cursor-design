import React from "react";
import styled from "styled-components";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { File } from "./FileReferenceContainer";

export default function FileReferenceTag({
  file,
  onDelete,
}: {
  file: File;
  onDelete: () => void;
}) {
  return (
    <Container>
      <FileName>{file.name}</FileName>
      {file.lineNumber && <FileLines>{`@${file.lineNumber}`}</FileLines>}
      <RemoveButton onClick={onDelete}>
        <XMarkIcon width={14} height={14} style={{color: "#7B7B7B"}}/>
      </RemoveButton>
    </Container>
  );
}

const RemoveButton = styled.button`
  display: none;
  width: 14px;
  height: 14px;
`;

const FileName = styled.span`
  color: #b8b8b8;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-wrap: nowrap;
`;

const FileLines = styled.span`
  margin-left: 2px;
  color: #7b7b7b;
  font-family: monospace;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.5px;
  text-wrap: nowrap;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 18px;
  padding: 2px 6px;
  align-items: center;
  gap: 2px;
  border-radius: 1000px;
  border: 1px solid #313131;
  jusify-content: center;

  &:hover ${RemoveButton} {
    display: block;
  }

  &:hover {
    background-color: #363636;
    margin-right: 2px !important;
  }
`;
