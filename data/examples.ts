import type { Example } from '../types';

// Using pre-hosted images from a CDN for the examples.
export const examples: Example[] = [
  {
    id: 1,
    prompt: 'A majestic cat astronaut, wearing a shimmering spacesuit, floating in a nebula with a retro sci-fi comic book art style.',
    sourceFiles: [
      { name: 'cat.webp', url: 'https://storage.googleapis.com/aistudio-ux-team-public/sdk-pro-examples/cat.webp', type: 'image/webp' },
      { name: 'space.webp', url: 'https://storage.googleapis.com/aistudio-ux-team-public/sdk-pro-examples/space.webp', type: 'image/webp' },
    ],
    resultUrl: 'https://storage.googleapis.com/aistudio-ux-team-public/sdk-pro-examples/image-fusion-1.webp',
  },
  {
    id: 2,
    prompt: 'A vintage car from the 1950s seamlessly blended into a dense, misty jungle. The style should be a faded, vintage photograph.',
    sourceFiles: [
      { name: 'car.webp', url: 'https://storage.googleapis.com/aistudio-ux-team-public/sdk-pro-examples/car.webp', type: 'image/webp' },
      { name: 'jungle.webp', url: 'https://storage.googleapis.com/aistudio-ux-team-public/sdk-pro-examples/jungle.webp', type: 'image/webp' },
    ],
    resultUrl: 'https://storage.googleapis.com/aistudio-ux-team-public/sdk-pro-examples/image-fusion-2.webp',
  },
  {
    id: 3,
    prompt: 'A pineapple transformed into a cozy, whimsical house with glowing windows, sitting on a tropical beach at sunset. 3D clay model style.',
    sourceFiles: [
        { name: 'pineapple.webp', url: 'https://storage.googleapis.com/aistudio-ux-team-public/sdk-pro-examples/pineapple.webp', type: 'image/webp' },
        { name: 'beach.webp', url: 'https://storage.googleapis.com/aistudio-ux-team-public/sdk-pro-examples/beach.webp', type: 'image/webp' },
    ],
    resultUrl: 'https://storage.googleapis.com/aistudio-ux-team-public/sdk-pro-examples/image-fusion-3.webp',
  }
];
