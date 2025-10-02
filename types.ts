
export interface GeneratedResult {
  text: string | null;
  imageUrl: string | null;
}

export interface Example {
  id: number;
  prompt: string;
  sourceFiles: { name: string; url: string; type: string }[];
  resultUrl: string;
}
