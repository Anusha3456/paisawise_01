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
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { salarySetupSchema, SalarySetupFormData } from '../../utils/validators';
import { salaryService } from '../../services/salary.service';
import { useAuth } from '../../hooks/useAuth';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { formatINR } from '../../utils/currency';
import { AppInput } from '../../components/common/AppInput';
import { AppButton } from '../../components/common/AppButton';
import { AppHeader } from '../../components/common/AppHeader';
import { Calendar, Sparkles } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PAYDAY_PRESETS = [1, 25, 28, 30];

export default function OnboardingSalarySetupScreen() {
  const router = useRouter();
  const { updateUser } = useAuth();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SalarySetupFormData>({
    resolver: zodResolver(salarySetupSchema),
    defaultValues: {
      monthlyTakeHome: 45000,
      payday: 1,
      plannedSavings: 3000,
    },
  });

  const selectedPayday = watch('payday');
  const salaryValue = watch('monthlyTakeHome') || 45000;
  const savingsValue = watch('plannedSavings') || 3000;

  const onSubmit = async (data: SalarySetupFormData) => {
    await salaryService.updateSalaryConfig({
      monthlySalary: data.monthlyTakeHome,
      payday: data.payday,
      plannedSavings: data.plannedSavings,
    });
    await updateUser({
      monthlySalary: data.monthlyTakeHome,
      payday: data.payday,
      plannedSavings: data.plannedSavings,
    });
    router.push('/(onboarding)/accounts-setup');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="Onboarding" showBack onBack={() => router.back()} />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          {/* Progress Indicator */}
          <View style={styles.stepContainer}>
            <Text style={styles.stepIndicator}>Step 2 of 4</Text>
            <View style={styles.stepTrack}>
              <View style={[styles.stepFill, { width: '50%' }]} />
            </View>
          </View>

          <View style={styles.header}>
            <Text style={styles.title}>Salary & Payday Setup</Text>
            <Text style={styles.subtitle}>
              This powers your daily safe allowance calculation between salary credits.
            </Text>
          </View>

          <View style={styles.card}>
            {/* Monthly Take-Home Salary */}
            <Controller
              control={control}
              name="monthlyTakeHome"
              render={({ field: { onChange, onBlur, value } }) => (
                <AppInput
                  label="Monthly Net Take-Home Salary"
                  placeholder="45000"
                  prefix="₹ "
                  keyboardType="numeric"
                  onBlur={onBlur}
                  onChangeText={(val) => onChange(Number(val.replace(/[^0-9]/g, '')))}
                  value={value ? String(value) : ''}
                  error={errors.monthlyTakeHome?.message}
                />
              )}
            />

            {/* Payday Selection */}
            <Text style={styles.sectionLabel}>Salary Payday (Day of Month)</Text>
            <View style={styles.presetRow}>
              {PAYDAY_PRESETS.map((day) => {
                const isActive = selectedPayday === day;
                return (
                  <TouchableOpacity
                    key={day}
                    activeOpacity={0.7}
                    onPress={() => setValue('payday', day)}
                    style={[styles.presetPill, isActive && styles.presetPillActive]}
                  >
                    <Calendar size={13} color={isActive ? Colors.textInverse : Colors.textSecondary} />
                    <Text style={[styles.presetText, isActive && styles.presetTextActive]}>
                      {day}{day === 1 ? 'st' : 'th'}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Planned Savings Goal */}
            <Controller
              control={control}
              name="plannedSavings"
              render={({ field: { onChange, onBlur, value } }) => (
                <AppInput
                  label="Planned Monthly Savings Reserve"
                  placeholder="3000"
                  prefix="₹ "
                  keyboardType="numeric"
                  onBlur={onBlur}
                  onChangeText={(val) => onChange(Number(val.replace(/[^0-9]/g, '')))}
                  value={value ? String(value) : ''}
                  error={errors.plannedSavings?.message}
                />
              )}
            />

            {/* Preview Banner */}
            <View style={styles.previewBox}>
              <Sparkles size={16} color={Colors.secondary} />
              <View style={styles.previewContent}>
                <Text style={styles.previewTitle}>Target Spending Pool</Text>
                <Text style={styles.previewDesc}>
                  With {formatINR(salaryValue)} salary and {formatINR(savingsValue)} saved, your flexible and commitment pool is {formatINR(salaryValue - savingsValue)}.
                </Text>
              </View>
            </View>
          </View>

          <AppButton
            title="Next: Account Aliases"
            onPress={handleSubmit(onSubmit)}
            loading={isSubmitting}
            size="lg"
            style={styles.nextBtn}
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
    marginBottom: Spacing.xl,
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
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.xl,
  },
  sectionLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  presetRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.base,
  },
  presetPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 4,
  },
  presetPillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  presetText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.textSecondary,
  },
  presetTextActive: {
    color: Colors.textInverse,
  },
  previewBox: {
    flexDirection: 'row',
    backgroundColor: Colors.secondaryTint,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    alignItems: 'flex-start',
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  previewContent: {
    flex: 1,
  },
  previewTitle: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
    marginBottom: 2,
  },
  previewDesc: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  nextBtn: {
    marginTop: 'auto',
    marginBottom: Spacing.base,
  },
});

