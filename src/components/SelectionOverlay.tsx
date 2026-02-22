import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";

interface SelectionOverlayProps {
  onSelect: (count: number) => void;
}

const SelectionOverlay: React.FC<SelectionOverlayProps> = ({ onSelect }) => {
  const [inputValue, setInputValue] = useState<number | null>(null);

  return (
    <div className="flex flex-column gap-3 p-3">
      <h4 className="m-0">Custom Row Selection</h4>
      <InputNumber
        value={inputValue}
        onValueChange={(e) => setInputValue(e.value ?? null)}
        placeholder="Number of rows..."
        min={0}
        autoFocus
      />
      <Button
        label="Select"
        icon="pi pi-check"
        onClick={() => {
          if (inputValue !== null) onSelect(inputValue);
        }}
      />
    </div>
  );
};

export default SelectionOverlay;
