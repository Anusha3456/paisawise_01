import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { transactionSchema, TransactionFormData } from '../../utils/validators';
import { useTransactions } from '../../hooks/useTransactions';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { CATEGORIES } from '../../constants/categories';
import { MOCK_ACCOUNTS } from '../../mocks/accounts.mock';
import { AppHeader } from '../../components/common/AppHeader';
import { AppInput } from '../../components/common/AppInput';
import { AppButton } from '../../components/common/AppButton';
import { CategoryIcon } from '../../components/transactions/CategoryIcon';

export default function AddTransactionScreen() {
  const router = useRouter();
  const { createTransaction, isCreating } = useTransactions();
  const [selectedType, setSelectedType] = useState<'expense' | 'income'>('expense');

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      title: '',
      amount: undefined,
      type: 'expense',
      categoryId: 'food',
      accountId: 'acc-1',
      date: new Date().toISOString(),
      notes: '',
    },
  });

  const selectedCategoryId = watch('categoryId');
  const selectedAccountId = watch('accountId');

  const handleTypeChange = (type: 'expense' | 'income') => {
    setSelectedType(type);
    setValue('type', type);
    setValue('categoryId', type === 'income' ? 'salary' : 'food');
  };

  const onSubmit = async (data: TransactionFormData) => {
    try {
      await createTransaction({
        title: data.title,
        amount: data.amount,
        type: data.type,
        categoryId: data.categoryId,
        accountId: data.accountId,
        date: data.date,
        notes: data.notes,
      });
      router.back();
    } catch {
      Alert.alert('Error', 'Failed to save transaction');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
        title="Record Transaction"
        subtitle="Keep your daily allowance accurate"
        showBack
        onBack={() => router.back()}
      />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          {/* Income vs Expense Toggle */}
          <View style={styles.typeSelector}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleTypeChange('expense')}
              style={[
                styles.typeBtn,
                selectedType === 'expense' && { backgroundColor: Colors.expense },
              ]}
            >
              <Text
                style={[
                  styles.typeBtnText,
                  selectedType === 'expense' && styles.typeBtnTextActive,
                ]}
              >
                Expense (Outflow)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleTypeChange('income')}
              style={[
                styles.typeBtn,
                selectedType === 'income' && { backgroundColor: Colors.income },
              ]}
            >
              <Text
                style={[
                  styles.typeBtnText,
                  selectedType === 'income' && styles.typeBtnTextActive,
                ]}
              >
                Income (Inflow)
              </Text>
            </TouchableOpacity>
          </View>

          {/* Amount Input */}
          <Controller
            control={control}
            name="amount"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput
                label="Amount"
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

          {/* Title Input */}
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput
                label="Description / Merchant"
                placeholder="e.g. Swiggy Lunch, Metro Recharge"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.title?.message}
              />
            )}
          />

          {/* Category Selector */}
          <Text style={styles.sectionLabel}>Select Category</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            {CATEGORIES.filter((c) => c.type === selectedType).map((cat) => {
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
                    style={[
                      styles.categoryName,
                      isSelected && styles.categoryNameSelected,
                    ]}
                    numberOfLines={1}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Account Alias Selector */}
          <Text style={styles.sectionLabel}>Deducted / Credited Account</Text>
          <View style={styles.accountList}>
            {MOCK_ACCOUNTS.map((acc) => {
              const isSelected = selectedAccountId === acc.id;
              return (
                <TouchableOpacity
                  key={acc.id}
                  activeOpacity={0.7}
                  onPress={() => setValue('accountId', acc.id)}
                  style={[styles.accountItem, isSelected && styles.accountItemActive]}
                >
                  <View style={styles.accountRadio}>
                    {isSelected && <View style={styles.accountRadioInner} />}
                  </View>
                  <View style={styles.accountTextCol}>
                    <Text style={styles.accountName}>{acc.name}</Text>
                    <Text style={styles.accountSub}>{acc.bankName} • Manually Tracked</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Notes Input */}
          <Controller
            control={control}
            name="notes"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput
                label="Optional Notes"
                placeholder="Add details, tags, or reminder"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <AppButton
            title="Save Transaction"
            onPress={handleSubmit(onSubmit)}
            loading={isCreating}
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
  typeSelector: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceSubtle,
    borderRadius: BorderRadius.lg,
    padding: 4,
    marginBottom: Spacing.base,
  },
  typeBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: BorderRadius.md,
  },
  typeBtnText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: Colors.textSecondary,
  },
  typeBtnTextActive: {
    color: Colors.surface,
    fontWeight: FontWeight.bold,
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
    width: 84,
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
  accountList: {
    gap: Spacing.xs,
    marginBottom: Spacing.base,
  },
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1.2,
    borderColor: Colors.border,
  },
  accountItemActive: {
    borderColor: Colors.secondary,
    backgroundColor: '#F8FAFF',
  },
  accountRadio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  accountRadioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.secondary,
  },
  accountTextCol: {
    flex: 1,
  },
  accountName: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  accountSub: {
    fontSize: 10,
    color: Colors.textSecondary,
  },
  saveBtn: {
    marginTop: Spacing.md,
  },
});

