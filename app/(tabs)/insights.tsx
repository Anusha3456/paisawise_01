import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { formatINR } from '../../utils/currency';
import { AppHeader } from '../../components/common/AppHeader';
import { AppCard } from '../../components/common/AppCard';
import { ExpensePieChart } from '../../components/charts/ExpensePieChart';
import { MonthlySpendingChart } from '../../components/charts/MonthlySpendingChart';
import { CashFlowChart } from '../../components/charts/CashFlowChart';
import { useDashboard } from '../../hooks/useDashboard';
import { LoadingView } from '../../components/common/LoadingView';
import {
  Info,
  TrendingDown,
  Sparkles,
  Zap,
  Target,
  ArrowRight,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function InsightsScreen() {
  const router = useRouter();
  const { data, isLoading } = useDashboard();
  const [activeTab, setActiveTab] = useState<'category' | 'trends' | 'cashflow'>('category');

  if (isLoading || !data) {
    return <LoadingView message="Crunching financial analytics..." />;
  }

  const { metrics, categorySpending } = data;

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="Financial Insights" subtitle="Estimates & Spending Patterns" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Transparency Banner */}
        <View style={styles.estimateBanner}>
          <Info size={14} color={Colors.info} />
          <Text style={styles.estimateBannerText}>
            Calculated forecasts are projections to guide daily spending, clearly separated from confirmed manual entries.
          </Text>
        </View>

        {/* Tab Selector */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'category' && styles.tabBtnActive]}
            onPress={() => setActiveTab('category')}
          >
            <Text style={[styles.tabBtnText, activeTab === 'category' && styles.tabBtnTextActive]}>
              Categories
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'trends' && styles.tabBtnActive]}
            onPress={() => setActiveTab('trends')}
          >
            <Text style={[styles.tabBtnText, activeTab === 'trends' && styles.tabBtnTextActive]}>
              Weekly Trends
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'cashflow' && styles.tabBtnActive]}
            onPress={() => setActiveTab('cashflow')}
          >
            <Text style={[styles.tabBtnText, activeTab === 'cashflow' && styles.tabBtnTextActive]}>
              Cash Flow
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab 1: Category Breakdown */}
        {activeTab === 'category' && (
          <AppCard style={styles.sectionCard} variant="elevated">
            <Text style={styles.sectionTitle}>Flexible Spend Distribution</Text>
            <Text style={styles.sectionSubtitle}>
              Total flexible spend this cycle: {formatINR(metrics.recordedFlexibleSpending)}
            </Text>

            <ExpensePieChart
              data={categorySpending}
              totalAmount={metrics.recordedFlexibleSpending}
            />
          </AppCard>
        )}

        {/* Tab 2: Spending Trends */}
        {activeTab === 'trends' && (
          <AppCard style={styles.sectionCard} variant="elevated">
            <Text style={styles.sectionTitle}>Weekly Burn Rate</Text>
            <Text style={styles.sectionSubtitle}>
              Target weekly flexible spend: ~{formatINR(Math.round(metrics.flexibleBudget / 4))}
            </Text>

            <MonthlySpendingChart />
          </AppCard>
        )}

        {/* Tab 3: Cash Flow Allocation */}
        {activeTab === 'cashflow' && (
          <AppCard style={styles.sectionCard} variant="elevated">
            <Text style={styles.sectionTitle}>Salary Inflow vs Outflow</Text>
            <Text style={styles.sectionSubtitle}>
              How your ₹45,000 take-home is distributed
            </Text>

            <CashFlowChart
              income={metrics.monthlySalary}
              commitments={metrics.totalCommitments}
              spent={metrics.recordedFlexibleSpending}
              savings={metrics.plannedSavings}
            />
          </AppCard>
        )}

        {/* Financial Behaviour Insights */}
        <Text style={styles.behaviorHeading}>Behavioural Coach Insights</Text>

        {/* Insight Card 1 */}
        <View style={styles.insightCard}>
          <View style={[styles.insightIcon, { backgroundColor: '#DCFCE7' }]}>
            <TrendingDown size={18} color={Colors.income} />
          </View>
          <View style={styles.insightTextCol}>
            <Text style={styles.insightTitle}>Weekend Spend Warning</Text>
            <Text style={styles.insightDesc}>
              You typically spend 45% more on Friday-Sunday (Swiggy & dining). Keeping weekend spend below ₹1,200/day will preserve your month-end cushion.
            </Text>
          </View>
        </View>

        {/* Insight Card 2 */}
        <View style={styles.insightCard}>
          <View style={[styles.insightIcon, { backgroundColor: '#FEF3C7' }]}>
            <Zap size={18} color="#D97706" />
          </View>
          <View style={styles.insightTextCol}>
            <Text style={styles.insightTitle}>Upcoming Commitment Ahead</Text>
            <Text style={styles.insightDesc}>
              House rent (₹10,000) is due in {metrics.daysRemainingInCycle} days. Your salary survival engine has locked this amount safely.
            </Text>
          </View>
        </View>

        {/* AI Action CTA */}
        <TouchableOpacity
          style={styles.askAiCard}
          activeOpacity={0.85}
          onPress={() => router.push('/ai-coach')}
        >
          <Sparkles size={20} color={Colors.surface} />
          <View style={styles.askAiTextCol}>
            <Text style={styles.askAiTitle}>Have questions about your burn rate?</Text>
            <Text style={styles.askAiDesc}>Chat with your AI Coach for custom suggestions</Text>
          </View>
          <ArrowRight size={18} color={Colors.surface} />
        </TouchableOpacity>
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
  estimateBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.infoLight,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.base,
  },
  estimateBannerText: {
    flex: 1,
    fontSize: FontSize.xs,
    color: Colors.info,
    lineHeight: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceSubtle,
    borderRadius: BorderRadius.md,
    padding: 3,
    marginBottom: Spacing.base,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: BorderRadius.sm,
  },
  tabBtnActive: {
    backgroundColor: Colors.surface,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tabBtnText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
    color: Colors.textSecondary,
  },
  tabBtnTextActive: {
    color: Colors.primary,
    fontWeight: FontWeight.bold,
  },
  sectionCard: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  sectionSubtitle: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  behaviorHeading: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  insightCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.sm,
  },
  insightIcon: {
    width: 38,
    height: 38,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  insightTextCol: {
    flex: 1,
  },
  insightTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  insightDesc: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  askAiCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    padding: Spacing.base,
    borderRadius: BorderRadius.xl,
    marginTop: Spacing.md,
  },
  askAiTextCol: {
    flex: 1,
    marginLeft: Spacing.md,
    marginRight: Spacing.sm,
  },
  askAiTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.surface,
    marginBottom: 2,
  },
  askAiDesc: {
    fontSize: FontSize.xs,
    color: '#94A3B8',
  },
});

