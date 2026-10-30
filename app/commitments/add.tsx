import React from 'react';
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
import { commitmentSchema, CommitmentFormData } from '../../utils/validators';
import { useCommitments } from '../../hooks/useCommitments';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { CATEGORIES } from '../../constants/categories';
import { MOCK_ACCOUNTS } from '../../mocks/accounts.mock';
import { AppHeader } from '../../components/common/AppHeader';
import { AppInput } from '../../components/common/AppInput';
import { AppButton } from '../../components/common/AppButton';
import { CategoryIcon } from '../../components/transactions/CategoryIcon';

export default function AddCommitmentScreen() {
  const router = useRouter();
  const { addCommitment, isAdding } = useCommitments();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CommitmentFormData>({
    resolver: zodResolver(commitmentSchema),
    defaultValues: {
      title: '',
      amount: undefined,
      categoryId: 'rent',
      dueDateDay: 1,
      frequency: 'monthly',
      accountId: 'acc-1',
      notes: '',
    },
  });

  const selectedCategoryId = watch('categoryId');
  const selectedFrequency = watch('frequency');

  const eligibleCategories = CATEGORIES.filter((c) => c.isCommitmentEligible);

  const onSubmit = async (data: CommitmentFormData) => {
    const nextDate = new Date();
    nextDate.setDate(data.dueDateDay);
    if (nextDate.getTime() < Date.now()) {
      nextDate.setMonth(nextDate.getMonth() + 1);
    }

    await addCommitment({
      title: data.title,
      amount: data.amount,
      categoryId: data.categoryId,
      dueDateDay: data.dueDateDay,
      nextDueDate: nextDate.toISOString(),
      frequency: data.frequency,
      accountId: data.accountId,
      autoRemind: true,
      notes: data.notes,
    });
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
        title="Add Fixed Commitment"
        subtitle="Reserve budget for EMIs & Bills"
        showBack
        onBack={() => router.back()}
      />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput
                label="Commitment Title"
                placeholder="e.g. 2BHK House Rent, Car EMI"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.title?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="amount"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput
                label="Monthly Due Amount"
                placeholder="0"
                prefix="₹ "
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={(val) => onChange(Number(val.replace(/[^0-9]/g, '')))}
                value={value ? String(value) : ''}
                error={errors.amount?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="dueDateDay"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput
                label="Due Day of the Month (1 - 31)"
                placeholder="1"
                keyboardType="numeric"
                maxLength={2}
                onBlur={onBlur}
                onChangeText={(val) => onChange(Number(val.replace(/[^0-9]/g, '')))}
                value={value ? String(value) : ''}
                error={errors.dueDateDay?.message}
              />
            )}
          />

          {/* Category Selection */}
          <Text style={styles.sectionLabel}>Category</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            {eligibleCategories.map((cat) => {
              const isSelected = selectedCategoryId === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  activeOpacity={0.7}
                  onPress={() => setValue('categoryId', cat.id)}
                  style={[styles.categoryCard, isSelected && styles.categoryCardSelected]}
                >
                  <CategoryIcon categoryId={cat.id} size={36} iconSize={18} />
                  <Text
                    style={[styles.categoryName, isSelected && styles.categoryNameSelected]}
                    numberOfLines={1}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Frequency Selection */}
          <Text style={styles.sectionLabel}>Frequency</Text>
          <View style={styles.freqRow}>
            {(['monthly', 'quarterly', 'yearly'] as const).map((freq) => {
              const isSelected = selectedFrequency === freq;
              return (
                <TouchableOpacity
                  key={freq}
                  activeOpacity={0.7}
                  onPress={() => setValue('frequency', freq)}
                  style={[styles.freqPill, isSelected && styles.freqPillActive]}
                >
                  <Text style={[styles.freqText, isSelected && styles.freqTextActive]}>
                    {freq.charAt(0).toUpperCase() + freq.slice(1)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <AppButton
            title="Add Commitment"
            onPress={handleSubmit(onSubmit)}
            loading={isAdding}
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
  sectionLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: Colors.textPrimary,
    marginTop: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  categoryScroll: {
    gap: Spacing.sm,
    paddingBottom: Spacing.base,
  },
  categoryCard: {
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    width: 86,
  },
  categoryCardSelected: {
    borderColor: Colors.secondary,
    backgroundColor: '#EFF6FF',
  },
  categoryName: {
    fontSize: 10,
    fontWeight: FontWeight.medium,
    color: Colors.textPrimary,
    marginTop: 4,
    textAlign: 'center',
  },
  categoryNameSelected: {
    color: Colors.secondary,
    fontWeight: FontWeight.bold,
  },
  freqRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.base,
  },
  freqPill: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  freqPillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  freqText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: Colors.textSecondary,
  },
  freqTextActive: {
    color: Colors.surface,
  },
  saveBtn: {
    marginTop: Spacing.md,
  },
});

