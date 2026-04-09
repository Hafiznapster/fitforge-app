import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ChatMessage } from '../../types/ai';
import { theme } from '../../constants/theme';
import { Badge } from '../ui/Badge';

interface ChatBubbleProps {
  message: ChatMessage;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.aiContainer]}>
      {!isUser && message.provider && (
        <View style={styles.providerBadge}>
          <Badge 
            label={message.provider} 
            variant={message.provider === 'groq' ? 'primary' : 'success'} 
          />
        </View>
      )}
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.aiBubble]}>
        <Text style={[styles.text, isUser ? styles.userText : styles.aiText]}>
          {message.content}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.sm,
    maxWidth: '85%',
  },
  userContainer: {
    alignSelf: 'flex-end',
  },
  aiContainer: {
    alignSelf: 'flex-start',
  },
  bubble: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  userBubble: {
    backgroundColor: theme.colors.primary,
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: theme.colors.surface,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  text: {
    ...theme.typography.body,
  },
  userText: {
    color: '#FFF',
  },
  aiText: {
    color: theme.colors.text,
  },
  providerBadge: {
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
});
