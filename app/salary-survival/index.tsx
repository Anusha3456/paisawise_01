import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDashboard } from '../../hooks/useDashboard';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { formatINR } from '../../utils/currency';
import { AppHeader } from '../../components/common/AppHeader';
import { AppCard } from '../../components/common/AppCard';
import { LoadingView } from '../../components/common/LoadingView';
import {
  Flame,
  ShieldCheck,
  Calendar,
  Lock,
  PiggyBank,
  Wallet,
  ArrowDown,
  Info,
  CheckCircle2,
} from 'lucide-react-native';

export default function SalarySurvivalEngineScreen() {
  const router = useRouter();
  const { data, isLoading } = useDashboard();

  if (isLoading || !data) {
    return <LoadingView message="Calculating survival metrics..." />;
  }

  const { metrics } = data;

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
        title="Salary Survival Engine"
        subtitle="Mathematical burn rate model"
        showBack
        onBack={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Core Question & Hero Allowance */}
        <AppCard style={styles.heroCard} variant="elevated">
          <View style={styles.flameBadge}>
            <Flame size={20} color="#F59E0B" />
          </View>
          <Text style={styles.heroQuestion}>
            "How much can I safely spend today until my next salary?"
          </Text>
          <View style={styles.allowanceRow}>
            <Text style={styles.heroAmount}>{formatINR(metrics.recommendedDailyAllowance)}</Text>
            <Text style={styles.heroUnit}>/ day</Text>
          </View>

          {/* Transparency note */}
          <View style={styles.disclaimerPill}>
            <Info size={13} color={Colors.textSecondary} />
            <Text style={styles.disclaimerText}>
              Calculated guideline budget • Not your bank account balance
            </Text>
          </View>
        </AppCard>

        {/* Step-by-Step Mathematical Waterfall Breakdown */}
        <Text style={styles.sectionHeading}>The Formula Breakdown</Text>

        {/* Step 1: Inflow */}
        <AppCard style={styles.stepCard} variant="elevated">
          <View style={styles.stepHeader}>
            <View style={[styles.stepDot, { backgroundColor: Colors.income }]}>
              <Text style={styles.stepNum}>1</Text>
            </View>
            <View style={styles.stepTitleCol}>
              <Text style={styles.stepTitle}>Monthly Take-Home Salary</Text>
              <Text style={styles.stepSub}>Your baseline monthly income</Text>
            </View>
            <Text style={[styles.stepAmount, { color: Colors.income }]}>
              {formatINR(metrics.monthlySalary)}
            </Text>
          </View>
        </AppCard>

        <View style={styles.arrowRow}>
          <ArrowDown size={18} color={Colors.textMuted} />
          <Text style={styles.minusText}>minus fixed non-negotiables</Text>
        </View>

        {/* Step 2: Commitments */}
        <AppCard style={styles.stepCard} variant="elevated">
          <View style={styles.stepHeader}>
            <View style={[styles.stepDot, { backgroundColor: Colors.warning }]}>
              <Text style={styles.stepNum}>2</Text>
            </View>
            <View style={styles.stepTitleCol}>
              <View style={styles.labelWithIcon}>
                <Lock size={13} color={Colors.warning} />
                <Text style={styles.stepTitle}>Fixed Commitments</Text>
              </View>
              <Text style={styles.stepSub}>Rent (₹10k) + EMI (₹6k) + Bills (₹2k)</Text>
            </View>
            <Text style={[styles.stepAmount, { color: Colors.warning }]}>
              -{formatINR(metrics.totalCommitments)}
            </Text>
          </View>
        </AppCard>

        <View style={styles.arrowRow}>
          <ArrowDown size={18} color={Colors.textMuted} />
          <Text style={styles.minusText}>minus protected savings</Text>
        </View>

        {/* Step 3: Savings */}
        <AppCard style={styles.stepCard} variant="elevated">
          <View style={styles.stepHeader}>
            <View style={[styles.stepDot, { backgroundColor: Colors.secondary }]}>
              <Text style={styles.stepNum}>3</Text>
            </View>
            <View style={styles.stepTitleCol}>
              <View style={styles.labelWithIcon}>
                <PiggyBank size={13} color={Colors.secondary} />
                <Text style={styles.stepTitle}>Planned Monthly Savings</Text>
              </View>
              <Text style={styles.stepSub}>Untouchable emergency buffer</Text>
            </View>
            <Text style={[styles.stepAmount, { color: Colors.secondary }]}>
              -{formatINR(metrics.plannedSavings)}
            </Text>
          </View>
        </AppCard>

        <View style={styles.arrowRow}>
          <ArrowDown size={18} color={Colors.textMuted} />
          <Text style={styles.equalsText}>equals Total Flexible Pool</Text>
        </View>

        {/* Step 4: Flexible Pool & Spending */}
        <AppCard style={styles.summaryStepCard} variant="elevated">
          <View style={styles.poolRow}>
            <Text style={styles.poolLabel}>Total Flexible Pool:</Text>
            <Text style={styles.poolValue}>{formatINR(metrics.flexibleBudget)}</Text>
          </View>

          <View style={styles.poolDivider} />

          <View style={styles.poolRow}>
            <Text style={styles.poolLabel}>Flexible Spent so far:</Text>
            <Text style={[styles.poolValue, { color: Colors.expense }]}>
              -{formatINR(metrics.recordedFlexibleSpending)}
            </Text>
          </View>

          <View style={styles.poolDivider} />

          <View style={styles.poolRow}>
            <Text style={styles.poolHighlightLabel}>Remaining Flexible Pool:</Text>
            <Text style={styles.poolHighlightValue}>
              {formatINR(metrics.remainingFlexibleBudget)}
            </Text>
          </View>

          <View style={styles.cycleBadge}>
            <Calendar size={14} color={Colors.primary} />
            <Text style={styles.cycleBadgeText}>
              Divided by {metrics.daysRemainingInCycle} days left = {formatINR(metrics.recommendedDailyAllowance)}/day
            </Text>
          </View>
        </AppCard>

        {/* Financial Guarantee Principles */}
        <View style={styles.principlesCard}>
          <Text style={styles.principlesTitle}>Why this keeps you debt-free:</Text>
          <View style={styles.principleItem}>
            <CheckCircle2 size={16} color={Colors.success} />
            <Text style={styles.principleText}>
              Your rent and EMIs are fully locked from day 1 — no surprise shortfalls.
            </Text>
          </View>
          <View style={styles.principleItem}>
            <CheckCircle2 size={16} color={Colors.success} />
            <Text style={styles.principleText}>
              Spending under ₹1,000 today automatically increases your buffer for tomorrow.
            </Text>
          </View>
          <View style={styles.principleItem}>
            <CheckCircle2 size={16} color={Colors.success} />
            <Text style={styles.principleText}>
              You never have to guess whether you can afford dinner or a weekend outing.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: Spacing.screenPadding,
    paddingBottom: Spacing.xxl,
  },
  heroCard: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  flameBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  heroQuestion: {
    fontSize: FontSize.sm,
    fontStyle: 'italic',
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  allowanceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: Spacing.sm,
  },
  heroAmount: {
    fontSize: 40,
    fontWeight: FontWeight.heavy,
    color: Colors.primary,
    letterSpacing: -1,
  },
  heroUnit: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.textSecondary,
    marginLeft: 6,
  },
  disclaimerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceSubtle,
    paddingHorizontal: Spacing.md,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
    gap: 6,
  },
  disclaimerText: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },
  sectionHeading: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
    marginLeft: 4,
  },
  stepCard: {
    padding: Spacing.md,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepDot: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  stepNum: {
    color: Colors.surface,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
  },
  stepTitleCol: {
    flex: 1,
  },
  labelWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  stepTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  stepSub: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  stepAmount: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
  },
  arrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    gap: 6,
  },
  minusText: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },
  equalsText: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: FontWeight.bold,
  },
  summaryStepCard: {
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
    padding: Spacing.base,
    marginBottom: Spacing.lg,
  },
  poolRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  poolLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  poolValue: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  poolHighlightLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  poolHighlightValue: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.heavy,
    color: Colors.income,
  },
  poolDivider: {
    height: 1,
    backgroundColor: '#DBEAFE',
    marginVertical: 4,
  },
  cycleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.md,
    gap: 6,
  },
  cycleBadgeText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  principlesCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.sm,
  },
  principlesTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  principleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  principleText: {
    flex: 1,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
});

