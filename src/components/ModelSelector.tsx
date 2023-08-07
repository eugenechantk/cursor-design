import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styled from "styled-components";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export type Model = {
  name: string;
  id: string;
};

export const models: Model[] = [
  {
    name: "gpt-3.5",
    id: "gpt-3.5",
  },
  {
    name: "gpt-4",
    id: "gpt-4",
  },
];

export default function ModelSelector({
  currentModel,
  setModel,
}: {
  currentModel: Model;
  setModel: React.Dispatch<React.SetStateAction<Model>>;
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <TriggerContent>
          {currentModel.name}
          <ChevronDownIcon width={16} height={16} />
        </TriggerContent>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content style={DropdownContainerStyle}>
          {models.map((model, index) => (
            <DropdownItem key={index} onSelect={() => setModel(model)}>
              {model.name}
            </DropdownItem>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

const DropdownItem = styled(DropdownMenu.Item)`
  padding: 4px 8px;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  border-radius: 2px;

  &:hover {
    outline: none;
    background-color: #363636;
  }
`;

const DropdownContainerStyle = {
  backgroundColor: "#242020",
  color: "#B8B8B8",
  padding: "2px 2px",
  marginTop: "4px",
  border: "1px solid #313131",
  borderRadius: "4px",
};

const TriggerContent = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  color: #525151;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-wrap: nowrap;
`;
