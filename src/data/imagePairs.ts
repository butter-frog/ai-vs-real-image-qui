import { ImagePair } from '@/types/quiz'

export const imagePairs: ImagePair[] = [
  {
    id: 1,
    realImage: '/sample-real-1.jpg',
    aiImage: '/sample-ai-1.jpg',
    explanation: 'AI-generated images often have subtle inconsistencies in lighting, unusual textures in organic materials like skin or hair, and sometimes display anatomical irregularities that are difficult to notice at first glance.'
  },
  {
    id: 2,
    realImage: '/sample-real-2.jpg',
    aiImage: '/sample-ai-2.jpg',
    explanation: 'Look for unnatural symmetry, overly smooth textures, or artifacts in complex areas like hands, text, or reflections. AI models sometimes struggle with these details.'
  },
  {
    id: 3,
    realImage: '/sample-real-3.jpg',
    aiImage: '/sample-ai-3.jpg',
    explanation: 'Real photographs often contain natural imperfections, noise, and depth-of-field variations that AI-generated images may either over-perfect or fail to replicate accurately.'
  },
  {
    id: 4,
    realImage: '/sample-real-4.jpg',
    aiImage: '/sample-ai-4.jpg',
    explanation: 'Background elements in AI images sometimes have inconsistent perspective, blurred or nonsensical text, or objects that don\'t quite make physical sense in their environment.'
  },
  {
    id: 5,
    realImage: '/sample-real-5.jpg',
    aiImage: '/sample-ai-5.jpg',
    explanation: 'Check for consistency in lighting sources, shadows, and reflections. AI can sometimes create images where the light doesn\'t behave as it would in the real world.'
  }
]
