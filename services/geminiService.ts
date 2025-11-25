import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are the "Program Assistant" for the DOLAS X MACCUS Creative Starter Program.
This is a professional partnership between DOLAS COMMUNICATION and MACCUS TECHNOLOGY.

Key Data Points:
1. Courses: 3D Animation, Graphics Design, Motion Graphics.
2. Platform: WhatsApp and Zoom (Online).
3. Fees: Standard 2,500 Naira. Discounted 1,500 Naira (First 10 students).
4. Payment: Palmpay Account 9037096589.
5. Contacts: 09037096589, 07044602585.

Style:
- Be friendly, professional, and encouraging.
- Do not use robotic or "system" language.
- Speak like a helpful student advisor.
- If asked to register, politely provide the Palmpay account details and instruct them to send proof to WhatsApp.

Goal: Help students understand the value of the courses and guide them to registration.
`;

export const chatWithGemini = async (message: string, history: {role: string, parts: {text: string}[]}[] = []): Promise<string> => {
  if (!process.env.API_KEY) {
    return "I'm currently offline. Please contact our support line at 09037096589 for assistance.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "I didn't quite catch that. Could you please rephrase?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting right now. Please reach out to us on WhatsApp at 09037096589.";
  }
};