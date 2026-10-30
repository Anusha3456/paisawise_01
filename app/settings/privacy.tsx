import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { AppHeader } from '../../components/common/AppHeader';
import { AppCard } from '../../components/common/AppCard';
import { ShieldCheck, Lock, EyeOff, Server } from 'lucide-react-native';

export default function PrivacySettingsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
        title="Privacy & Security"
        subtitle="Zero credential collection guarantee"
        showBack
        onBack={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <AppCard style={styles.card} variant="elevated">
          <View style={styles.badgeWrap}>
            <ShieldCheck size={28} color={Colors.income} />
          </View>
          <Text style={styles.title}>Your Financial Privacy is Paramount</Text>
          <Text style={styles.desc}>
            PaisaWise is architected with strict privacy guardrails specifically tailored for Indian users.
          </Text>
        </AppCard>

        <Text style={styles.sectionHeading}>Our Security Commitments</Text>

        <View style={styles.principlesList}>
          <View style={styles.principleCard}>
            <View style={styles.iconBox}>
              <Lock size={18} color={Colors.primary} />
            </View>
            <View style={styles.principleTextCol}>
              <Text style={styles.principleTitle}>No Bank Credentials Ever Collected</Text>
              <Text style={styles.principleDesc}>
                We will never ask for your net banking passwords, UPI PINs, ATM debit card numbers, or SMS OTPs.
              </Text>
            </View>
          </View>

          <View style={styles.principleCard}>
            <View style={styles.iconBox}>
              <EyeOff size={18} color={Colors.secondary} />
            </View>
            <View style={styles.principleTextCol}>
              <Text style={styles.principleTitle}>Manual Aliases Only</Text>
              <Text style={styles.principleDesc}>
                Accounts in PaisaWise are customized aliases (nicknames) that you manually input and track.
              </Text>
            </View>
          </View>

          <View style={styles.principleCard}>
            <View style={styles.iconBox}>
              <Server size={18} color={Colors.income} />
            </View>
            <View style={styles.principleTextCol}>
              <Text style={styles.principleTitle}>Encrypted Device Storage</Text>
              <Text style={styles.principleDesc}>
                Authentication tokens are safeguarded using Expo SecureStore (Android Keystore / iOS Keychain hardware encryption).
              </Text>
            </View>
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
  card: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.lg,
  },
  badgeWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.successLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  desc: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
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
  principlesList: {
    gap: Spacing.md,
  },
  principleCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    padding: Spacing.base,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  principleTextCol: {
    flex: 1,
  },
  principleTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  principleDesc: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
});

