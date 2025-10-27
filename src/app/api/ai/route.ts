/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { generateNewImage } from "@/lib/generateNewImage";
import { SYSTEM_PROMPT } from "@/lib/genkit.config";

/**
 * POST /api/ai
 * Accepts two uploaded images (model + clothing)
 * Returns 4 generated image URLs from Gemini/Imagen
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const modelPhoto = formData.get("modelPhoto") as File | null;
    const clothingPhoto = formData.get("clothingPhoto") as File | null;
    const step = formData.get("step") as string | null;


    if (!modelPhoto || !clothingPhoto || !step) {
      return NextResponse.json(
        { error: "Both model and clothing photos are required." },
        { status: 400 }
      );
    }

    const currentStep = Number(step)

    // Convert both images to base64
    const modelArrayBuffer = await modelPhoto.arrayBuffer();
    const clothingArrayBuffer = await clothingPhoto.arrayBuffer();
    const modelBase64 = Buffer.from(modelArrayBuffer).toString("base64");
    const clothingBase64 = Buffer.from(clothingArrayBuffer).toString("base64");

    // Build descriptive prompt
    const basePrompt1 = `
      ${SYSTEM_PROMPT}

      The following base64 image is provided:
      - Clothing photo (item): ${clothingBase64.slice(0, 80)}...

      Generate four professional, realistic fashion images as per instructions.
    `;
    const basePrompt2 = `
      ${SYSTEM_PROMPT}

      The following two base64 images are provided:
      - Model photo (person): ${modelBase64.slice(0, 80)}...
      - Clothing photo (item): ${clothingBase64.slice(0, 80)}...

      Generate four professional, realistic fashion images as per instructions.
    `;
    const basePrompt3 = `
      ${SYSTEM_PROMPT}

      The following two base64 images are provided:
      - Model photo (person): ${modelBase64.slice(0, 80)}...
      - Clothing photo (item): ${clothingBase64.slice(0, 80)}...

      Generate four professional, realistic fashion images as per instructions.
    `;
    const basePrompt4 = `
      ${SYSTEM_PROMPT}

      The following two base64 images are provided:
      - Model photo (person): ${modelBase64.slice(0, 80)}...
      - Clothing photo (item): ${clothingBase64.slice(0, 80)}...

      Generate four professional, realistic fashion images as per instructions.
    `;

    const getbasePrompt = (step: number) => {
      if(step == 1){
        return(basePrompt1)
      }
      else if(step == 2){
        return(basePrompt2)
      }
      else if(step == 3){
        return(basePrompt3)
      }
      else if(step == 4){
        return(basePrompt4)
      }
      else {
        return(basePrompt1)
      }
    }

    const aiResult = await generateNewImage(getbasePrompt(currentStep), currentStep,{
      //model: "gemini-2.5-flash",
      model: "realism",

      //model: "imagen-3.0-generate-002",
      //aspectRatio: "1:1",
    });

    console.log ('generated image:', aiResult.image)

    const result = {
      success: true,
      image: aiResult.image,
      metadata: aiResult.metadata,
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("[AI Route Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ||
          "An unexpected error occurred while generating the AI images.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    message:
      "AI Image Generation API is active. POST FormData with modelPhoto & clothingPhoto.",
  });
}
