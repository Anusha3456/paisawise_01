import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDashboard } from '../../hooks/useDashboard';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { DailyAllowanceCard } from '../../components/dashboard/DailyAllowanceCard';
import { SalarySummaryCard } from '../../components/dashboard/SalarySummaryCard';
import { SpendingOverview } from '../../components/dashboard/SpendingOverview';
import { UpcomingCommitments } from '../../components/dashboard/UpcomingCommitments';
import { RecentTransactions } from '../../components/dashboard/RecentTransactions';
import { LoadingView } from '../../components/common/LoadingView';
import { ErrorState } from '../../components/common/ErrorState';
import {
  Plus,
  Bot,
  PiggyBank,
  Building2,
  Sparkles,
  ArrowRight,
  Flame,
} from 'lucide-react-native';

export default function DashboardScreen() {
  const router = useRouter();
  const { data, isLoading, isError, refetch, isRefetching } = useDashboard();

  if (isLoading && !isRefetching) {
    return <LoadingView message="Loading your salary survival dashboard..." />;
  }

  if (isError || !data) {
    return <ErrorState onRetry={refetch} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={() => {
              refetch();
            }}
            colors={[Colors.primary]}
          />
        }
      >
        {/* Top Greeting Header */}
        <View style={styles.greetingHeader}>
          <View>
            <Text style={styles.greetingSub}>Namaste,</Text>
            <Text style={styles.greetingName}>{data.userName} 👋</Text>
          </View>

          <TouchableOpacity
            onPress={() => router.push('/ai-coach')}
            style={styles.aiCoachButton}
            activeOpacity={0.8}
          >
            <Bot size={18} color={Colors.surface} />
            <Text style={styles.aiCoachButtonText}>AI Coach</Text>
          </TouchableOpacity>
        </View>

        {/* 1. Hero: Salary Survival Engine - Daily Allowance */}
        <DailyAllowanceCard metrics={data.metrics} />

        {/* Quick Action Pills */}
        <View style={styles.quickActionsRow}>
          <TouchableOpacity
            style={[styles.actionPill, styles.actionPillPrimary]}
            activeOpacity={0.8}
            onPress={() => router.push('/transactions/add')}
          >
            <Plus size={16} color={Colors.surface} />
            <Text style={styles.actionPillTextPrimary}>Add Expense</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionPill}
            activeOpacity={0.8}
            onPress={() => router.push('/salary-survival')}
          >
            <Flame size={16} color={Colors.warning} />
            <Text style={styles.actionPillText}>Survival Engine</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionPill}
            activeOpacity={0.8}
            onPress={() => router.push('/savings')}
          >
            <PiggyBank size={16} color={Colors.income} />
            <Text style={styles.actionPillText}>Savings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionPill}
            activeOpacity={0.8}
            onPress={() => router.push('/accounts')}
          >
            <Building2 size={16} color={Colors.secondary} />
            <Text style={styles.actionPillText}>Accounts</Text>
          </TouchableOpacity>
        </View>

        {/* AI Money Coach Insight Box */}
        {data.coachTip && (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.push('/ai-coach')}
            style={styles.coachInsightCard}
          >
            <View style={styles.coachIconWrap}>
              <Sparkles size={18} color="#D97706" />
            </View>
            <View style={styles.coachTextCol}>
              <Text style={styles.coachTitle}>{data.coachTip.title}</Text>
              <Text style={styles.coachMessage}>{data.coachTip.message}</Text>
            </View>
            <ArrowRight size={16} color={Colors.secondary} style={styles.coachArrow} />
          </TouchableOpacity>
        )}

        {/* 2. Salary Summary Card */}
        <SalarySummaryCard
          monthlySalary={data.metrics.monthlySalary}
          totalCommitments={data.metrics.totalCommitments}
          plannedSavings={data.metrics.plannedSavings}
          flexibleBudget={data.metrics.flexibleBudget}
          cyclePeriod={data.cyclePeriod}
        />

        {/* 3. Spending Overview & Category Breakdown */}
        <SpendingOverview
          categories={data.categorySpending}
          totalSpent={data.metrics.recordedFlexibleSpending}
        />

        {/* 4. Upcoming Commitments */}
        <UpcomingCommitments commitments={data.upcomingCommitments} />

        {/* 5. Recent Transactions */}
        <RecentTransactions transactions={data.recentTransactions} />
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
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  greetingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  greetingSub: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },
  greetingName: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.heavy,
    color: Colors.textPrimary,
  },
  aiCoachButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
    gap: 6,
    elevation: 2,
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  aiCoachButtonText: {
    color: Colors.surface,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
  },
  quickActionsRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginBottom: Spacing.base,
  },
  actionPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    paddingVertical: 10,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 4,
  },
  actionPillPrimary: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  actionPillText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
  },
  actionPillTextPrimary: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.surface,
  },
  coachInsightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#FDE68A',
    marginBottom: Spacing.base,
  },
  coachIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  coachTextCol: {
    flex: 1,
  },
  coachTitle: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: '#92400E',
    marginBottom: 2,
  },
  coachMessage: {
    fontSize: FontSize.xs,
    color: '#B45309',
    lineHeight: 16,
  },
  coachArrow: {
    marginLeft: Spacing.xs,
  },
});
