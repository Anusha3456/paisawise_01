import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../hooks/useAuth';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { AppHeader } from '../../components/common/AppHeader';
import { AppCard } from '../../components/common/AppCard';
import { Bell, Moon, Shield, DollarSign, LogOut, ChevronRight } from 'lucide-react-native';

export default function SettingsIndexScreen() {
  const router = useRouter();
  const { user, updateUser, logout } = useAuth();

  const [dailyReminder, setDailyReminder] = useState(
    user?.preferences.dailyAllowanceReminder ?? true
  );
  const [commitmentAlerts, setCommitmentAlerts] = useState(
    user?.preferences.upcomingCommitmentAlerts ?? true
  );

  const toggleDailyReminder = async (val: boolean) => {
    setDailyReminder(val);
    await updateUser({
      preferences: { ...user!.preferences, dailyAllowanceReminder: val },
    });
  };

  const toggleCommitmentAlerts = async (val: boolean) => {
    setCommitmentAlerts(val);
    await updateUser({
      preferences: { ...user!.preferences, upcomingCommitmentAlerts: val },
    });
  };

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/(auth)/login');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
        title="Settings & Preferences"
        showBack
        onBack={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Notifications Section */}
        <Text style={styles.sectionHeading}>Smart Notifications</Text>
        <AppCard style={styles.card} variant="elevated">
          <View style={styles.settingRow}>
            <View style={styles.textCol}>
              <Text style={styles.settingTitle}>Daily Allowance Morning Briefing</Text>
              <Text style={styles.settingDesc}>
                Get your safe spending budget delivered every morning at 8:30 AM
              </Text>
            </View>
            <Switch
              value={dailyReminder}
              onValueChange={toggleDailyReminder}
              trackColor={{ false: Colors.border, true: Colors.secondary }}
              thumbColor={Colors.surface}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.textCol}>
              <Text style={styles.settingTitle}>Commitment Due Alerts</Text>
              <Text style={styles.settingDesc}>
                Reminders 3 days before rent and EMIs are scheduled
              </Text>
            </View>
            <Switch
              value={commitmentAlerts}
              onValueChange={toggleCommitmentAlerts}
              trackColor={{ false: Colors.border, true: Colors.secondary }}
              thumbColor={Colors.surface}
            />
          </View>
        </AppCard>

        {/* Currency & Theme */}
        <Text style={styles.sectionHeading}>Regional & Formatting</Text>
        <AppCard style={styles.card} variant="elevated">
          <View style={styles.settingRow}>
            <View style={styles.textCol}>
              <Text style={styles.settingTitle}>Currency Format</Text>
              <Text style={styles.settingDesc}>Indian Numbering (₹ Lakhs & Crores)</Text>
            </View>
            <Text style={styles.badgeText}>INR (₹)</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.textCol}>
              <Text style={styles.settingTitle}>Visual Theme</Text>
              <Text style={styles.settingDesc}>Clean Light Fintech Theme</Text>
            </View>
            <Text style={styles.badgeText}>Light</Text>
          </View>
        </AppCard>

        {/* Privacy Link */}
        <Text style={styles.sectionHeading}>Security</Text>
        <TouchableOpacity
          style={styles.linkCard}
          activeOpacity={0.7}
          onPress={() => router.push('/settings/privacy')}
        >
          <View style={styles.linkIconWrap}>
            <Shield size={18} color={Colors.info} />
          </View>
          <View style={styles.linkTextCol}>
            <Text style={styles.linkTitle}>Privacy & Data Protection</Text>
            <Text style={styles.linkDesc}>How PaisaWise protects your financial privacy</Text>
          </View>
          <ChevronRight size={18} color={Colors.textSecondary} />
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.8} onPress={handleLogout}>
          <LogOut size={18} color={Colors.danger} />
          <Text style={styles.logoutText}>Sign Out</Text>
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
  sectionHeading: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: Spacing.xs,
    marginLeft: 4,
  },
  card: {
    marginBottom: Spacing.lg,
    padding: Spacing.base,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  textCol: {
    flex: 1,
    paddingRight: Spacing.md,
  },
  settingTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  settingDesc: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderSubtle,
    marginVertical: Spacing.sm,
  },
  badgeText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.secondary,
  },
  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.xl,
  },
  linkIconWrap: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.infoLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  linkTextCol: {
    flex: 1,
  },
  linkTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
  },
  linkDesc: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dangerLight,
    paddingVertical: 14,
    borderRadius: BorderRadius.lg,
    gap: 8,
  },
  logoutText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.danger,
  },
});

