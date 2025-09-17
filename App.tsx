
import React, { useState, useCallback } from 'react';
import type { GeneratedResult } from './types';
import { generateFusedImage } from './services/geminiService';
import Header from './components/Header';
import Footer from './components/Footer';
import ImageUploader from './components/ImageUploader';
import PromptInput from './components/PromptInput';
import ResultDisplay from './components/ResultDisplay';
import Loader from './components/Loader';

function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [prompt, setPrompt] = useState<string>('');
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (files.length === 0) {
      setError("Please upload at least one image to fuse.");
      return;
    }
    if (!prompt.trim()) {
      setError("Please enter a prompt to guide the fusion.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const generatedResult = await generateFusedImage(files, prompt);
      setResult(generatedResult);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [files, prompt]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Column */}
          <div className="flex flex-col gap-6 bg-gray-800/50 p-6 rounded-2xl shadow-lg border border-gray-700">
            <div>
              <h2 className="text-2xl font-bold text-cyan-400 mb-3">1. Upload Source Images</h2>
              <p className="text-gray-400 mb-4">Select one or more images you want to blend or modify.</p>
              <ImageUploader files={files} setFiles={setFiles} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-cyan-400 mb-3">2. Describe Your Vision</h2>
              <p className="text-gray-400 mb-4">Tell the AI what to do. For example, "add a futuristic city in the background" or "combine these animals into a mythical creature".</p>
              <PromptInput prompt={prompt} setPrompt={setPrompt} />
            </div>
            <button
              onClick={handleGenerate}
              disabled={isLoading || files.length === 0 || !prompt.trim()}
              className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-cyan-500/30 shadow-md flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                "✨ Fuse Images"
              )}
            </button>
          </div>

          {/* Output Column */}
          <div className="flex flex-col bg-gray-800/50 p-6 rounded-2xl shadow-lg border border-gray-700">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">3. AI Generated Result</h2>
            <div className="flex-grow flex items-center justify-center rounded-lg bg-gray-900/50 min-h-[400px] lg:min-h-0 border-2 border-dashed border-gray-700 p-4">
              {isLoading && <Loader />}
              {error && <p className="text-red-400 text-center">{error}</p>}
              {!isLoading && !error && result && <ResultDisplay result={result} />}
              {!isLoading && !error && !result && (
                <div className="text-center text-gray-500">
                  <p>Your fused creation will appear here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
