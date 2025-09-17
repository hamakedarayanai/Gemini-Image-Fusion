
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center text-gray-400">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-400"></div>
        <p className="mt-4 text-lg font-semibold">Fusing ideas...</p>
        <p className="text-sm">The AI is working its magic. This may take a moment.</p>
    </div>
  );
};

export default Loader;
