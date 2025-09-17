
import { GoogleGenAI, Modality } from "@google/genai";
import type { GeneratedResult } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      } else {
        resolve('');
      }
    };
    reader.readAsDataURL(file);
  });
  const base64EncodedData = await base64EncodedDataPromise;
  return {
    inlineData: {
      data: base64EncodedData,
      mimeType: file.type,
    },
  };
};

export const generateFusedImage = async (files: File[], prompt: string): Promise<GeneratedResult> => {
  if (files.length === 0) {
    throw new Error("Please upload at least one image.");
  }
  if (!prompt) {
    throw new Error("Please provide a text prompt.");
  }

  try {
    const imageParts = await Promise.all(files.map(fileToGenerativePart));
    const textPart = { text: prompt };

    const contents = {
      parts: [...imageParts, textPart],
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: contents,
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    const result: GeneratedResult = { text: null, imageUrl: null };

    if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
        if (part.text) {
          result.text = (result.text || "") + part.text;
        } else if (part.inlineData) {
          const base64ImageBytes: string = part.inlineData.data;
          result.imageUrl = `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
        }
      }
    }
    
    if (!result.imageUrl) {
        throw new Error("The model did not return an image. Please try a different prompt or image combination.");
    }

    return result;
  } catch (error) {
    console.error("Error generating fused image:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate image: ${error.message}`);
    }
    throw new Error("An unknown error occurred during image generation.");
  }
};
