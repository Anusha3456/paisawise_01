import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PieChart, ChevronRight } from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { formatINR } from '../../utils/currency';
import { CategorySpendingSummary } from '../../types/dashboard.types';
import { AppCard } from '../common/AppCard';
import { useRouter } from 'expo-router';

interface SpendingOverviewProps {
  categories: CategorySpendingSummary[];
  totalSpent: number;
}

export const SpendingOverview: React.FC<SpendingOverviewProps> = ({ categories, totalSpent }) => {
  const router = useRouter();

  return (
    <AppCard style={styles.card} variant="elevated">
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <PieChart size={16} color={Colors.primary} />
          <Text style={styles.headerTitle}>Recorded Spending</Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push('/(tabs)/insights')}
          style={styles.viewInsightsBtn}
        >
          <Text style={styles.viewInsightsText}>Insights</Text>
          <ChevronRight size={14} color={Colors.secondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Flexible Spent this cycle:</Text>
        <Text style={styles.totalValue}>{formatINR(totalSpent)}</Text>
      </View>

      {/* Multi-segment stacked bar */}
      <View style={styles.stackedBar}>
        {categories.map((cat) => (
          <View
            key={cat.categoryId}
            style={[
              styles.barSegment,
              { width: `${cat.percentage}%`, backgroundColor: cat.color },
            ]}
          />
        ))}
      </View>

      {/* Category breakdown items */}
      <View style={styles.categoryList}>
        {categories.slice(0, 4).map((cat) => (
          <View key={cat.categoryId} style={styles.categoryRow}>
            <View style={styles.categoryLeft}>
              <View style={[styles.dot, { backgroundColor: cat.color }]} />
              <Text style={styles.categoryName} numberOfLines={1}>
                {cat.categoryName}
              </Text>
            </View>
            <View style={styles.categoryRight}>
              <Text style={styles.categoryAmount}>{formatINR(cat.amount)}</Text>
              <Text style={styles.categoryPercent}>{cat.percentage}%</Text>
            </View>
          </View>
        ))}
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
  viewInsightsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewInsightsText: {
    fontSize: FontSize.xs,
    color: Colors.secondary,
    fontWeight: FontWeight.semibold,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: Spacing.sm,
  },
  totalLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  totalValue: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  stackedBar: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: Colors.borderSubtle,
    marginBottom: Spacing.md,
  },
  barSegment: {
    height: '100%',
  },
  categoryList: {
    gap: Spacing.xs,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  categoryName: {
    fontSize: FontSize.xs,
    color: Colors.textPrimary,
    fontWeight: FontWeight.medium,
  },
  categoryRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryAmount: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
  },
  categoryPercent: {
    fontSize: 10,
    color: Colors.textSecondary,
    width: 26,
    textAlign: 'right',
  },
});

