import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowUpRight, ArrowDownLeft, ChevronRight } from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { formatINR } from '../../utils/currency';
import { formatRelativeDate } from '../../utils/date';
import { Transaction } from '../../types/transaction.types';
import { AppCard } from '../common/AppCard';
import { useRouter } from 'expo-router';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  const router = useRouter();

  return (
    <AppCard style={styles.card} variant="elevated">
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recent Transactions</Text>
        <TouchableOpacity
          onPress={() => router.push('/(tabs)/activity')}
          style={styles.viewAllBtn}
        >
          <Text style={styles.viewAllText}>View All</Text>
          <ChevronRight size={14} color={Colors.secondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.list}>
        {transactions.slice(0, 4).map((tx) => {
          const isIncome = tx.type === 'income';

          return (
            <TouchableOpacity
              key={tx.id}
              activeOpacity={0.7}
              onPress={() => router.push(`/transactions/${tx.id}`)}
              style={styles.itemRow}
            >
              <View
                style={[
                  styles.iconWrap,
                  { backgroundColor: isIncome ? Colors.successLight : Colors.primaryTint },
                ]}
              >
                {isIncome ? (
                  <ArrowDownLeft size={16} color={Colors.income} />
                ) : (
                  <ArrowUpRight size={16} color={Colors.primary} />
                )}
              </View>

              <View style={styles.infoCol}>
                <Text style={styles.itemTitle} numberOfLines={1}>
                  {tx.title}
                </Text>
                <Text style={styles.itemDate}>{formatRelativeDate(tx.date)}</Text>
              </View>

              <Text
                style={[
                  styles.amountText,
                  { color: isIncome ? Colors.income : Colors.textPrimary },
                ]}
              >
                {isIncome ? '+' : '-'}{formatINR(tx.amount)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </AppCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.base,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
    paddingBottom: Spacing.xs,
  },
  headerTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewAllText: {
    fontSize: FontSize.xs,
    color: Colors.secondary,
    fontWeight: FontWeight.semibold,
  },
  list: {
    gap: Spacing.xs,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  infoCol: {
    flex: 1,
    paddingRight: Spacing.sm,
  },
  itemTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  itemDate: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  amountText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
  },
});

