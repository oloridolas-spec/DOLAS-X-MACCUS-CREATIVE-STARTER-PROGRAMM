import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ChatMessage, MessageRole } from '../types';

// Initialize Gemini AI Client
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

const chatWithGemini = async (message: string): Promise<string> => {
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

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: MessageRole.MODEL, text: "Hello! I'm the Dolas x Maccus program assistant. How can I help you with courses or enrollment today?" }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputText.trim() || loading) return;

    const userMsg = inputText;
    setInputText('');
    setMessages(prev => [...prev, { role: MessageRole.USER, text: userMsg }]);
    setLoading(true);

    const response = await chatWithGemini(userMsg);
    
    setMessages(prev => [...prev, { role: MessageRole.MODEL, text: response }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {isOpen && (
        <div className="bg-dark-card w-80 sm:w-96 h-[500px] rounded-2xl shadow-2xl flex flex-col mb-4 overflow-hidden border border-gray-800 animate-fade-in-up">
          {/* Header */}
          <div className="bg-dark-surface p-4 flex justify-between items-center border-b border-gray-800">
            <h3 className="text-white font-medium text-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Dolas Assistant
            </h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-[#1a1a1a] space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === MessageRole.USER ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-3 text-sm rounded-2xl ${
                  msg.role === MessageRole.USER 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-dark-card border border-gray-700 text-gray-200 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-dark-card border border-gray-700 rounded-2xl rounded-bl-none px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-dark-surface border-t border-gray-800">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 bg-dark-bg border border-gray-700 rounded-full px-4 py-2 focus:outline-none focus:border-blue-500 text-gray-200 text-sm"
              />
              <button 
                onClick={handleSend}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition disabled:opacity-50"
              >
                <svg className="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-full shadow-lg transition-all hover:scale-105 flex items-center justify-center"
      >
         {!isOpen ? (
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
             </svg>
         ) : (
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
             </svg>
         )}
      </button>
    </div>
  );
};