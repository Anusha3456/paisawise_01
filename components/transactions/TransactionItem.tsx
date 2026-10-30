import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { formatINR } from '../../utils/currency';
import { formatRelativeDate } from '../../utils/date';
import { Transaction } from '../../types/transaction.types';
import { CategoryIcon } from './CategoryIcon';

interface TransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const router = useRouter();
  const isIncome = transaction.type === 'income';

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => router.push(`/transactions/${transaction.id}`)}
      style={styles.container}
    >
      <CategoryIcon categoryId={transaction.categoryId} size={42} iconSize={20} />

      <View style={styles.contentCol}>
        <Text style={styles.title} numberOfLines={1}>
          {transaction.title}
        </Text>
        <View style={styles.metaRow}>
          <Text style={styles.dateText}>{formatRelativeDate(transaction.date)}</Text>
          {transaction.notes ? (
            <>
              <Text style={styles.metaDot}>•</Text>
              <Text style={styles.notesText} numberOfLines={1}>
                {transaction.notes}
              </Text>
            </>
          ) : null}
        </View>
      </View>

      <View style={styles.amountCol}>
        <Text
          style={[
            styles.amountText,
            { color: isIncome ? Colors.income : Colors.textPrimary },
          ]}
        >
          {isIncome ? '+' : '-'}{formatINR(transaction.amount)}
        </Text>
        <Text style={styles.typeBadge}>
          {isIncome ? 'Inflow' : 'Flexible'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
  },
  contentCol: {
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
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  metaDot: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginHorizontal: 4,
  },
  notesText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    flex: 1,
  },
  amountCol: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    marginBottom: 2,
  },
  typeBadge: {
    fontSize: 10,
    color: Colors.textSecondary,
  },
});

