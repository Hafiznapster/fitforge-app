import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Text, ActivityIndicator } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useAI } from '../../hooks/useAI';
import { ChatBubble } from '../../components/ai/ChatBubble';
import { ChatInput } from '../../components/ai/ChatInput';
import { SuggestionChips } from '../../components/ai/SuggestionChips';
import { theme } from '../../constants/theme';
import { ChatMessage } from '../../types/ai';

export default function AIScreen() {
  const { messages, isLoading, sendMessage } = useAI();
  const listRef = useRef<FlashList<ChatMessage>>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (messages.length > 0) {
      setTimeout(() => {
        listRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSend = (text: string) => {
    sendMessage(text);
  };

  const hasMessages = messages.length > 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.header}>
          <Text style={styles.title}>FitForge AI</Text>
          <Text style={styles.subtitle}>Powered by Groq & Gemini</Text>
        </View>

        <View style={styles.chatContainer}>
          {!hasMessages && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>How can I help you crush your goals today?</Text>
            </View>
          )}

          <FlashList
            ref={listRef}
            data={messages}
            renderItem={({ item }) => <ChatBubble message={item} />}
            keyExtractor={(item) => item.id}
            estimatedItemSize={80}
            contentContainerStyle={styles.listContent}
          />
          
          {isLoading && (
            <View style={styles.typingIndicator}>
              <ActivityIndicator size="small" color={theme.colors.primary} />
              <Text style={styles.typingText}>AI is thinking...</Text>
            </View>
          )}
        </View>

        {!hasMessages && (
          <View style={styles.suggestionsContainer}>
             <SuggestionChips onSelect={handleSend} />
          </View>
        )}

        <ChatInput onSend={handleSend} isLoading={isLoading} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
  },
  header: {
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text,
  },
  subtitle: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
  },
  chatContainer: {
    flex: 1,
  },
  listContent: {
    padding: theme.spacing.md,
  },
  emptyState: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  emptyText: {
    ...theme.typography.h3,
    color: theme.colors.textMuted,
    textAlign: 'center',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
  },
  typingText: {
    ...theme.typography.small,
    color: theme.colors.textMuted,
    marginLeft: theme.spacing.sm,
  },
  suggestionsContainer: {
    paddingTop: theme.spacing.sm,
    backgroundColor: theme.colors.background,
  },
});
