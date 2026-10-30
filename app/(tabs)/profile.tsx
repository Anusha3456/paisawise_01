import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../hooks/useAuth';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { formatINR } from '../../utils/currency';
import { AppHeader } from '../../components/common/AppHeader';
import { AppCard } from '../../components/common/AppCard';
import {
  User,
  Briefcase,
  Calendar,
  Building2,
  Shield,
  Settings,
  LogOut,
  ChevronRight,
  Flame,
  PiggyBank,
  CheckCircle,
} from 'lucide-react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to log out of PaisaWise?', [
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
      <AppHeader title="My Profile" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* User Profile Card */}
        <AppCard style={styles.profileCard} variant="elevated">
          <View style={styles.avatarWrap}>
            <User size={32} color={Colors.surface} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{user?.fullName || 'Rajesh Sharma'}</Text>
            <Text style={styles.userEmail}>{user?.email || 'rajesh.sharma@example.com'}</Text>
            <View style={styles.designationRow}>
              <Briefcase size={12} color={Colors.textSecondary} />
              <Text style={styles.designationText}>
                {user?.occupation || 'Software Engineer'} • {user?.city || 'Bengaluru'}
              </Text>
            </View>
          </View>
        </AppCard>

        {/* Salary Configuration Overview */}
        <Text style={styles.sectionHeading}>Salary Cycle Settings</Text>
        <AppCard style={styles.infoCard} variant="elevated">
          <View style={styles.infoRow}>
            <View style={styles.infoLabelGroup}>
              <Calendar size={16} color={Colors.primary} />
              <Text style={styles.infoLabel}>Monthly Take-Home</Text>
            </View>
            <Text style={styles.infoValue}>{formatINR(user?.monthlySalary || 45000)}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoLabelGroup}>
              <Flame size={16} color={Colors.warning} />
              <Text style={styles.infoLabel}>Salary Payday</Text>
            </View>
            <Text style={styles.infoValue}>Day {user?.payday || 1} of every month</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoLabelGroup}>
              <PiggyBank size={16} color={Colors.income} />
              <Text style={styles.infoLabel}>Planned Savings Target</Text>
            </View>
            <Text style={styles.infoValue}>{formatINR(user?.plannedSavings || 3000)}</Text>
          </View>
        </AppCard>

        {/* Navigation Menus */}
        <Text style={styles.sectionHeading}>Finances & Preferences</Text>
        <View style={styles.menuList}>
          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => router.push('/salary-survival')}
          >
            <View style={[styles.menuIconWrap, { backgroundColor: '#FEF3C7' }]}>
              <Flame size={18} color="#D97706" />
            </View>
            <Text style={styles.menuLabel}>Salary Survival Engine</Text>
            <ChevronRight size={18} color={Colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => router.push('/accounts')}
          >
            <View style={[styles.menuIconWrap, { backgroundColor: Colors.secondaryTint }]}>
              <Building2 size={18} color={Colors.secondary} />
            </View>
            <Text style={styles.menuLabel}>Manual Account Aliases</Text>
            <ChevronRight size={18} color={Colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => router.push('/commitments')}
          >
            <View style={[styles.menuIconWrap, { backgroundColor: Colors.primaryTint }]}>
              <CheckCircle size={18} color={Colors.primary} />
            </View>
            <Text style={styles.menuLabel}>Fixed Commitments & EMIs</Text>
            <ChevronRight size={18} color={Colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => router.push('/settings')}
          >
            <View style={[styles.menuIconWrap, { backgroundColor: Colors.surfaceSubtle }]}>
              <Settings size={18} color={Colors.textPrimary} />
            </View>
            <Text style={styles.menuLabel}>App Settings & Alerts</Text>
            <ChevronRight size={18} color={Colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => router.push('/settings/privacy')}
          >
            <View style={[styles.menuIconWrap, { backgroundColor: Colors.infoLight }]}>
              <Shield size={18} color={Colors.info} />
            </View>
            <Text style={styles.menuLabel}>Privacy & Data Protection</Text>
            <ChevronRight size={18} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.8} onPress={handleLogout}>
          <LogOut size={18} color={Colors.danger} />
          <Text style={styles.logoutText}>Sign Out of PaisaWise</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>PaisaWise v1.0.0 (Build 2026.1) • Made for India</Text>
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
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    padding: Spacing.base,
  },
  avatarWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  designationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  designationText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  sectionHeading: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: Spacing.xs,
    marginLeft: 4,
  },
  infoCard: {
    marginBottom: Spacing.lg,
    padding: Spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  infoLabelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoLabel: {
    fontSize: FontSize.xs,
    color: Colors.textPrimary,
    fontWeight: FontWeight.medium,
  },
  infoValue: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderSubtle,
    marginVertical: 4,
  },
  menuList: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    marginBottom: Spacing.xl,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
  },
  menuIconWrap: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  menuLabel: {
    flex: 1,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dangerLight,
    paddingVertical: 14,
    borderRadius: BorderRadius.lg,
    gap: 8,
    marginBottom: Spacing.lg,
  },
  logoutText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.danger,
  },
  versionText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    textAlign: 'center',
  },
});

