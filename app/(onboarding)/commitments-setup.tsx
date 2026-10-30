import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { formatINR } from '../../utils/currency';
import { AppButton } from '../../components/common/AppButton';
import { AppHeader } from '../../components/common/AppHeader';
import { Home, CreditCard, Zap, Check, Sparkles } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CommitmentItem {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  selected: boolean;
}

const INITIAL_COMMITMENTS: CommitmentItem[] = [
  { id: '1', title: 'House Rent (2BHK)', amount: 10000, dueDate: 'Due on 1st', selected: true },
  { id: '2', title: 'Vehicle Loan EMI', amount: 6000, dueDate: 'Due on 5th', selected: true },
  { id: '3', title: 'Electricity & Internet', amount: 2000, dueDate: 'Due on 10th', selected: true },
];

export default function OnboardingCommitmentsSetupScreen() {
  const router = useRouter();
  const { setOnboarded } = useAuth();
  const [commitments, setCommitments] = useState(INITIAL_COMMITMENTS);

  const toggleCommitment = (id: string) => {
    setCommitments(
      commitments.map((c) => (c.id === id ? { ...c, selected: !c.selected } : c))
    );
  };

  const totalFixed = commitments
    .filter((c) => c.selected)
    .reduce((sum, c) => sum + c.amount, 0);

  const onComplete = () => {
    setOnboarded(true);
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="Onboarding" showBack onBack={() => router.back()} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Progress Indicator */}
        <View style={styles.stepContainer}>
          <Text style={styles.stepIndicator}>Step 4 of 4</Text>
          <View style={styles.stepTrack}>
            <View style={[styles.stepFill, { width: '100%' }]} />
          </View>
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>Fixed Commitments</Text>
          <Text style={styles.subtitle}>
            Select your monthly non-negotiables. These are protected first so you never face a cash shortage.
          </Text>
        </View>

        <View style={styles.list}>
          {commitments.map((item) => {
            const isSelected = item.selected;
            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                onPress={() => toggleCommitment(item.id)}
                style={[styles.card, isSelected && styles.cardSelected]}
              >
                <View style={styles.iconWrap}>
                  {item.id === '1' ? (
                    <Home size={20} color={Colors.danger} />
                  ) : item.id === '2' ? (
                    <CreditCard size={20} color={Colors.warning} />
                  ) : (
                    <Zap size={20} color={Colors.info} />
                  )}
                </View>

                <View style={styles.infoCol}>
                  <Text style={styles.commTitle}>{item.title}</Text>
                  <Text style={styles.dueDate}>{item.dueDate}</Text>
                </View>

                <View style={styles.rightCol}>
                  <Text style={styles.amount}>{formatINR(item.amount)}</Text>
                  <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                    {isSelected && <Check size={14} color={Colors.textInverse} />}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Summary Card */}
        <View style={styles.summaryBox}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Protected Commitments:</Text>
            <Text style={styles.summaryAmount}>{formatINR(totalFixed)}</Text>
          </View>
          <View style={styles.engineNotice}>
            <Sparkles size={14} color="#D97706" />
            <Text style={styles.engineText}>
              Your Salary Survival Engine will automatically protect this from your flexible allowance.
            </Text>
          </View>
        </View>

        <AppButton
          title="Launch PaisaWise Dashboard"
          onPress={onComplete}
          size="lg"
          style={styles.finishBtn}
        />
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
    flexGrow: 1,
  },
  stepContainer: {
    marginBottom: Spacing.base,
  },
  stepIndicator: {
    fontSize: FontSize.xs,
    color: Colors.secondary,
    fontWeight: FontWeight.bold,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  stepTrack: {
    height: 4,
    backgroundColor: Colors.borderSubtle,
    borderRadius: 2,
    overflow: 'hidden',
  },
  stepFill: {
    height: '100%',
    backgroundColor: Colors.secondary,
    borderRadius: 2,
  },
  header: {
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  list: {
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  cardSelected: {
    borderColor: Colors.secondary,
    backgroundColor: '#F8FAFF',
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  infoCol: {
    flex: 1,
  },
  commTitle: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  dueDate: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  rightCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  amount: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  summaryBox: {
    backgroundColor: '#FEF3C7',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: Spacing.xs,
  },
  summaryLabel: {
    fontSize: FontSize.xs,
    color: '#92400E',
    fontWeight: FontWeight.medium,
  },
  summaryAmount: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.heavy,
    color: '#92400E',
  },
  engineNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  engineText: {
    flex: 1,
    fontSize: 11,
    color: '#B45309',
    lineHeight: 15,
  },
  finishBtn: {
    marginTop: 'auto',
    marginBottom: Spacing.base,
  },
});

