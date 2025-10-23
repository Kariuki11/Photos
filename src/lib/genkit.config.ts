// lib/genkit.config.ts
import { genkit } from "genkit";
import { googleAI } from "@genkit-ai/google-genai";

const apiKey = process.env.GOOGLE_GENAI_API_KEY;

if (!apiKey) {
  console.warn(
    "[genkit.config] WARN: GOOGLE_GENAI_API_KEY is not set. Image generation may fail."
  );
}

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey,
    }),
  ],
});

// System prompt context
export const SYSTEM_PROMPT = `
You are an AI image-generation assistant specialized in fashion e-commerce and model-clothing visualizations.
Given a model photo and a clothing item photo, produce photorealistic and stylistically consistent images:
1. Enhanced product photo (clean background, no wrinkles)
2. Model wearing the clothing item (front view)
3. Back view of the product
4. Back view of the model wearing the product

Use the model: “gemini-2.5-flash”.
Respect proportions, lighting, and ensure neutral, premium studio backgrounds.
`;
















// // lib/genkit.config.ts
// import { genkit } from 'genkit';
// import { googleAI } from '@genkit-ai/google-genai';

// export const ai = genkit({
//   plugins: [
//     googleAI({
//       // You can omit this if GEMINI_API_KEY or GOOGLE_API_KEY is set in .env.local
//       apiKey: process.env.GOOGLE_GENAI_API_KEY,
//     }),
//   ],
// });

// // System prompt that guides image generation
// export const SYSTEM_PROMPT = `
// You are an expert AI visual designer specializing in realistic, high-quality
// fashion and human-model compositions. Always generate clear, natural lighting,
// balanced colors, and human-like proportions.

// When enhancing or combining a model and clothing item:
// - Maintain visual realism and aesthetics
// - Center the subject
// - Use neutral backgrounds (white, gray, or soft gradients)
// - Avoid distortions, multiple limbs, or misaligned items
// - Respect the original clothing texture and lighting
// - Return final results as clean, professional visuals suitable for e-commerce
// `;
