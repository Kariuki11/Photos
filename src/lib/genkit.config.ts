// lib/genkit.config.ts
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [
    googleAI({
      // You can omit this if GEMINI_API_KEY or GOOGLE_API_KEY is set in .env.local
      apiKey: process.env.GOOGLE_GENAI_API_KEY,
    }),
  ],
});

// System prompt that guides image generation
export const SYSTEM_PROMPT = `
You are an expert AI visual designer specializing in realistic, high-quality
fashion and human-model compositions. Always generate clear, natural lighting,
balanced colors, and human-like proportions.

When enhancing or combining a model and clothing item:
- Maintain visual realism and aesthetics
- Center the subject
- Use neutral backgrounds (white, gray, or soft gradients)
- Avoid distortions, multiple limbs, or misaligned items
- Respect the original clothing texture and lighting
- Return final results as clean, professional visuals suitable for e-commerce
`;
