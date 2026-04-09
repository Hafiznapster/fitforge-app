export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  provider?: 'groq' | 'gemini' | 'openrouter';
  timestamp: Date;
}

export interface ChatRequest {
  message: string;
  history: { role: 'user' | 'assistant', content: string }[];
}

export interface AIResponse {
  content: string;
  provider: 'groq' | 'gemini' | 'openrouter';
}
