import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { accountService } from '../../services/account.service';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { formatINR } from '../../utils/currency';
import { AppHeader } from '../../components/common/AppHeader';
import { AppCard } from '../../components/common/AppCard';
import { LoadingView } from '../../components/common/LoadingView';
import { Building2, PiggyBank, Smartphone, Shield, Plus, Wallet } from 'lucide-react-native';

export default function AccountsIndexScreen() {
  const router = useRouter();

  const { data: accounts = [], isLoading } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => accountService.getAccounts(),
  });

  if (isLoading) {
    return <LoadingView message="Loading manual account aliases..." />;
  }

  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
        title="Manual Accounts"
        subtitle="Nicknames & manual balances"
        showBack
        onBack={() => router.back()}
        rightAction={
          <TouchableOpacity
            style={styles.addBtn}
            activeOpacity={0.8}
            onPress={() => router.push('/accounts/add')}
          >
            <Plus size={18} color={Colors.surface} />
          </TouchableOpacity>
        }
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Total Tracked Balance Banner */}
        <AppCard style={styles.heroCard} variant="elevated">
          <Text style={styles.heroLabel}>Total Manually Tracked</Text>
          <Text style={styles.heroAmount}>{formatINR(totalBalance)}</Text>
          <View style={styles.securityBadge}>
            <Shield size={13} color={Colors.info} />
            <Text style={styles.securityText}>
              Manual tracking only • No bank logins or OTPs ever needed
            </Text>
          </View>
        </AppCard>

        <Text style={styles.sectionHeading}>Your Accounts</Text>

        <View style={styles.list}>
          {accounts.map((acc) => (
            <AppCard key={acc.id} style={styles.accountCard} variant="elevated">
              <View style={styles.cardHeader}>
                <View style={styles.iconWrap}>
                  {acc.type === 'salary' ? (
                    <Building2 size={20} color={Colors.primary} />
                  ) : acc.type === 'savings' ? (
                    <PiggyBank size={20} color={Colors.income} />
                  ) : (
                    <Smartphone size={20} color={Colors.warning} />
                  )}
                </View>

                <View style={styles.infoCol}>
                  <Text style={styles.accName}>{acc.name}</Text>
                  <Text style={styles.bankName}>{acc.bankName || 'Personal Wallet'}</Text>
                </View>

                <View style={styles.balanceCol}>
                  <Text style={styles.balanceText}>{formatINR(acc.balance)}</Text>
                  <Text style={styles.manualTag}>Manual Alias</Text>
                </View>
              </View>
            </AppCard>
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
    backgroundColor: Colors.surface,
    marginBottom: Spacing.lg,
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
    color: Colors.primary,
    marginBottom: Spacing.sm,
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.infoLight,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    gap: 6,
  },
  securityText: {
    fontSize: 10,
    color: Colors.info,
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
  list: {
    gap: Spacing.md,
  },
  accountCard: {
    padding: Spacing.base,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  infoCol: {
    flex: 1,
  },
  accName: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  bankName: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  balanceCol: {
    alignItems: 'flex-end',
  },
  balanceText: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  manualTag: {
    fontSize: 10,
    color: Colors.textMuted,
  },
});

