import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckCircle2, Clock, Calendar, Check } from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { formatINR } from '../../utils/currency';
import { formatShortDate } from '../../utils/date';
import { FinancialCommitment } from '../../types/commitment.types';
import { AppCard } from '../common/AppCard';
import { CategoryIcon } from '../transactions/CategoryIcon';

interface CommitmentCardProps {
  commitment: FinancialCommitment;
  onMarkAsPaid?: (id: string) => void;
  isPaying?: boolean;
}

export const CommitmentCard: React.FC<CommitmentCardProps> = ({
  commitment,
  onMarkAsPaid,
  isPaying = false,
}) => {
  const isPaid = commitment.isPaid || commitment.status === 'paid';

  return (
    <AppCard style={styles.card} variant="elevated">
      <View style={styles.topRow}>
        <CategoryIcon categoryId={commitment.categoryId} size={42} iconSize={20} />

        <View style={styles.centerInfo}>
          <Text style={styles.title} numberOfLines={1}>
            {commitment.title}
          </Text>
          <View style={styles.dueRow}>
            <Calendar size={12} color={Colors.textSecondary} />
            <Text style={styles.dueText}>
              Due: {formatShortDate(commitment.nextDueDate)} (Day {commitment.dueDateDay})
            </Text>
          </View>
        </View>

        <View style={styles.amountCol}>
          <Text style={styles.amountText}>{formatINR(commitment.amount)}</Text>
          <Text style={styles.freqText}>{commitment.frequency}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.bottomRow}>
        <View style={styles.statusPill}>
          {isPaid ? (
            <>
              <CheckCircle2 size={13} color={Colors.success} />
              <Text style={[styles.statusText, { color: Colors.success }]}>Paid this cycle</Text>
            </>
          ) : (
            <>
              <Clock size={13} color={Colors.warning} />
              <Text style={[styles.statusText, { color: Colors.warning }]}>Due soon</Text>
            </>
          )}
        </View>

        {!isPaid && onMarkAsPaid && (
          <TouchableOpacity
            style={styles.payButton}
            activeOpacity={0.8}
            disabled={isPaying}
            onPress={() => onMarkAsPaid(commitment.id)}
          >
            <Check size={14} color={Colors.surface} />
            <Text style={styles.payButtonText}>Mark Paid</Text>
          </TouchableOpacity>
        )}
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
  dueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dueText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  amountCol: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  freqText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    textTransform: 'capitalize',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderSubtle,
    marginVertical: Spacing.sm,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  statusText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
  },
  payButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadius.md,
    gap: 4,
  },
  payButtonText: {
    fontSize: FontSize.xs,
    color: Colors.surface,
    fontWeight: FontWeight.semibold,
  },
});

