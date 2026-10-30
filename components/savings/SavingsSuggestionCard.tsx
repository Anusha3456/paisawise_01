import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Sparkles, Check, ArrowRight } from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { formatINR } from '../../utils/currency';
import { MicroSavingsSuggestion } from '../../types/savings.types';
import { AppCard } from '../common/AppCard';

interface SavingsSuggestionCardProps {
  suggestion: MicroSavingsSuggestion;
  onAccept: (id: string) => void;
}

export const SavingsSuggestionCard: React.FC<SavingsSuggestionCardProps> = ({
  suggestion,
  onAccept,
}) => {
  const [confirmed, setConfirmed] = useState(suggestion.isAccepted);

  const handlePromptConfirmation = () => {
    Alert.alert(
      'Confirm Micro-Savings',
      `Move ${formatINR(suggestion.amount)} into your Emergency Savings Fund?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm Save',
          onPress: () => {
            setConfirmed(true);
            onAccept(suggestion.id);
          },
        },
      ]
    );
  };

  return (
    <AppCard style={styles.card} variant="subtle">
      <View style={styles.topRow}>
        <View style={styles.badge}>
          <Sparkles size={12} color="#D97706" />
          <Text style={styles.badgeText}>Micro-Save Opportunity</Text>
        </View>

        <Text style={styles.amountBadge}>+{formatINR(suggestion.amount)}</Text>
      </View>

      <Text style={styles.title}>{suggestion.title}</Text>
      <Text style={styles.reason}>{suggestion.reason}</Text>

      <View style={styles.footerRow}>
        {confirmed ? (
          <View style={styles.savedPill}>
            <Check size={13} color={Colors.success} />
            <Text style={styles.savedText}>Saved to Reserve</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.actionBtn}
            activeOpacity={0.8}
            onPress={handlePromptConfirmation}
          >
            <Text style={styles.actionBtnText}>Save {formatINR(suggestion.amount)} now</Text>
            <ArrowRight size={13} color={Colors.surface} />
          </TouchableOpacity>
        )}
      </View>
    </AppCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.sm,
    borderColor: '#FDE68A',
    backgroundColor: '#FFFDF5',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  badgeText: {
    fontSize: FontSize.xs,
    color: '#D97706',
    fontWeight: FontWeight.bold,
  },
  amountBadge: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.heavy,
    color: Colors.income,
  },
  title: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  reason: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: Spacing.sm,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadius.md,
    gap: 4,
  },
  actionBtnText: {
    fontSize: FontSize.xs,
    color: Colors.surface,
    fontWeight: FontWeight.bold,
  },
  savedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.successLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    gap: 4,
  },
  savedText: {
    fontSize: FontSize.xs,
    color: Colors.success,
    fontWeight: FontWeight.bold,
  },
});

