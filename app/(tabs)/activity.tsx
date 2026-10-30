import React, { useState, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTransactions } from '../../hooks/useTransactions';
import { Colors } from '../../constants/colors';
import { AppHeader } from '../../components/common/AppHeader';
import { TransactionList } from '../../components/transactions/TransactionList';
import { TransactionFilters } from '../../components/transactions/TransactionFilters';
import { LoadingView } from '../../components/common/LoadingView';
import { Plus } from 'lucide-react-native';

export default function ActivityScreen() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<'all' | 'expense' | 'income'>('all');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { transactions, isLoading, refetch, isRefetching } = useTransactions();

  // Client-side filtering for fast instant responsiveness
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      if (selectedType !== 'all' && tx.type !== selectedType) {
        return false;
      }
      if (selectedCategoryId && tx.categoryId !== selectedCategoryId) {
        return false;
      }
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = tx.title.toLowerCase().includes(q);
        const matchesNotes = tx.notes ? tx.notes.toLowerCase().includes(q) : false;
        if (!matchesTitle && !matchesNotes) return false;
      }
      return true;
    });
  }, [transactions, selectedType, selectedCategoryId, searchQuery]);

  if (isLoading && !isRefetching) {
    return <LoadingView message="Loading your transaction history..." />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
        title="Activity & Spends"
        subtitle={`${filteredTransactions.length} recorded entries`}
        rightAction={
          <TouchableOpacity
            style={styles.addBtn}
            activeOpacity={0.8}
            onPress={() => router.push('/transactions/add')}
          >
            <Plus size={18} color={Colors.surface} />
          </TouchableOpacity>
        }
      />

      <TransactionList
        transactions={filteredTransactions}
        isRefreshing={isRefetching}
        onRefresh={refetch}
        onAddNew={() => router.push('/transactions/add')}
        ListHeaderComponent={
          <TransactionFilters
            selectedType={selectedType}
            onSelectType={setSelectedType}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={setSelectedCategoryId}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

