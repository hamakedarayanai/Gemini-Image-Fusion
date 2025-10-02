import React from 'react';
import { examples } from '../data/examples';
import type { Example } from '../types';

interface ExampleGalleryProps {
  onExampleClick: (example: Example) => void;
}

const ExampleGallery: React.FC<ExampleGalleryProps> = ({ onExampleClick }) => {
  return (
    <div className="text-center text-gray-400 animate-fade-in w-full">
        <h3 className="text-lg font-semibold mb-2">Your fused creation will appear here.</h3>
        <p className="text-gray-500 mb-6">Need inspiration? Click an example to try it out.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {examples.map((example) => (
                <button
                    key={example.id}
                    onClick={() => onExampleClick(example)}
                    className="group relative aspect-square rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500"
                    aria-label={`Try example: ${example.prompt}`}
                >
                    <img src={example.resultUrl} alt={example.prompt} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 flex items-end p-2 sm:p-3">
                        <p className="text-white text-xs font-bold text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-2 group-hover:translate-y-0">
                            {example.prompt}
                        </p>
                    </div>
                </button>
            ))}
        </div>
    </div>
  );
};

export default ExampleGallery;
