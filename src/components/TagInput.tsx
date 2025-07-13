import React, { useState } from "react";
import TagBadge from "@/components/TagBadge";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  suggestions?: string[];
  placeholder?: string;
}

const TagInput: React.FC<TagInputProps> = ({ value, onChange, suggestions = [], placeholder }) => {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const addTag = (tag: string) => {
    if (tag && !value.includes(tag)) {
      onChange([...value, tag]);
    }
    setInput("");
    setShowSuggestions(false);
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  const filteredSuggestions = suggestions.filter(
    (s) => s.toLowerCase().includes(input.toLowerCase()) && !value.includes(s)
  );

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && input.trim()) {
      e.preventDefault();
      addTag(input.trim());
    } else if (e.key === "Backspace" && !input && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

  return (
    <div className="flex flex-wrap items-center border rounded px-2 py-1 bg-white focus-within:ring-2 ring-blue-400">
      {value.map((tag) => (
        <span key={tag} className="flex items-center mr-2 mb-1">
          <TagBadge tag={tag} />
          <button
            type="button"
            className="ml-1 text-xs text-white bg-blue-600 rounded-full w-4 h-4 flex items-center justify-center hover:bg-blue-800"
            onClick={() => removeTag(tag)}
            aria-label={`Remove tag ${tag}`}
          >
            ×
          </button>
        </span>
      ))}
      <input
        className="flex-1 min-w-[100px] border-none outline-none p-1"
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setShowSuggestions(true);
        }}
        onKeyDown={handleInputKeyDown}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
        placeholder={placeholder || "Add tag..."}
      />
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute mt-8 bg-white border rounded shadow z-10">
          {filteredSuggestions.map((s) => (
            <div
              key={s}
              className="px-3 py-1 cursor-pointer hover:bg-blue-100"
              onMouseDown={() => addTag(s)}
            >
              {s}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagInput; 