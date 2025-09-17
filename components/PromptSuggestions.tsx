import React from 'react';

interface PromptSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

const suggestions = [
  "Combine these into a single mythical creature.",
  "Change the style to watercolor painting.",
  "Set the background to a futuristic cityscape.",
  "Make it look like a vintage photograph.",
  "Add a glowing neon effect.",
  "Transform into a 3D clay model.",
  "Apply a comic book art style.",
  "Place them on a surreal, alien planet.",
];

const PromptSuggestions: React.FC<PromptSuggestionsProps> = ({ onSuggestionClick }) => {
  return (
    <div className="mt-4 animate-fade-in-fast">
      <h3 className="text-sm font-semibold text-gray-400 mb-2">Need inspiration? Try one of these:</h3>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm hover:bg-cyan-500 hover:text-white transition-colors duration-200"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PromptSuggestions;
