import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const modelPhoto = formData.get('modelPhoto')
    const clothingPhoto = formData.get('clothingPhoto')

    if (!modelPhoto || !clothingPhoto) {
      return NextResponse.json(
        { error: 'Both model and clothing photos are required' },
        { status: 400 }
      )
    }

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Mock AI-generated images (replace with actual AI service integration)
    const mockResults = {
      images: {
        enhanced_product: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
        model_front: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        product_back: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
        model_back: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
      },
      processingTime: 2.5,
      model: 'mock-ai-model-v1'
    }

    return NextResponse.json(mockResults)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to process images' },
      { status: 500 }
    )
  }
}

















// app/api/ai/route.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { generateNewImage } from "@/lib/generateNewImage";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    const formData = await req.formData()
    const modelPhoto = formData.get('modelPhoto')
    const clothingPhoto = formData.get('clothingPhoto')

    if (!modelPhoto || !clothingPhoto) {
      return NextResponse.json(
        { error: 'Both model and clothing photos are required' },
        { status: 400 }
      )
    }
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const prompt = typeof body.prompt === "string" ? body.prompt.trim() : null;
    const options = body.options ?? undefined;

    if (!prompt) {
      return NextResponse.json({ error: "Missing 'prompt' in request body." }, { status: 400 });
    }

    // Call the generator function
    const result = await generateNewImage(prompt, options);

    // Basic sanity check: ensure we have at least one image
    const images = result.images;
    const hasAtLeastOneImage =
      images.enhanced_product || images.model_front || images.product_back || images.model_back;

    if (!hasAtLeastOneImage) {
      return NextResponse.json(
        { error: "AI returned no images", raw: result.metadata?.raw ?? null },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (err) {
    // Friendly error message with helpful debugging hints (do not leak keys)
    const message =
      (err as Error).message ??
      "Unknown server error while generating image. Check server logs and environment configuration.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Optional health or info response
  return NextResponse.json({ ok: true, info: "AI image generation endpoint. POST { prompt }" });
}


