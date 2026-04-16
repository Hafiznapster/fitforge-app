import { useState, useCallback } from 'react';
import { aiService, AIChatMessage, AIResponse } from '../services/aiService';
import Toast from 'react-native-toast-message';

export function useAI() {
  const [messages, setMessages] = useState<AIChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: AIChatMessage = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await aiService.chat(text, messages);
      const assistantMessage: AIChatMessage = {
        role: 'assistant',
        content: response.content
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'AI Error',
        text2: error.response?.data?.detail || 'Failed to get response from AI',
      });
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const clearChat = () => setMessages([]);

  return {
    messages,
    sendMessage,
    isLoading,
    clearChat,
  };
}
