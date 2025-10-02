import React, { useState } from 'react';
import type { GeneratedResult } from '../types';
import Modal from './Modal';
import DownloadIcon from './icons/DownloadIcon';
import ClipboardIcon from './icons/ClipboardIcon';

interface ResultDisplayProps {
  result: GeneratedResult;
  prompt: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, prompt }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    if (!result.imageUrl) return;
    const link = document.createElement('a');
    link.href = result.imageUrl;
    const mimeType = result.imageUrl.split(';')[0].split(':')[1];
    const extension = mimeType ? mimeType.split('/')[1] : 'png';
    link.download = `gemini-fused-image.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="w-full h-full flex flex-col items-center justify-center gap-4 animate-fade-in">
        {result.imageUrl && (
          <div className="w-full max-w-lg flex flex-col items-center gap-4">
            <button
              onClick={() => setIsPreviewOpen(true)}
              className="w-full aspect-square group relative rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500"
              aria-label="Enlarge image"
            >
              <img
                src={result.imageUrl}
                alt="AI generated result"
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">Click to enlarge</p>
              </div>
            </button>
            <button
              onClick={handleDownload}
              className="w-full max-w-xs bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-purple-500/30 shadow-md flex items-center justify-center gap-2"
            >
              <DownloadIcon className="w-5 h-5" />
              Download Image
            </button>
          </div>
        )}
        {result.text && (
          <div className="w-full max-w-lg text-left text-gray-300 bg-gray-900/70 p-4 rounded-lg border border-gray-700 relative">
             <p className="text-sm font-semibold text-gray-400 mb-2">AI's Description:</p>
            <p>{result.text}</p>
          </div>
        )}
         {prompt && (
            <div className="w-full max-w-lg text-left text-gray-400 bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                <p className="text-sm font-semibold text-gray-500 mb-1">Original Prompt:</p>
                <div className="flex justify-between items-start gap-2">
                    <p className="italic text-gray-300">{prompt}</p>
                    <button 
                        onClick={handleCopyPrompt}
                        className="flex-shrink-0 p-1.5 text-gray-400 hover:text-cyan-400 hover:bg-gray-700 rounded-md transition-all"
                        aria-label="Copy prompt"
                    >
                        <ClipboardIcon className="w-5 h-5"/>
                    </button>
                </div>
                 {copied && <p className="text-cyan-400 text-xs mt-2 text-right animate-fade-in-fast">Copied!</p>}
            </div>
        )}
      </div>

      {isPreviewOpen && result.imageUrl && (
        <Modal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)}>
          <img
            src={result.imageUrl}
            alt="AI generated result preview"
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-md"
          />
        </Modal>
      )}
    </>
  );
};

export default ResultDisplay;