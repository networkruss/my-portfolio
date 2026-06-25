import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim();

    // Simulation Fallback Function
    const getSimulationResponse = (userMessage: string) => {
      const msg = userMessage.toLowerCase();
      if (msg.includes("projects") || msg.includes("gawa")) {
        return "I have worked on several key projects like the **SCM Planner**, a **Stock Transfer Module** with RFID, and a **Purchase Order System**. Which one would you like to hear more about?";
      }
      if (msg.includes("skills") || msg.includes("tech") || msg.includes("marunong")) {
        return "My core tech stack includes **Next.js**, **React**, **TypeScript**, and **Tailwind CSS** for the frontend. For the backend, I use **Node.js**, **Spring Boot**, and **PHP (Laravel/Odoo)**.";
      }
      if (msg.includes("hello") || msg.includes("hi")) {
        return "Hi there! I am Russel AI, the digital twin of Neil Russel. How can I help you learn more about his work today?";
      }
      return "That's an interesting question! While my 'brain' is currently in simulation mode, I can tell you that Neil Russel is a very dedicated Full Stack Developer. You can contact him at soliven.neilrussel.d@gmail.com for more details!";
    };

    if (!apiKey) {
      console.warn("DEBUG: Missing GOOGLE_GENERATIVE_AI_API_KEY. Falling back to Simulation Mode.");
      const lastUserMessage = messages[messages.length - 1]?.content || "";
      const simulatedText = getSimulationResponse(lastUserMessage);
      
      return new Response(
        `0:"${simulatedText.replace(/"/g, '\\"')}"\n`,
        { 
          headers: { 
            'Content-Type': 'text/plain; charset=utf-8',
            'x-ai-simulation': 'true',
            'x-ai-error': 'missing-key'
          } 
        }
      );
    }

    const google = createGoogleGenerativeAI({ apiKey });

    try {
      const result = await streamText({
        model: google("gemini-2.0-flash") as any, 
        system: `You are Russel AI, the digital twin of Neil Russel D. Soliven, a Full Stack Developer.
        Respond as Russel's AI assistant. Be professional and concise.`,
        messages,
        maxRetries: 0,
      });

      return result.toDataStreamResponse();
    } catch (apiError: any) {
      console.error("DEBUG: Chat API Error:", apiError);
      
      // If Quota Exceeded (Limit 0) or other API errors occur, fall back to Simulation Mode.
      if (apiError.statusCode === 429 || apiError.message?.includes("quota") || apiError.statusCode === 403) {
        console.warn("DEBUG: API Error or Quota exceeded. Switching to Simulation Mode.");
        const lastUserMessage = messages[messages.length - 1]?.content || "";
        const simulatedText = getSimulationResponse(lastUserMessage);
        
        return new Response(
          `0:"${simulatedText.replace(/"/g, '\\"')}"\n`,
          { 
            headers: { 
              'Content-Type': 'text/plain; charset=utf-8',
              'x-ai-simulation': 'true',
              'x-ai-error': apiError.message || 'api-error'
            } 
          }
        );
      }
      throw apiError;
    }

  } catch (error: any) {
    console.error("DEBUG: Chat API Critical Error:", error);
    return new Response(
      JSON.stringify({ error: "AI Connection Error", details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
