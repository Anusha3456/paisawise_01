import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, ChevronRight } from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { formatINR } from '../../utils/currency';
import { formatShortDate } from '../../utils/date';
import { FinancialCommitment } from '../../types/commitment.types';
import { AppCard } from '../common/AppCard';
import { useRouter } from 'expo-router';

interface UpcomingCommitmentsProps {
  commitments: FinancialCommitment[];
}

export const UpcomingCommitments: React.FC<UpcomingCommitmentsProps> = ({ commitments }) => {
  const router = useRouter();

  return (
    <AppCard style={styles.card} variant="elevated">
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Calendar size={16} color={Colors.warning} />
          <Text style={styles.headerTitle}>Upcoming Fixed Commitments</Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push('/commitments')}
          style={styles.viewAllBtn}
        >
          <Text style={styles.viewAllText}>Manage</Text>
          <ChevronRight size={14} color={Colors.secondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.list}>
        {commitments.map((comm) => (
          <View key={comm.id} style={styles.commitmentRow}>
            <View style={styles.leftInfo}>
              <Text style={styles.commTitle} numberOfLines={1}>
                {comm.title}
              </Text>
              <Text style={styles.commDueDate}>
                Due on {formatShortDate(comm.nextDueDate)}
              </Text>
            </View>
            <View style={styles.rightInfo}>
              <Text style={styles.commAmount}>{formatINR(comm.amount)}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Auto-Allocated</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </AppCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.base,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
    paddingBottom: Spacing.xs,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewAllText: {
    fontSize: FontSize.xs,
    color: Colors.secondary,
    fontWeight: FontWeight.semibold,
  },
  list: {
    gap: Spacing.sm,
  },
  commitmentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
  },
  leftInfo: {
    flex: 1,
    paddingRight: Spacing.sm,
  },
  commTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  commDueDate: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  rightInfo: {
    alignItems: 'flex-end',
  },
  commAmount: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  badge: {
    backgroundColor: Colors.warningLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
  },
  badgeText: {
    fontSize: 9,
    color: Colors.warning,
    fontWeight: FontWeight.bold,
  },
});

