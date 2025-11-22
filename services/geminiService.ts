import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { Car } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// System instructions to guide the AI's behavior
const BASE_INSTRUCTION = `
You are "AutoBot", the intelligent sales assistant for Autoroute H24, a premium online car dealership.
Your tone is professional, enthusiastic, and helpful.
You can answer questions about cars, compare models, and explain technical terms.
Keep your answers concise (under 100 words) unless asked for a detailed explanation.
Do not make up facts about cars that are not generally true for the make/model.
`;

let chatSession: Chat | null = null;

export const initializeChat = (contextData?: string, language: string = 'en') => {
  const langInstruction = language === 'ar' 
    ? "ALWAYS respond in Arabic." 
    : language === 'fr' 
      ? "ALWAYS respond in French." 
      : "ALWAYS respond in English.";

  const systemInstruction = contextData 
    ? `${BASE_INSTRUCTION}\n${langInstruction}\n\nContext for the user's current view:\n${contextData}`
    : `${BASE_INSTRUCTION}\n${langInstruction}`;

  chatSession = ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction,
      temperature: 0.7,
    },
  });
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    // Fallback initialization if session is missing (defaults to English)
    initializeChat();
  }

  try {
    if (!chatSession) throw new Error("Chat session not initialized");
    
    const response: GenerateContentResponse = await chatSession.sendMessage({
      message,
    });
    
    return response.text || "I'm sorry, I didn't catch that. Could you repeat?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my knowledge base right now. Please try again later.";
  }
};

export const generateCarSummary = async (car: Car, language: string = 'en'): Promise<string> => {
  try {
     const langPrompt = language === 'ar' ? "in Arabic" : language === 'fr' ? "in French" : "in English";
     const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Write a catchy, 2-sentence marketing hook ${langPrompt} for this car: ${car.year} ${car.make} ${car.model}. Key features: ${car.description}`,
     });
     return response.text || car.description;
  } catch (e) {
    return car.description;
  }
}
