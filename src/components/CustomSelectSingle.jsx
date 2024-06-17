import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
function CustomSelectSingle({ value, options, placeholder, onChange }) {
  const handleOptionChange = (newOption) => {
    onChange(newOption);
  };
  return (
    <Select value={value} onValueChange={handleOptionChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option, id) => (
          <SelectItem key={id} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default CustomSelectSingle;
