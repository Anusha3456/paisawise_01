import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { accountSchema, AccountFormData } from '../../utils/validators';
import { accountService } from '../../services/account.service';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { AppHeader } from '../../components/common/AppHeader';
import { AppInput } from '../../components/common/AppInput';
import { AppButton } from '../../components/common/AppButton';
import { Shield, Building2, PiggyBank, Smartphone, HelpCircle } from 'lucide-react-native';

const ACCOUNT_TYPES = [
  { id: 'salary', label: 'Salary Account', icon: Building2 },
  { id: 'savings', label: 'Savings Account', icon: PiggyBank },
  { id: 'wallet', label: 'UPI / Cash Wallet', icon: Smartphone },
  { id: 'other', label: 'Other Reserve', icon: HelpCircle },
] as const;

export default function AddAccountScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: '',
      type: 'salary',
      balance: 0,
      bankName: '',
    },
  });

  const selectedType = watch('type');

  const onSubmit = async (data: AccountFormData) => {
    await accountService.addAccount({
      name: data.name,
      type: data.type,
      balance: data.balance,
      bankName: data.bankName,
    });
    queryClient.invalidateQueries({ queryKey: ['accounts'] });
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="Add Account Alias" showBack onBack={() => router.back()} />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.privacyCard}>
            <Shield size={16} color={Colors.primary} />
            <Text style={styles.privacyText}>
              Add a nickname to label where your money sits. No bank passwords or net banking integrations required.
            </Text>
          </View>

          <Text style={styles.sectionLabel}>Account Category</Text>
          <View style={styles.typeGrid}>
            {ACCOUNT_TYPES.map((t) => {
              const Icon = t.icon;
              const isSelected = selectedType === t.id;
              return (
                <TouchableOpacity
                  key={t.id}
                  activeOpacity={0.8}
                  onPress={() => setValue('type', t.id)}
                  style={[styles.typeCard, isSelected && styles.typeCardSelected]}
                >
                  <Icon size={20} color={isSelected ? Colors.secondary : Colors.textSecondary} />
                  <Text style={[styles.typeLabel, isSelected && styles.typeLabelSelected]}>
                    {t.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput
                label="Account Nickname / Alias"
                placeholder="e.g. HDFC Salary, ICICI Daily"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="bankName"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput
                label="Bank / Provider Name (Optional)"
                placeholder="e.g. HDFC Bank, SBI, Paytm"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="balance"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput
                label="Current Approximate Balance"
                placeholder="0"
                prefix="₹ "
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={(val) => onChange(Number(val.replace(/[^0-9]/g, '')))}
                value={value ? String(value) : ''}
                error={errors.balance?.message}
              />
            )}
          />

          <AppButton
            title="Create Account Alias"
            onPress={handleSubmit(onSubmit)}
            loading={isSubmitting}
            size="lg"
            style={styles.saveBtn}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.screenPadding,
    paddingBottom: Spacing.xxl,
  },
  privacyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.primaryTint,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.base,
  },
  privacyText: {
    flex: 1,
    fontSize: FontSize.xs,
    color: Colors.primary,
    lineHeight: 16,
  },
  sectionLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.base,
  },
  typeCard: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    gap: Spacing.sm,
  },
  typeCardSelected: {
    borderColor: Colors.secondary,
    backgroundColor: '#F8FAFF',
  },
  typeLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
    color: Colors.textSecondary,
    flex: 1,
  },
  typeLabelSelected: {
    color: Colors.secondary,
    fontWeight: FontWeight.bold,
  },
  saveBtn: {
    marginTop: Spacing.md,
  },
});

