import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Target, CheckCircle, Plus } from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { formatINR } from '../../utils/currency';
import { formatShortDate } from '../../utils/date';
import { SavingsGoal } from '../../types/savings.types';
import { AppCard } from '../common/AppCard';

interface SavingsGoalCardProps {
  goal: SavingsGoal;
  onAddFunds?: (id: string) => void;
}

export const SavingsGoalCard: React.FC<SavingsGoalCardProps> = ({ goal, onAddFunds }) => {
  const percent = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));

  return (
    <AppCard style={styles.card} variant="elevated">
      <View style={styles.topRow}>
        <View style={[styles.iconWrap, { backgroundColor: goal.color + '20' }]}>
          <Target size={20} color={goal.color} />
        </View>

        <View style={styles.centerInfo}>
          <Text style={styles.title} numberOfLines={1}>
            {goal.title}
          </Text>
          <Text style={styles.targetDate}>
            Target: {formatShortDate(goal.targetDate)}
          </Text>
        </View>

        {goal.isCompleted ? (
          <View style={styles.completedBadge}>
            <CheckCircle size={14} color={Colors.success} />
            <Text style={styles.completedText}>Reached</Text>
          </View>
        ) : onAddFunds ? (
          <TouchableOpacity
            style={styles.addBtn}
            activeOpacity={0.8}
            onPress={() => onAddFunds(goal.id)}
          >
            <Plus size={14} color={Colors.primary} />
            <Text style={styles.addBtnText}>Deposit</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Progress Bar */}
      <View style={styles.progressSection}>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${percent}%`, backgroundColor: goal.color },
            ]}
          />
        </View>

        <View style={styles.amountRow}>
          <Text style={styles.savedAmount}>
            {formatINR(goal.currentAmount)}
            <Text style={styles.totalTarget}> / {formatINR(goal.targetAmount)}</Text>
          </Text>
          <Text style={styles.percentText}>{percent}%</Text>
        </View>
      </View>
    </AppCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerInfo: {
    flex: 1,
    marginLeft: Spacing.md,
    marginRight: Spacing.sm,
  },
  title: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  targetDate: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.successLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    gap: 4,
  },
  completedText: {
    fontSize: FontSize.xs,
    color: Colors.success,
    fontWeight: FontWeight.bold,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryTint,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.md,
    gap: 4,
  },
  addBtnText: {
    fontSize: FontSize.xs,
    color: Colors.primary,
    fontWeight: FontWeight.semibold,
  },
  progressSection: {
    marginTop: 4,
  },
  progressTrack: {
    height: 8,
    backgroundColor: Colors.borderSubtle,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  savedAmount: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  totalTarget: {
    fontWeight: FontWeight.regular,
    color: Colors.textSecondary,
  },
  percentText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.textSecondary,
  },
});
