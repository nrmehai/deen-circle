import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import TagBadge from "@/components/TagBadge";

interface TagInputDialogProps {
  value: string[];
  onChange: (tags: string[]) => void;
  suggestions?: string[];
  placeholder?: string;
}

const TagInputDialog: React.FC<TagInputDialogProps> = ({ 
  value, 
  onChange, 
  suggestions = [], 
  placeholder = "Add tag..." 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !value.includes(trimmedTag)) {
      onChange([...value, trimmedTag]);
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
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      addTag(input.trim());
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    addTag(suggestion);
  };

  const handleClose = () => {
    setIsOpen(false);
    setInput("");
    setShowSuggestions(false);
  };

  return (
    <div className="space-y-2">
      {/* Display existing tags */}
      <div className="flex flex-wrap gap-2">
        {value.map((tag) => (
          <div key={tag} className="flex items-center">
            <TagBadge tag={tag} />
            <button
              type="button"
              className="ml-1 text-xs text-white bg-red-500 rounded-full w-4 h-4 flex items-center justify-center hover:bg-red-600 transition-colors"
              onClick={() => removeTag(tag)}
              aria-label={`Remove tag ${tag}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Add tag button */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <Plus className="w-4 h-4" />
            Add Tag
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Tags</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="tag-input" className="text-sm font-medium">
                Enter a new tag:
              </label>
              <div className="relative">
                <Input
                  id="tag-input"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onKeyDown={handleInputKeyDown}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder={placeholder}
                  className="pr-8"
                />
                {input && (
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                    onClick={() => addTag(input)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Suggestions */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Suggestions:</label>
                <div className="flex flex-wrap gap-2">
                  {filteredSuggestions.slice(0, 8).map((suggestion) => (
                    <Badge
                      key={suggestion}
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Current tags in dialog */}
            {value.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Current tags:</label>
                <div className="flex flex-wrap gap-2">
                  {value.map((tag) => (
                    <div key={tag} className="flex items-center">
                      <TagBadge tag={tag} />
                      <button
                        type="button"
                        className="ml-1 text-xs text-white bg-red-500 rounded-full w-4 h-4 flex items-center justify-center hover:bg-red-600 transition-colors"
                        onClick={() => removeTag(tag)}
                        aria-label={`Remove tag ${tag}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dialog actions */}
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleClose}>
                Done
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TagInputDialog; 