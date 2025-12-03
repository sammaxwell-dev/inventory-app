import { GoogleGenAI, Type } from "@google/genai";
import { Category } from "../types";

// Initialize client directly as per guidelines (assume API_KEY is valid and configured)
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const suggestProductDetails = async (productName: string): Promise<{ category: Category; description: string } | null> => {
  try {
    const prompt = `Classify the drink "${productName}" into one of these exact categories: "Irish Whiskey", "Irish Beer", "International Beer", "Spirits", "Wine". Also provide a very short 1-sentence description suitable for a pub menu.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING, enum: Object.values(Category) },
            description: { type: Type.STRING },
          },
          required: ["category", "description"],
        },
      },
    });

    const text = response.text;
    if (!text) return null;

    return JSON.parse(text) as { category: Category; description: string };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};