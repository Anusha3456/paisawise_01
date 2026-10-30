import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { savingsService } from '../../services/savings.service';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { formatINR } from '../../utils/currency';
import { AppHeader } from '../../components/common/AppHeader';
import { AppCard } from '../../components/common/AppCard';
import { SavingsGoalCard } from '../../components/savings/SavingsGoalCard';
import { SavingsSuggestionCard } from '../../components/savings/SavingsSuggestionCard';
import { LoadingView } from '../../components/common/LoadingView';
import { PiggyBank, Target, Sparkles, ChevronRight } from 'lucide-react-native';

export default function SavingsIndexScreen() {
  const router = useRouter();

  const { data: goals = [], isLoading: loadingGoals } = useQuery({
    queryKey: ['savingsGoals'],
    queryFn: () => savingsService.getGoals(),
  });

  const { data: suggestions = [], isLoading: loadingSuggestions, refetch: refetchSuggestions } = useQuery({
    queryKey: ['savingsSuggestions'],
    queryFn: () => savingsService.getMicroSuggestions(),
  });

  if (loadingGoals || loadingSuggestions) {
    return <LoadingView message="Loading your savings cushion..." />;
  }

  const totalSaved = goals.reduce((sum, g) => sum + g.currentAmount, 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);

  const handleAcceptSuggestion = async (id: string) => {
    await savingsService.acceptMicroSuggestion(id);
    refetchSuggestions();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
        title="Savings & Goals"
        subtitle="Your emergency cushion & targets"
        showBack
        onBack={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Total Savings Hero */}
        <AppCard style={styles.heroCard} variant="elevated">
          <View style={styles.iconWrap}>
            <PiggyBank size={24} color={Colors.income} />
          </View>
          <Text style={styles.heroLabel}>Total Accumulated Savings</Text>
          <Text style={styles.heroAmount}>{formatINR(totalSaved)}</Text>
          <Text style={styles.heroTarget}>Total Target: {formatINR(totalTarget)}</Text>
        </AppCard>

        {/* Micro-Savings Section */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Sparkles size={16} color="#D97706" />
            <Text style={styles.sectionHeading}>Micro-Save Recommendations</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/savings/recommendations')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.suggestionsList}>
          {suggestions.slice(0, 2).map((sug) => (
            <SavingsSuggestionCard
              key={sug.id}
              suggestion={sug}
              onAccept={handleAcceptSuggestion}
            />
          ))}
        </View>

        {/* Active Goals Section */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Target size={16} color={Colors.primary} />
            <Text style={styles.sectionHeading}>Active Savings Goals</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/savings/goals')}>
            <Text style={styles.viewAllText}>Manage</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.goalsList}>
          {goals.map((goal) => (
            <SavingsGoalCard key={goal.id} goal={goal} />
          ))}
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
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.successLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  heroLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  heroAmount: {
    fontSize: FontSize.hero,
    fontWeight: FontWeight.heavy,
    color: Colors.income,
    marginBottom: 4,
  },
  heroTarget: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    marginTop: Spacing.xs,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionHeading: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  viewAllText: {
    fontSize: FontSize.xs,
    color: Colors.secondary,
    fontWeight: FontWeight.semibold,
  },
  suggestionsList: {
    marginBottom: Spacing.lg,
  },
  goalsList: {
    gap: Spacing.xs,
  },
});

