import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ShieldCheck, Info, Sparkles, ChevronRight } from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { BorderRadius, Shadows, Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { formatINR } from '../../utils/currency';
import { SalarySurvivalMetrics } from '../../types/salary.types';
import { useRouter } from 'expo-router';

interface DailyAllowanceCardProps {
  metrics: SalarySurvivalMetrics;
}

export const DailyAllowanceCard: React.FC<DailyAllowanceCardProps> = ({ metrics }) => {
  const router = useRouter();

  // Calculate percentage of flexible budget spent
  const totalFlex = metrics.flexibleBudget > 0 ? metrics.flexibleBudget : 1;
  const spentPercent = Math.min(100, Math.round((metrics.recordedFlexibleSpending / totalFlex) * 100));

  return (
    <View style={styles.container}>
      {/* Top Banner Tag */}
      <View style={styles.headerRow}>
        <View style={styles.engineBadge}>
          <Sparkles size={14} color="#F59E0B" />
          <Text style={styles.engineBadgeText}>Salary Survival Engine</Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push('/salary-survival')}
          style={styles.detailsBtn}
          activeOpacity={0.7}
        >
          <Text style={styles.detailsBtnText}>How it works</Text>
          <ChevronRight size={14} color={Colors.secondary} />
        </TouchableOpacity>
      </View>

      {/* Hero Daily Allowance */}
      <View style={styles.heroSection}>
        <Text style={styles.heroSublabel}>Safe to spend today</Text>
        <View style={styles.amountRow}>
          <Text style={styles.heroAmount}>{formatINR(metrics.recommendedDailyAllowance)}</Text>
          <Text style={styles.heroPerDay}>/ day</Text>
        </View>

        {/* Mandatory Transparency Note */}
        <View style={styles.disclaimerBox}>
          <Info size={13} color={Colors.textSecondary} />
          <Text style={styles.disclaimerText}>
            Calculated budget recommendation • Not your bank balance
          </Text>
        </View>
      </View>

      {/* Progress & Days Indicator */}
      <View style={styles.progressSection}>
        <View style={styles.progressLabels}>
          <Text style={styles.progressLeftLabel}>
            Flexible Spent: <Text style={styles.boldText}>{formatINR(metrics.recordedFlexibleSpending)}</Text>
          </Text>
          <Text style={styles.progressRightLabel}>
            {metrics.daysRemainingInCycle} days to salary
          </Text>
        </View>

        <View style={styles.progressBarTrack}>
          <View style={[styles.progressBarFill, { width: `${spentPercent}%` }]} />
        </View>

        <View style={styles.budgetFooter}>
          <Text style={styles.remainingBudgetLabel}>
            Remaining Safe Pool: <Text style={styles.remainingBudgetAmount}>{formatINR(metrics.remainingFlexibleBudget)}</Text>
          </Text>
          <View style={styles.statusPill}>
            <ShieldCheck size={12} color={Colors.success} />
            <Text style={styles.statusText}>On Track</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    ...Shadows.md,
    marginBottom: Spacing.base,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  engineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    gap: 4,
  },
  engineBadgeText: {
    color: '#F8FAFC',
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
  },
  detailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    gap: 2,
  },
  detailsBtnText: {
    color: Colors.secondary,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: Spacing.xs,
  },
  heroSublabel: {
    fontSize: FontSize.sm,
    color: '#94A3B8',
    fontWeight: FontWeight.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 2,
    marginBottom: Spacing.xs,
  },
  heroAmount: {
    fontSize: 38,
    fontWeight: FontWeight.heavy,
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  heroPerDay: {
    fontSize: FontSize.md,
    color: '#94A3B8',
    fontWeight: FontWeight.medium,
    marginLeft: Spacing.xs,
  },
  disclaimerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    gap: 6,
    marginTop: 4,
  },
  disclaimerText: {
    fontSize: 10,
    color: '#CBD5E1',
    fontWeight: FontWeight.medium,
  },
  progressSection: {
    marginTop: Spacing.base,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  progressLeftLabel: {
    fontSize: FontSize.xs,
    color: '#E2E8F0',
  },
  boldText: {
    fontWeight: FontWeight.bold,
    color: '#FFFFFF',
  },
  progressRightLabel: {
    fontSize: FontSize.xs,
    color: '#F59E0B',
    fontWeight: FontWeight.semibold,
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 4,
    overflow: 'hidden',
    marginVertical: Spacing.xs,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#38BDF8',
    borderRadius: 4,
  },
  budgetFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
  remainingBudgetLabel: {
    fontSize: FontSize.xs,
    color: '#CBD5E1',
  },
  remainingBudgetAmount: {
    fontWeight: FontWeight.bold,
    color: '#34D399',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(22, 163, 74, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    gap: 4,
  },
  statusText: {
    fontSize: 10,
    color: '#4ADE80',
    fontWeight: FontWeight.semibold,
  },
});

