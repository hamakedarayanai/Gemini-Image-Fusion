
import React, { useState, useCallback } from 'react';
import type { GeneratedResult, Example } from './types';
import { generateFusedImage } from './services/geminiService';
import { examples } from './data/examples';
import Header from './components/Header';
import Footer from './components/Footer';
import ImageUploader from './components/ImageUploader';
import PromptInput from './components/PromptInput';
import ResultDisplay from './components/ResultDisplay';
import Loader from './components/Loader';
import ExampleGallery from './components/ExampleGallery';
import ClearIcon from './components/icons/ClearIcon';

const urlToFile = async (url: string, filename: string, mimeType: string): Promise<File> => {
  const res = await fetch(url);
  const buf = await res.arrayBuffer();
  return new File([buf], filename, { type: mimeType });
};

function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [prompt, setPrompt] = useState<string>('');
  const [submittedPrompt, setSubmittedPrompt] = useState<string>('');
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
    setSubmittedPrompt(prompt);

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
  
  const handleClear = () => {
    setFiles([]);
    setPrompt('');
    setResult(null);
    setError(null);
    setSubmittedPrompt('');
  };

  const handleExampleClick = useCallback(async (example: Example) => {
    handleClear();
    setPrompt(example.prompt);
    // Convert example URLs to File objects
    const exampleFiles = await Promise.all(
      example.sourceFiles.map(fileInfo => 
        urlToFile(fileInfo.url, fileInfo.name, fileInfo.type)
      )
    );
    setFiles(exampleFiles);
    // Scroll to top to see the populated fields
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Column */}
          <div className="flex flex-col gap-6 bg-gray-800/50 p-6 rounded-2xl shadow-lg border border-gray-700">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-cyan-400">1. Upload Source Images</h2>
              {(files.length > 0 || prompt) && (
                <button
                  onClick={handleClear}
                  className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
                  aria-label="Clear all inputs"
                >
                  <ClearIcon className="w-5 h-5"/>
                  Clear All
                </button>
              )}
            </div>
            <div>
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
              {isLoading && <Loader prompt={prompt} sourceFiles={files} />}
              {error && <p className="text-red-400 text-center">{error}</p>}
              {!isLoading && !error && result && <ResultDisplay result={result} prompt={submittedPrompt} />}
              {!isLoading && !error && !result && (
                <ExampleGallery onExampleClick={handleExampleClick} />
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