
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const suggestSpecialization = async (symptoms: string[]) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Based on these symptoms: ${symptoms.join(', ')}, what medical specialization should the user consult? Return only the specialization name (e.g., Cardiology, Dermatology, Pediatrics, General Physician).`,
      config: {
        temperature: 0.1,
      }
    });
    return response.text?.trim() || 'General Physician';
  } catch (error) {
    console.error('Error getting suggestion:', error);
    return 'General Physician';
  }
};
