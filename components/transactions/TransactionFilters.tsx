import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Search, X } from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { CATEGORIES } from '../../constants/categories';

interface TransactionFiltersProps {
  selectedType: 'all' | 'expense' | 'income';
  onSelectType: (type: 'all' | 'expense' | 'income') => void;
  selectedCategoryId: string | null;
  onSelectCategory: (categoryId: string | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  selectedType,
  onSelectType,
  selectedCategoryId,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchBar}>
        <Search size={18} color={Colors.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by merchant, note..."
          placeholderTextColor={Colors.textMuted}
          value={searchQuery}
          onChangeText={onSearchChange}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => onSearchChange('')}>
            <X size={16} color={Colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Type Filter Tabs */}
      <View style={styles.typeTabs}>
        {(['all', 'expense', 'income'] as const).map((type) => {
          const isActive = selectedType === type;
          const label = type === 'all' ? 'All' : type === 'expense' ? 'Expenses' : 'Income';
          return (
            <TouchableOpacity
              key={type}
              activeOpacity={0.7}
              onPress={() => onSelectType(type)}
              style={[styles.typeTab, isActive && styles.typeTabActive]}
            >
              <Text style={[styles.typeTabText, isActive && styles.typeTabTextActive]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Category Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScroll}
      >
        <TouchableOpacity
          onPress={() => onSelectCategory(null)}
          style={[styles.catPill, selectedCategoryId === null && styles.catPillActive]}
        >
          <Text
            style={[styles.catPillText, selectedCategoryId === null && styles.catPillTextActive]}
          >
            All Categories
          </Text>
        </TouchableOpacity>

        {CATEGORIES.filter(c => selectedType === 'all' || c.type === selectedType).map((cat) => {
          const isActive = selectedCategoryId === cat.id;
          return (
            <TouchableOpacity
              key={cat.id}
              onPress={() => onSelectCategory(isActive ? null : cat.id)}
              style={[styles.catPill, isActive && styles.catPillActive]}
            >
              <Text style={[styles.catPillText, isActive && styles.catPillTextActive]}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    height: 42,
    marginHorizontal: Spacing.screenPadding,
    marginBottom: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: FontSize.sm,
    color: Colors.textPrimary,
  },
  typeTabs: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceSubtle,
    borderRadius: BorderRadius.md,
    padding: 3,
    marginHorizontal: Spacing.screenPadding,
    marginBottom: Spacing.sm,
  },
  typeTab: {
    flex: 1,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: BorderRadius.sm,
  },
  typeTabActive: {
    backgroundColor: Colors.surface,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  typeTabText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
    color: Colors.textSecondary,
  },
  typeTabTextActive: {
    color: Colors.primary,
    fontWeight: FontWeight.bold,
  },
  categoryScroll: {
    paddingHorizontal: Spacing.screenPadding,
    gap: Spacing.xs,
  },
  catPill: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  catPillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  catPillText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },
  catPillTextActive: {
    color: Colors.textInverse,
    fontWeight: FontWeight.bold,
  },
});

