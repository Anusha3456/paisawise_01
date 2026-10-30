import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { AppButton } from '../../components/common/AppButton';
import { AppHeader } from '../../components/common/AppHeader';
import { Building2, PiggyBank, Smartphone, Check, Shield } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface PresetAccount {
  id: string;
  name: string;
  type: string;
  desc: string;
  selected: boolean;
}

const DEFAULT_ACCOUNTS: PresetAccount[] = [
  {
    id: 'salary',
    name: 'Primary Salary Account',
    type: 'Bank Alias (e.g. HDFC)',
    desc: 'For monthly salary deposit, house rent & loan EMIs',
    selected: true,
  },
  {
    id: 'savings',
    name: 'Emergency Savings Account',
    type: 'Bank Alias (e.g. SBI)',
    desc: 'For holding your untouchable savings buffer',
    selected: true,
  },
  {
    id: 'wallet',
    name: 'Daily UPI Pocket Wallet',
    type: 'UPI / Cash Alias',
    desc: 'For day-to-day tea, groceries and dining expenses',
    selected: true,
  },
];

export default function OnboardingAccountsSetupScreen() {
  const router = useRouter();
  const [accounts, setAccounts] = useState<PresetAccount[]>(DEFAULT_ACCOUNTS);

  const toggleAccount = (id: string) => {
    setAccounts(accounts.map(acc => acc.id === id ? { ...acc, selected: !acc.selected } : acc));
  };

  const onNext = () => {
    router.push('/(onboarding)/commitments-setup');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="Onboarding" showBack onBack={() => router.back()} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Progress Indicator */}
        <View style={styles.stepContainer}>
          <Text style={styles.stepIndicator}>Step 3 of 4</Text>
          <View style={styles.stepTrack}>
            <View style={[styles.stepFill, { width: '75%' }]} />
          </View>
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>Account Aliases</Text>
          <Text style={styles.subtitle}>
            Organize where your money sits. You can assign transactions to these custom nicknames.
          </Text>
        </View>

        {/* Security / Privacy Banner */}
        <View style={styles.privacyBanner}>
          <Shield size={16} color={Colors.primary} />
          <Text style={styles.privacyText}>
            PaisaWise uses manual tracking nicknames. We never request your net banking credentials, OTPs, or UPI PINs.
          </Text>
        </View>

        <View style={styles.list}>
          {accounts.map((acc) => {
            const isSelected = acc.selected;
            return (
              <TouchableOpacity
                key={acc.id}
                activeOpacity={0.8}
                onPress={() => toggleAccount(acc.id)}
                style={[styles.accountCard, isSelected && styles.accountCardSelected]}
              >
                <View style={styles.iconContainer}>
                  {acc.id === 'salary' ? (
                    <Building2 size={20} color={Colors.primary} />
                  ) : acc.id === 'savings' ? (
                    <PiggyBank size={20} color={Colors.income} />
                  ) : (
                    <Smartphone size={20} color={Colors.secondary} />
                  )}
                </View>

                <View style={styles.accountInfo}>
                  <Text style={styles.accountName}>{acc.name}</Text>
                  <Text style={styles.accountType}>{acc.type}</Text>
                  <Text style={styles.accountDesc}>{acc.desc}</Text>
                </View>

                <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                  {isSelected && <Check size={14} color={Colors.textInverse} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <AppButton
          title="Next: Recurring Commitments"
          onPress={onNext}
          size="lg"
          style={styles.nextBtn}
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
    marginBottom: Spacing.md,
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
  privacyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.primaryTint,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.lg,
  },
  privacyText: {
    flex: 1,
    fontSize: FontSize.xs,
    color: Colors.primary,
    lineHeight: 16,
  },
  list: {
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  accountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  accountCardSelected: {
    borderColor: Colors.secondary,
    backgroundColor: '#F8FAFF',
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  accountType: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: Colors.secondary,
    marginBottom: 2,
  },
  accountDesc: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Spacing.sm,
  },
  checkboxSelected: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  nextBtn: {
    marginTop: 'auto',
    marginBottom: Spacing.base,
  },
});

