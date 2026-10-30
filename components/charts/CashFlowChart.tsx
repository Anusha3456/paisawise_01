import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { formatINR } from '../../utils/currency';

interface CashFlowChartProps {
  income: number;
  commitments: number;
  spent: number;
  savings: number;
}

export const CashFlowChart: React.FC<CashFlowChartProps> = ({
  income,
  commitments,
  spent,
  savings,
}) => {
  const remaining = Math.max(0, income - commitments - spent - savings);

  const items = [
    { label: 'Salary Inflow', amount: income, color: Colors.income, percentage: 100 },
    { label: 'Fixed Commitments', amount: commitments, color: Colors.warning, percentage: Math.round((commitments / income) * 100) },
    { label: 'Flexible Spent', amount: spent, color: Colors.expense, percentage: Math.round((spent / income) * 100) },
    { label: 'Planned Savings', amount: savings, color: Colors.secondary, percentage: Math.round((savings / income) * 100) },
    { label: 'Remaining Cushion', amount: remaining, color: Colors.primary, percentage: Math.round((remaining / income) * 100) },
  ];

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <View key={item.label} style={styles.row}>
          <View style={styles.labelRow}>
            <Text style={styles.itemLabel}>{item.label}</Text>
            <Text style={[styles.itemAmount, { color: item.color }]}>
              {formatINR(item.amount)} ({item.percentage}%)
            </Text>
          </View>
          <View style={styles.track}>
            <View
              style={[
                styles.fill,
                { width: `${Math.min(100, item.percentage)}%`, backgroundColor: item.color },
              ]}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.xs,
    gap: Spacing.md,
  },
  row: {
    gap: 4,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  itemLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
    color: Colors.textSecondary,
  },
  itemAmount: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
  },
  track: {
    height: 8,
    borderRadius: BorderRadius.xs,
    backgroundColor: Colors.borderSubtle,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: BorderRadius.xs,
  },
});

