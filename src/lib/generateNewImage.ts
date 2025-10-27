/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * The standardized result type our app will return
 */
export type GeneratedImageResult = {
  prompt: string;
  image: string | null;
  metadata?: {
    model?: string;
    createdAt?: string;
    raw?: any;
  };
};

/**
 * generateNewImage()
 * -----------------
 * Generates a single image variant (based on step) using Freepik Mystic API.
 * Steps:
 *  1 => Enhanced product
 *  2 => Model front
 *  3 => Product back
 *  4 => Model back
 */
export async function generateNewImage(
  basePrompt: string,
  step: number,
  options?: {
    model?: string;
    structure_reference?: string;
    style_reference?: string;
  }
): Promise<GeneratedImageResult> {
  if (!basePrompt?.trim()) {
    throw new Error("Prompt is required for image generation.");
  }

  // Define the four specific sub-prompts
  const prompts = {
    enhanced_product: `${basePrompt}\nGenerate a clean, wrinkle-free, professional studio photo of the clothing item alone on a white background.`,
    model_front: `${basePrompt}\nGenerate a realistic front-view image of a human model wearing the clothing item.`,
    product_back: `${basePrompt}\nGenerate a clear back-view photo of the clothing item alone.`,
    model_back: `${basePrompt}\nGenerate a realistic back-view photo of the human model wearing the clothing item.`,
  };

  const getPrompt = (stepNum: number) => {
    if (stepNum === 1) return prompts.enhanced_product;
    if (stepNum === 2) return prompts.model_front;
    if (stepNum === 3) return prompts.product_back;
    if (stepNum === 4) return prompts.model_back;
    return prompts.enhanced_product;
  };

  const prompt = getPrompt(step);

  // Prepare Freepik Mystic API request
  const url = 'https://api.freepik.com/v1/ai/mystic';
  const apiKey = process.env.FREEPIK_API_KEY || '';

  // Avoid sending an empty API key in production; throw so caller knows
  if (!apiKey) {
    throw new Error('FREEPIK_API_KEY environment variable is required.');
  }

  const body: any = {
    prompt,
    resolution: '2k',
    aspect_ratio: 'square_1_1',
    model: options?.model || 'realism',
    filter_nsfw: true,
    creative_detailing: 33,
  };

  if (options?.structure_reference) {
    body.structure_reference = options.structure_reference;
    body.structure_strength = 50;
  }
  if (options?.style_reference) {
    body.style_reference = options.style_reference;
    body.adherence = 50;
    body.hdr = 50;
  }

  let image: string | null = null;
  let raw: any = null;
  let taskId: string | null = null;
  let generated: string[] = [];

  try {
    // Step 1: Submit the generation request
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'x-freepik-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    raw = data;
    // Log the initial response for debugging
    console.log('Freepik Mystic API response:', JSON.stringify(data, null, 2));
    if (data?.data?.task_id) {
      taskId = data.data.task_id;
      generated = data.data.generated || [];
    }

    // Step 2: If generated is empty, poll the status endpoint
    if (taskId && (!generated || generated.length === 0)) {
      console.log('Created Freepik task:', taskId);
      const statusUrl = `https://api.freepik.com/v1/ai/mystic/${taskId}`;
      const maxAttempts = 20; // up to ~20s
      const intervalMs = 6000; // 1s between polls
      let attempt = 0;
      let statusData: any = null;
      while (attempt < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, intervalMs));
        const pollRes = await fetch(statusUrl, {
          method: 'GET',
          headers: {
            'x-freepik-api-key': apiKey,
            'Content-Type': 'application/json',
          },
        });
        statusData = await pollRes.json();
        console.log('Current statusData:', statusData);
        const pollStatus = statusData?.data?.status;
        if (
          (pollStatus === 'SUCCEEDED' || pollStatus === 'COMPLETED') &&
          Array.isArray(statusData.data.generated) &&
          statusData.data.generated.length > 0
        ) {
          image = statusData.data.generated[0];
          raw = statusData;
          break;
        } else if (pollStatus === 'FAILED') {
          throw new Error('Freepik Mystic API task failed.');
        }
        attempt++;
      }
      if (!image) {
        throw new Error('Timed out waiting for Freepik Mystic API image generation.');
      }
    } else if (generated && generated.length > 0) {
      image = generated[0];
    }
  } catch (error) {
    throw new Error('Failed to generate image with Freepik Mystic API: ' + (error as any)?.message);
  }

  return {
    prompt: basePrompt,
    image,
    metadata: {
      model: body.model,
      createdAt: new Date().toISOString(),
      raw,
    },
  };
}
