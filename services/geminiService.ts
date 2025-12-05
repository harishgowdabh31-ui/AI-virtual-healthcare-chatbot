import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize Gemini AI
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `You are a helpful and empathetic virtual healthcare assistant named "HealthBot". 
Your goal is to provide general wellness advice, help users understand symptoms, and explain medical reports or scans in simple terms.
IMPORTANT DISCLAIMER: You must always include a disclaimer that you are an AI and not a substitute for professional medical advice, diagnosis, or treatment. 
If a situation seems critical, advise the user to contact emergency services immediately.
Keep responses concise, friendly, and easy to read.`;

export const sendMessageToGemini = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[] = []
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Transform history for the API
    // The @google/genai SDK chat format is slightly different, but we can use generateContent with history context or chat.
    // Ideally use chats.create but for simplicity in this functional component stateless architecture, 
    // we will just append history to the prompt or use chat if we maintain state.
    // Let's use the chat helper for proper history management.

    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history, // Pass the previous history
    });

    const response: GenerateContentResponse = await chat.sendMessage({
      message: message
    });

    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini Text API Error:", error);
    return "I'm having trouble connecting to the healthcare service right now. Please try again later.";
  }
};

export const analyzeImageWithGemini = async (
  base64Image: string,
  prompt: string = "Analyze this medical image or report. What does it show? Be detailed but use layman's terms."
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash'; // Optimized for multimodal tasks

    // Remove header if present (e.g., "data:image/jpeg;base64,")
    const cleanBase64 = base64Image.split(',')[1] || base64Image;
    const mimeType = base64Image.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)?.[1] || 'image/jpeg';

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: cleanBase64
            }
          },
          {
            text: prompt + "\n\n" + SYSTEM_INSTRUCTION
          }
        ]
      }
    });

    return response.text || "I could not analyze this image.";
  } catch (error) {
    console.error("Gemini Vision API Error:", error);
    return "I was unable to analyze the image. Please ensure it is a clear medical image or report and try again.";
  }
};