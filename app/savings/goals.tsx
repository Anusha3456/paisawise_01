import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { savingsService } from '../../services/savings.service';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { AppHeader } from '../../components/common/AppHeader';
import { SavingsGoalCard } from '../../components/savings/SavingsGoalCard';
import { LoadingView } from '../../components/common/LoadingView';
import { Plus } from 'lucide-react-native';

export default function SavingsGoalsScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: goals = [], isLoading } = useQuery({
    queryKey: ['savingsGoals'],
    queryFn: () => savingsService.getGoals(),
  });

  const depositMutation = useMutation({
    mutationFn: ({ id, amount }: { id: string; amount: number }) =>
      savingsService.depositToGoal(id, amount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savingsGoals'] });
      Alert.alert('Deposit Confirmed', 'Amount added to your savings target!');
    },
  });

  if (isLoading) {
    return <LoadingView message="Loading your goals..." />;
  }

  const handleDeposit = (id: string) => {
    Alert.alert(
      'Deposit to Goal',
      'Select deposit amount to move from your flexible pool:',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: '+₹500', onPress: () => depositMutation.mutate({ id, amount: 500 }) },
        { text: '+₹1,000', onPress: () => depositMutation.mutate({ id, amount: 1000 }) },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
        title="Savings Goals"
        subtitle="Track targeted savings funds"
        showBack
        onBack={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.list}>
          {goals.map((goal) => (
            <SavingsGoalCard key={goal.id} goal={goal} onAddFunds={handleDeposit} />
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
  list: {
    gap: Spacing.xs,
  },
});

