
import React, { useState, useEffect } from 'react';

const loadingMessages = [
    "Blending pixels...",
    "Consulting the digital muse...",
    "Painting with algorithms...",
    "Reticulating splines...",
    "Unleashing creative energy...",
];

interface LoaderProps {
    sourceFiles: File[];
    prompt: string;
}

const Loader: React.FC<LoaderProps> = ({ sourceFiles, prompt }) => {
  const [message, setMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
        setMessage(prevMessage => {
            const currentIndex = loadingMessages.indexOf(prevMessage);
            const nextIndex = (currentIndex + 1) % loadingMessages.length;
            return loadingMessages[nextIndex];
        });
    }, 2500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center text-gray-400 p-4 animate-fade-in">
        <h2 className="text-2xl font-bold text-purple-400 mb-6">Fusing Your Vision...</h2>
        
        <div className="flex flex-wrap justify-center gap-4 mb-6">
            {sourceFiles.map((file, index) => (
                <img key={index} src={URL.createObjectURL(file)} alt={`Source ${index + 1}`} className="w-20 h-20 object-cover rounded-lg shadow-md" />
            ))}
        </div>
        
        {prompt && (
            <blockquote className="w-full max-w-md bg-gray-900/70 p-4 rounded-lg border border-gray-700 mb-8">
                <p className="text-gray-300 italic">"{prompt}"</p>
            </blockquote>
        )}

        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-400"></div>
        <p className="mt-4 text-lg font-semibold">{message}</p>
        <p className="text-sm">The AI is working its magic. This may take a moment.</p>
    </div>
  );
};

export default Loader;
