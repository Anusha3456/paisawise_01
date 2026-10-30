import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCommitments } from '../../hooks/useCommitments';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { formatINR } from '../../utils/currency';
import { AppHeader } from '../../components/common/AppHeader';
import { AppCard } from '../../components/common/AppCard';
import { CommitmentCard } from '../../components/commitments/CommitmentCard';
import { LoadingView } from '../../components/common/LoadingView';
import { Lock, Plus, AlertCircle } from 'lucide-react-native';

export default function CommitmentsIndexScreen() {
  const router = useRouter();
  const { commitments, isLoading, markAsPaid, isPaying } = useCommitments();

  if (isLoading) {
    return <LoadingView message="Loading your fixed commitments..." />;
  }

  const totalMonthlyCommitments = commitments.reduce((sum, c) => sum + c.amount, 0);
  const paidCount = commitments.filter((c) => c.isPaid).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
        title="Fixed Commitments"
        subtitle="Rent, EMIs & Bills"
        showBack
        onBack={() => router.back()}
        rightAction={
          <TouchableOpacity
            style={styles.addBtn}
            activeOpacity={0.8}
            onPress={() => router.push('/commitments/add')}
          >
            <Plus size={18} color={Colors.surface} />
          </TouchableOpacity>
        }
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Total Commitments Protected Hero */}
        <AppCard style={styles.heroCard} variant="elevated">
          <View style={styles.lockBadge}>
            <Lock size={16} color={Colors.warning} />
          </View>
          <Text style={styles.heroLabel}>Total Monthly Fixed Commitments</Text>
          <Text style={styles.heroAmount}>{formatINR(totalMonthlyCommitments)}</Text>
          <Text style={styles.heroSub}>
            {paidCount} of {commitments.length} paid this cycle
          </Text>
        </AppCard>

        {/* Protection Note */}
        <View style={styles.noticeBox}>
          <AlertCircle size={15} color="#D97706" />
          <Text style={styles.noticeText}>
            These amounts are deducted first from your salary before your daily safe allowance is computed.
          </Text>
        </View>

        <Text style={styles.sectionHeading}>Scheduled Payments</Text>

        <View style={styles.list}>
          {commitments.map((comm) => (
            <CommitmentCard
              key={comm.id}
              commitment={comm}
              onMarkAsPaid={markAsPaid}
              isPaying={isPaying}
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
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroCard: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    marginBottom: Spacing.base,
  },
  lockBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FEF3C7',
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
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.heavy,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  heroSub: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  noticeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  noticeText: {
    flex: 1,
    fontSize: FontSize.xs,
    color: '#B45309',
    lineHeight: 16,
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
  list: {
    gap: Spacing.xs,
  },
});

