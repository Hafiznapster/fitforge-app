import { useState } from 'react';
import { ChatMessage, ChatRequest, AIResponse } from '../types/ai';
import { api } from '../services/api';

export function useAI() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Formatting history for the API contract shape:
    // Only keeping the last 10 messages for context window bounds.
    const historyPayload = messages.slice(-10).map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    const userMessage: ChatMessage = {
      id: Math.random().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const requestPayload: ChatRequest = {
        message: content,
        history: historyPayload,
      };

      const { data } = await api.post<AIResponse>('/ai/chat', requestPayload);
      
      const aiMessage: ChatMessage = {
        id: Math.random().toString(),
        role: 'assistant',
        content: data.content,
        provider: data.provider,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI Error:', error);
      const errorMessage: ChatMessage = {
        id: Math.random().toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error connecting to the AI. Please try again.',
        provider: 'openrouter',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    sendMessage,
    setMessages,
  };
}
