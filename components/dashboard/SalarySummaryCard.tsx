import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar, Briefcase, Lock, PiggyBank, Wallet } from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { formatINR } from '../../utils/currency';
import { AppCard } from '../common/AppCard';

interface SalarySummaryCardProps {
  monthlySalary: number;
  totalCommitments: number;
  plannedSavings: number;
  flexibleBudget: number;
  cyclePeriod: string;
}

export const SalarySummaryCard: React.FC<SalarySummaryCardProps> = ({
  monthlySalary,
  totalCommitments,
  plannedSavings,
  flexibleBudget,
  cyclePeriod,
}) => {
  return (
    <AppCard style={styles.card} variant="elevated">
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Briefcase size={16} color={Colors.primary} />
          <Text style={styles.headerTitle}>Salary Allocation</Text>
        </View>
        <View style={styles.periodBadge}>
          <Calendar size={12} color={Colors.textSecondary} />
          <Text style={styles.periodText}>{cyclePeriod}</Text>
        </View>
      </View>

      <View style={styles.grid}>
        {/* Monthly Inflow */}
        <View style={styles.gridItem}>
          <Text style={styles.itemLabel}>Take-Home Salary</Text>
          <Text style={[styles.itemAmount, { color: Colors.income }]}>
            {formatINR(monthlySalary)}
          </Text>
        </View>

        {/* Fixed Commitments */}
        <View style={styles.gridItem}>
          <View style={styles.labelWithIcon}>
            <Lock size={12} color={Colors.warning} />
            <Text style={styles.itemLabel}>Fixed Bills/EMI</Text>
          </View>
          <Text style={[styles.itemAmount, { color: Colors.warning }]}>
            {formatINR(totalCommitments)}
          </Text>
        </View>

        {/* Planned Savings */}
        <View style={styles.gridItem}>
          <View style={styles.labelWithIcon}>
            <PiggyBank size={12} color={Colors.secondary} />
            <Text style={styles.itemLabel}>Planned Savings</Text>
          </View>
          <Text style={[styles.itemAmount, { color: Colors.secondary }]}>
            {formatINR(plannedSavings)}
          </Text>
        </View>

        {/* Flexible Spend Pool */}
        <View style={styles.gridItem}>
          <View style={styles.labelWithIcon}>
            <Wallet size={12} color={Colors.primary} />
            <Text style={styles.itemLabel}>Flexible Pool</Text>
          </View>
          <Text style={[styles.itemAmount, { color: Colors.primary }]}>
            {formatINR(flexibleBudget)}
          </Text>
        </View>
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
    marginBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
    paddingBottom: Spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  periodBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.surfaceSubtle,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  periodText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -Spacing.xs,
  },
  gridItem: {
    width: '50%',
    padding: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  labelWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  itemLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  itemAmount: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
  },
});

