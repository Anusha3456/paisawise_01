import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { transactionService } from '../../services/transaction.service';
import { useTransactions } from '../../hooks/useTransactions';
import { Transaction } from '../../types/transaction.types';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { formatINR } from '../../utils/currency';
import { formatDate } from '../../utils/date';
import { AppHeader } from '../../components/common/AppHeader';
import { AppCard } from '../../components/common/AppCard';
import { LoadingView } from '../../components/common/LoadingView';
import { CategoryIcon } from '../../components/transactions/CategoryIcon';
import { getCategoryById } from '../../constants/categories';
import { Trash2, Calendar, FileText, Building2, Tag } from 'lucide-react-native';

export default function TransactionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { deleteTransaction, isDeleting } = useTransactions();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      transactionService.getTransactionById(id).then((tx) => {
        setTransaction(tx);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return <LoadingView message="Loading transaction details..." />;
  }

  if (!transaction) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <AppHeader title="Transaction" showBack onBack={() => router.back()} />
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Transaction not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const category = getCategoryById(transaction.categoryId);
  const isIncome = transaction.type === 'income';

  const handleDelete = () => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to remove this record from your salary cycle?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteTransaction(transaction.id);
            router.back();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
        title="Transaction Details"
        showBack
        onBack={() => router.back()}
        rightAction={
          <TouchableOpacity
            onPress={handleDelete}
            disabled={isDeleting}
            style={styles.deleteHeaderBtn}
          >
            <Trash2 size={18} color={Colors.danger} />
          </TouchableOpacity>
        }
      />

      <View style={styles.container}>
        {/* Hero Amount Card */}
        <AppCard style={styles.heroCard} variant="elevated">
          <CategoryIcon categoryId={transaction.categoryId} size={56} iconSize={28} />
          <Text style={styles.merchantTitle}>{transaction.title}</Text>
          <Text
            style={[
              styles.amountText,
              { color: isIncome ? Colors.income : Colors.textPrimary },
            ]}
          >
            {isIncome ? '+' : '-'}{formatINR(transaction.amount)}
          </Text>
          <View style={[styles.typePill, { backgroundColor: isIncome ? Colors.successLight : Colors.primaryTint }]}>
            <Text style={[styles.typePillText, { color: isIncome ? Colors.income : Colors.primary }]}>
              {isIncome ? 'Salary / Inflow' : 'Flexible Spending'}
            </Text>
          </View>
        </AppCard>

        {/* Detailed Breakdown Card */}
        <AppCard style={styles.detailsCard} variant="elevated">
          <View style={styles.detailRow}>
            <View style={styles.rowLabelGroup}>
              <Tag size={16} color={Colors.textSecondary} />
              <Text style={styles.rowLabel}>Category</Text>
            </View>
            <Text style={styles.rowValue}>{category.name}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <View style={styles.rowLabelGroup}>
              <Calendar size={16} color={Colors.textSecondary} />
              <Text style={styles.rowLabel}>Date & Time</Text>
            </View>
            <Text style={styles.rowValue}>{formatDate(transaction.date)}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <View style={styles.rowLabelGroup}>
              <Building2 size={16} color={Colors.textSecondary} />
              <Text style={styles.rowLabel}>Account Alias</Text>
            </View>
            <Text style={styles.rowValue}>Manually Tracked Alias</Text>
          </View>

          {transaction.notes ? (
            <>
              <View style={styles.divider} />
              <View style={styles.detailRow}>
                <View style={styles.rowLabelGroup}>
                  <FileText size={16} color={Colors.textSecondary} />
                  <Text style={styles.rowLabel}>Notes</Text>
                </View>
                <Text style={styles.rowValue}>{transaction.notes}</Text>
              </View>
            </>
          ) : null}
        </AppCard>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    padding: Spacing.screenPadding,
  },
  deleteHeaderBtn: {
    padding: Spacing.xs,
  },
  heroCard: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    marginBottom: Spacing.base,
  },
  merchantTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  amountText: {
    fontSize: 32,
    fontWeight: FontWeight.heavy,
    marginBottom: Spacing.sm,
  },
  typePill: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  typePillText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
  },
  detailsCard: {
    padding: Spacing.base,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.xs,
  },
  rowLabelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rowLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },
  rowValue: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderSubtle,
    marginVertical: Spacing.xs,
  },
  notFoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundText: {
    fontSize: FontSize.base,
    color: Colors.textSecondary,
  },
});

