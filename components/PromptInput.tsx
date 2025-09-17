import React, { useState, useRef } from 'react';
import PromptSuggestions from './PromptSuggestions';

interface PromptInputProps {
  prompt: string;
  // FIX: Updated the type for `setPrompt` to allow functional updates, as the original type `(prompt: string) => void` only allowed passing a string value.
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt }) => {
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(prev => (prev ? prev.trim() + ' ' : '') + suggestion);
    setSuggestionsVisible(false);
    textareaRef.current?.focus();
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow click events to fire on the suggestion chips
    setTimeout(() => {
      setSuggestionsVisible(false);
    }, 150);
  };

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onFocus={() => setSuggestionsVisible(true)}
        onBlur={handleBlur}
        placeholder="e.g., Make the robot hold a red skateboard..."
        className="w-full h-32 p-3 bg-gray-900 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-200 resize-none text-gray-200 placeholder-gray-500"
      />
      {suggestionsVisible && (
        <PromptSuggestions onSuggestionClick={handleSuggestionClick} />
      )}
    </div>
  );
};

export default PromptInput;