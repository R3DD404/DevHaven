
import { GoogleGenerativeAI } from "@google/generative-ai";

// Get API key from environment variables
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

// Validate the API key is available
if (!GEMINI_API_KEY) {
  console.error("Missing Gemini API key. Please set VITE_GEMINI_API_KEY in your .env file");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateResponse(message: string, previousMessages?: string[]) {
  try {
    // Sanitize inputs to prevent injection attacks
    const sanitizedMessage = sanitizeInput(message);
    const sanitizedPreviousMessages = previousMessages?.map(sanitizeInput) || [];

    // Construct the prompt for Gemini
    const systemPrompt = `
    You are DevHaven — a calm, thoughtful, emotionally intelligent best friend for burned-out developers.
    You talk like a real person, not like a therapist or support system.
    
    HOW TO RESPOND:
    - Be human. You're not a bot, you're their friend who just gets it.
    - Use relaxed, natural tone — not overly cheerful or formal
    - If they’re sad or overwhelmed, listen. Don’t try to “fix” everything — just be present and real.
    - You can swear gently or use casual language like "hey man", "I feel you", "dude", "bro", "you’re not alone", etc.
    - You can reference burnout, tiredness, loneliness, frustration, confusion — anything they're expressing.
    - You’re not giving solutions. You’re holding space. Offer support, not lectures.
    
    RULES:
    - Keep replies short (2–4 lines max), but emotionally real
    - Never say you're an AI or assistant
    - Keep it personal. Use their name if you know it.
    - Always make them feel heard, even if they don’t say much
    - NEVER start with “I understand that you...” — that feels fake
    `;

    const userContext = `The developer has just shared: "${sanitizedMessage}"`;

    const conversationContext = sanitizedPreviousMessages.length > 0
      ? `Here's the conversation so far: ${sanitizedPreviousMessages.join("\n")}`
      : '';

    const fullPrompt = `${systemPrompt}

${userContext}

${conversationContext}

Respond with empathy and care:`;

    // Make the API call with a shorter timeout to prevent long waits
    const result = await Promise.race([
      model.generateContent(fullPrompt),
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error("Response generation timed out")), 5000)
      )
    ]);
    
    // Type assertion since we're using Promise.race
    const response = (result as any).response.text();
    return response;
  } catch (error) {
    console.error('Error generating AI response:', error);
    return "I'm here to listen and support you. Could you share a bit more about what's on your mind today?";
  }
}

// Simple input sanitization to prevent prompt injection
function sanitizeInput(text: string): string {
  if (!text) return "";
  
  // Remove any potential script/HTML injection
  const sanitized = text
    .replace(/<(script|iframe|object|embed|style|form|input)/gi, "&lt;$1")
    // Remove excessive newlines which could break prompts
    .replace(/\n{3,}/g, "\n\n")
    // Limit length to prevent very large inputs
    .slice(0, 1000);
    
  return sanitized;
}

export function extractQuote(messages: { content: string; isUser: boolean }[]) {
  // Filter out only AI messages
  const aiMessages = messages.filter(msg => !msg.isUser);
  
  if (aiMessages.length === 0) {
    return "Your journey as a developer has ups and downs. Remember that struggles are part of growth, not failure.";
  }
  
  // Get the most meaningful message
  // For simplicity, we'll use the most recent substantive message
  let bestQuote = aiMessages[aiMessages.length - 1].content;
  
  // If it's too long, try to extract a meaningful sentence
  if (bestQuote.length > 120) {
    // Split by sentences and find one that contains positive keywords
    const sentences = bestQuote.split(/[.!?]+/);
    const positiveKeywords = ['can', 'will', 'better', 'good', 'great', 'amazing', 'wonderful', 
                             'progress', 'growth', 'improve', 'strength', 'mindful', 'rest', 
                             'breathe', 'pause', 'reflect', 'capable', 'valuable'];
    
    const positiveQuotes = sentences.filter(sentence => 
      positiveKeywords.some(keyword => sentence.toLowerCase().includes(keyword))
    );
    
    if (positiveQuotes.length > 0) {
      // Find the shortest positive quote that's still substantial
      const shortQuote = positiveQuotes
        .filter(quote => quote.length > 30 && quote.length < 150)
        .sort((a, b) => a.length - b.length)[0];
        
      if (shortQuote) {
        bestQuote = shortQuote.trim();
      }
    } else {
      // If no positive quotes, just use the shortest substantial sentence
      const shortQuote = sentences
        .filter(quote => quote.trim().length > 30 && quote.trim().length < 150)
        .sort((a, b) => a.length - b.length)[0];
        
      if (shortQuote) {
        bestQuote = shortQuote.trim();
      }
    }
  }
  
  // Remove any leading/trailing quotation marks
  bestQuote = bestQuote.replace(/^["']|["']$/g, '').trim();
  
  return bestQuote;
}
