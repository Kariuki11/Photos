/* eslint-disable @typescript-eslint/no-explicit-any */
import { ai } from "./genkit.config";
import { googleAI } from "@genkit-ai/google-genai";

export type GeneratedImageResult = {
  prompt: string;
  images: {
    enhanced_product?: string | null;
    model_front?: string | null;
    product_back?: string | null;
    model_back?: string | null;
  };
  metadata?: {
    model?: string;
    createdAt?: string;
    raw?: any;
  };
};

/**
 * generateNewImage
 * Generates four distinct images using Gemini/Imagen via Genkit:
 * 1️⃣ Enhanced product photo
 * 2️⃣ Model wearing product (front view)
 * 3️⃣ Product back view
 * 4️⃣ Model wearing product (back view)
 */
export async function generateNewImage(
  basePrompt: string,
  options?: {
    model?: string;
    aspectRatio?: "1:1" | "16:9" | "9:16";
  }
): Promise<GeneratedImageResult> {
  if (!basePrompt?.trim()) {
    throw new Error("Prompt is required for image generation.");
  }

  const modelName = options?.model ?? "imagen-3.0-generate-002";
  const aspectRatio = options?.aspectRatio ?? "1:1";

  // Define the four generation prompts
  const prompts = {
    enhanced_product: `${basePrompt}\nGenerate a clean, high-quality studio photo of the clothing item only. White background, wrinkle-free, soft lighting.`,
    model_front: `${basePrompt}\nGenerate a front-view image of the model wearing the clothing item, realistic proportions, clean background.`,
    product_back: `${basePrompt}\nGenerate a clear back-view image of the clothing item alone.`,
    model_back: `${basePrompt}\nGenerate a back-view image of the model wearing the clothing item.`,
  };

  // Run all image generations in parallel
  const [enhanced, front, backItem, backModel] = await Promise.all([
    ai.generate({
      model: googleAI.model(modelName),
      prompt: prompts.enhanced_product,
      config: { aspectRatio },
    }),
    ai.generate({
      model: googleAI.model(modelName),
      prompt: prompts.model_front,
      config: { aspectRatio },
    }),
    ai.generate({
      model: googleAI.model(modelName),
      prompt: prompts.product_back,
      config: { aspectRatio },
    }),
    ai.generate({
      model: googleAI.model(modelName),
      prompt: prompts.model_back,
      config: { aspectRatio },
    }),
  ]);

  const extractUrl = (res: any) =>
    res?.media?.() ? res.media().url ?? null : res?.media?.url ?? null;

  const images = {
    enhanced_product: extractUrl(enhanced),
    model_front: extractUrl(front),
    product_back: extractUrl(backItem),
    model_back: extractUrl(backModel),
  };

  return {
    prompt: basePrompt,
    images,
    metadata: {
      model: modelName,
      createdAt: new Date().toISOString(),
      raw: { enhanced, front, backItem, backModel },
    },
  };
}
























// // lib/generateNewImage.ts
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { ai } from './genkit.config';
// import { googleAI } from '@genkit-ai/google-genai';

// export type GeneratedImageResult = {
//   prompt: string;
//   imageUrl: string | null;
//   metadata?: {
//     model?: string;
//     createdAt?: string;
//     raw?: any;
//   };
// };

// export async function generateNewImage(
//   prompt: string,
//   options?: {
//     model?: string;
//     aspectRatio?: '1:1' | '16:9' | '9:16';
//   }
// ): Promise<GeneratedImageResult> {
//   if (!prompt?.trim()) {
//     throw new Error('Prompt is required for image generation.');
//   }

//   const modelName = options?.model ?? 'imagen-3.0-generate-002';

//   try {
//     // Perform the image generation request
//     const response = await ai.generate({
//       model: googleAI.model(modelName),
//       prompt: `${prompt}`,
//       config: {
//         // You can include more config options like negativePrompt, enhancePrompt, etc.
//         aspectRatio: options?.aspectRatio ?? '1:1',
//       },
//     });

//     // According to docs, `response.media()` gives the generated image
//     const imageUrl = response.media?.url ?? null;

//     return {
//       prompt,
//       imageUrl,
//       metadata: {
//         model: modelName,
//         createdAt: new Date().toISOString(),
//         raw: response,
//       },
//     };
//   } catch (error: any) {
//     console.error('[generateNewImage] Generation failed:', error);
//     throw new Error(`Failed to generate image: ${error.message}`);
//   }
// }
