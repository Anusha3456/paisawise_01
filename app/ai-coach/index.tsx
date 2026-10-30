import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { AppHeader } from '../../components/common/AppHeader';
import { aiCoachService, ChatMessage } from '../../services/ai.service';
import { Bot, Send, Sparkles, User } from 'lucide-react-native';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-init',
    sender: 'coach',
    text: "Namaste Rajesh! I'm your PaisaWise AI Financial Coach. Ask me anything about your salary cycle, daily allowance, upcoming bills, or how to save more this month.",
    timestamp: new Date().toISOString(),
  },
];

const SUGGESTED_QUESTIONS = [
  'Why has my daily allowance decreased?',
  'How much can I spend today?',
  'Where am I spending the most?',
  'Can I save ₹2,000 this month?',
  'What payments are coming next?',
];

export default function AiCoachScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const scrollViewRef = useRef<any>(null);

  const sendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isThinking) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsThinking(true);

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    try {
      const coachReply = await aiCoachService.askCoach(text);
      setMessages((prev) => [...prev, coachReply]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'coach',
          text: 'I ran into a temporary issue. Please check your network and ask again.',
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsThinking(false);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
        title="AI Financial Coach"
        subtitle="Burn rate analysis & guidance"
        showBack
        onBack={() => router.back()}
      />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.messagesScroll}
          showsVerticalScrollIndicator={false}
        >
          {/* Welcome Coach Card */}
          <View style={styles.coachHeroBadge}>
            <View style={styles.botIconWrap}>
              <Bot size={22} color={Colors.surface} />
            </View>
            <View style={styles.coachHeroTextCol}>
              <Text style={styles.coachHeroTitle}>PaisaWise AI Engine</Text>
              <Text style={styles.coachHeroSub}>
                Trained on Indian salary cycles & flexible budgeting
              </Text>
            </View>
          </View>

          {/* Chat Messages */}
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <View
                key={msg.id}
                style={[
                  styles.messageRow,
                  isUser ? styles.messageRowUser : styles.messageRowCoach,
                ]}
              >
                {!isUser && (
                  <View style={styles.avatarBot}>
                    <Sparkles size={14} color={Colors.secondary} />
                  </View>
                )}

                <View
                  style={[
                    styles.bubble,
                    isUser ? styles.bubbleUser : styles.bubbleCoach,
                  ]}
                >
                  <Text
                    style={[
                      styles.bubbleText,
                      isUser ? styles.bubbleTextUser : styles.bubbleTextCoach,
                    ]}
                  >
                    {msg.text}
                  </Text>
                </View>

                {isUser && (
                  <View style={styles.avatarUser}>
                    <User size={14} color={Colors.surface} />
                  </View>
                )}
              </View>
            );
          })}

          {isThinking && (
            <View style={[styles.messageRow, styles.messageRowCoach]}>
              <View style={styles.avatarBot}>
                <Sparkles size={14} color={Colors.secondary} />
              </View>
              <View style={[styles.bubble, styles.bubbleCoach, styles.thinkingBubble]}>
                <ActivityIndicator size="small" color={Colors.secondary} />
                <Text style={styles.thinkingText}>PaisaWise Coach is calculating...</Text>
              </View>
            </View>
          )}

          {/* Quick Prompts */}
          <Text style={styles.suggestionsHeading}>Frequently Asked:</Text>
          <View style={styles.quickPromptsGrid}>
            {SUGGESTED_QUESTIONS.map((q) => (
              <TouchableOpacity
                key={q}
                style={styles.promptPill}
                activeOpacity={0.75}
                onPress={() => sendMessage(q)}
              >
                <Text style={styles.promptPillText}>{q}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Bottom Input Field */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Ask your coach anything..."
            placeholderTextColor={Colors.textMuted}
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={() => sendMessage()}
            returnKeyType="send"
          />
          <TouchableOpacity
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            activeOpacity={0.8}
            onPress={() => sendMessage()}
            disabled={!inputText.trim() || isThinking}
          >
            <Send size={16} color={Colors.surface} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  messagesScroll: {
    padding: Spacing.screenPadding,
    paddingBottom: Spacing.md,
  },
  coachHeroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.lg,
    gap: Spacing.md,
  },
  botIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coachHeroTextCol: {
    flex: 1,
  },
  coachHeroTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  coachHeroSub: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: Spacing.md,
    gap: Spacing.xs,
  },
  messageRowUser: {
    justifyContent: 'flex-end',
  },
  messageRowCoach: {
    justifyContent: 'flex-start',
  },
  avatarBot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.secondaryTint,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  avatarUser: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  bubble: {
    maxWidth: '78%',
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  bubbleUser: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4,
  },
  bubbleCoach: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderBottomLeftRadius: 4,
  },
  bubbleText: {
    fontSize: FontSize.sm,
    lineHeight: 20,
  },
  bubbleTextUser: {
    color: Colors.surface,
  },
  bubbleTextCoach: {
    color: Colors.textPrimary,
  },
  thinkingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  thinkingText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  suggestionsHeading: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  quickPromptsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    marginBottom: Spacing.base,
  },
  promptPill: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    paddingVertical: 7,
    borderRadius: BorderRadius.full,
  },
  promptPillText: {
    fontSize: FontSize.xs,
    color: Colors.secondary,
    fontWeight: FontWeight.medium,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingHorizontal: Spacing.screenPadding,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  textInput: {
    flex: 1,
    backgroundColor: Colors.surfaceSubtle,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.base,
    paddingVertical: 8,
    fontSize: FontSize.sm,
    color: Colors.textPrimary,
    maxHeight: 100,
  },
  sendButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.4,
  },
});
