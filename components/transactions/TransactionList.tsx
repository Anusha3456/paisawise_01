import React from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { Transaction } from '../../types/transaction.types';
import { TransactionItem } from './TransactionItem';
import { EmptyState } from '../common/EmptyState';
import { Colors } from '../../constants/colors';
import { Receipt } from 'lucide-react-native';

interface TransactionListProps {
  transactions: Transaction[];
  isRefreshing?: boolean;
  onRefresh?: () => void;
  onAddNew?: () => void;
  ListHeaderComponent?: React.ReactElement;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  isRefreshing = false,
  onRefresh,
  onAddNew,
  ListHeaderComponent,
}) => {
  return (
    <FlatList
      data={transactions}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <TransactionItem transaction={item} />}
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={transactions.length === 0 ? styles.emptyContainer : styles.listContainer}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={[Colors.primary]}
          />
        ) : undefined
      }
      ListEmptyComponent={
        <EmptyState
          icon={<Receipt size={32} color={Colors.textSecondary} />}
          title="No Transactions Found"
          description="Record your flexible spends or salary credits to keep your daily allowance accurate."
          actionTitle={onAddNew ? 'Record Expense' : undefined}
          onAction={onAddNew}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 40,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 40,
  },
});
