import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { savingsService } from '../../services/savings.service';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { AppHeader } from '../../components/common/AppHeader';
import { SavingsSuggestionCard } from '../../components/savings/SavingsSuggestionCard';
import { LoadingView } from '../../components/common/LoadingView';
import { Sparkles, ShieldCheck } from 'lucide-react-native';

export default function SavingsRecommendationsScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: suggestions = [], isLoading } = useQuery({
    queryKey: ['savingsSuggestions'],
    queryFn: () => savingsService.getMicroSuggestions(),
  });

  if (isLoading) {
    return <LoadingView message="Finding micro-save opportunities..." />;
  }

  const handleAccept = async (id: string) => {
    await savingsService.acceptMicroSuggestion(id);
    queryClient.invalidateQueries({ queryKey: ['savingsSuggestions'] });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
        title="Micro-Save Coach"
        subtitle="Small daily amounts that add up"
        showBack
        onBack={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Banner */}
        <View style={styles.banner}>
          <Sparkles size={20} color="#D97706" />
          <View style={styles.bannerTextCol}>
            <Text style={styles.bannerTitle}>Smart Change Roundups</Text>
            <Text style={styles.bannerDesc}>
              Small, effortless amounts like ₹10 or ₹20 saved from everyday moments compound into your emergency fund.
            </Text>
          </View>
        </View>

        <View style={styles.confirmationNotice}>
          <ShieldCheck size={14} color={Colors.textSecondary} />
          <Text style={styles.confirmationText}>
            No automated debits: savings are recorded only after your explicit confirmation.
          </Text>
        </View>

        <View style={styles.list}>
          {suggestions.map((sug) => (
            <SavingsSuggestionCard
              key={sug.id}
              suggestion={sug}
              onAccept={handleAccept}
            />
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
  banner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FEF3C7',
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  bannerTextCol: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: '#92400E',
    marginBottom: 2,
  },
  bannerDesc: {
    fontSize: FontSize.xs,
    color: '#B45309',
    lineHeight: 18,
  },
  confirmationNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: Spacing.xs,
    marginBottom: Spacing.base,
  },
  confirmationText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    flex: 1,
  },
  list: {
    gap: Spacing.sm,
  },
});

