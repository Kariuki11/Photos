// lib/generateNewImage.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ai } from './genkit.config';
import { googleAI } from '@genkit-ai/google-genai';

export type GeneratedImageResult = {
  prompt: string;
  imageUrl: string | null;
  metadata?: {
    model?: string;
    createdAt?: string;
    raw?: any;
  };
};

export async function generateNewImage(
  prompt: string,
  options?: {
    model?: string;
    aspectRatio?: '1:1' | '16:9' | '9:16';
  }
): Promise<GeneratedImageResult> {
  if (!prompt?.trim()) {
    throw new Error('Prompt is required for image generation.');
  }

  const modelName = options?.model ?? 'imagen-3.0-generate-002';

  try {
    // Perform the image generation request
    const response = await ai.generate({
      model: googleAI.model(modelName),
      prompt: `${prompt}`,
      config: {
        // You can include more config options like negativePrompt, enhancePrompt, etc.
        aspectRatio: options?.aspectRatio ?? '1:1',
      },
    });

    // According to docs, `response.media()` gives the generated image
    const imageUrl = response.media?.url ?? null;

    return {
      prompt,
      imageUrl,
      metadata: {
        model: modelName,
        createdAt: new Date().toISOString(),
        raw: response,
      },
    };
  } catch (error: any) {
    console.error('[generateNewImage] Generation failed:', error);
    throw new Error(`Failed to generate image: ${error.message}`);
  }
}
