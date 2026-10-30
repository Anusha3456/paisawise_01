import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { G, Path, Circle } from 'react-native-svg';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { formatINR } from '../../utils/currency';
import { CategorySpendingSummary } from '../../types/dashboard.types';

interface ExpensePieChartProps {
  data: CategorySpendingSummary[];
  totalAmount: number;
  size?: number;
}

export const ExpensePieChart: React.FC<ExpensePieChartProps> = ({
  data,
  totalAmount,
  size = 200,
}) => {
  const radius = size / 2;
  const strokeWidth = 28;
  const innerRadius = radius - strokeWidth;
  const center = radius;

  // Compute SVG arc slices
  let cumulativeAngle = -Math.PI / 2; // Start from top (12 o'clock)

  const slices = data.map((item) => {
    const fraction = totalAmount > 0 ? item.amount / totalAmount : 0;
    const sliceAngle = fraction * 2 * Math.PI;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + sliceAngle;
    cumulativeAngle += sliceAngle;

    // SVG arc path calculation
    const x1 = center + innerRadius * Math.cos(startAngle);
    const y1 = center + innerRadius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(startAngle);
    const y2 = center + radius * Math.sin(startAngle);

    const x3 = center + radius * Math.cos(endAngle);
    const y3 = center + radius * Math.sin(endAngle);
    const x4 = center + innerRadius * Math.cos(endAngle);
    const y4 = center + innerRadius * Math.sin(endAngle);

    const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;

    const pathData = `
      M ${x1} ${y1}
      L ${x2} ${y2}
      A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x3} ${y3}
      L ${x4} ${y4}
      A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x1} ${y1}
      Z
    `;

    return {
      ...item,
      pathData,
      fraction,
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.chartWrapper}>
        <Svg width={size} height={size}>
          <G>
            {totalAmount === 0 ? (
              <Circle
                cx={center}
                cy={center}
                r={(radius + innerRadius) / 2}
                stroke={Colors.borderSubtle}
                strokeWidth={strokeWidth}
                fill="none"
              />
            ) : (
              slices.map((slice) => (
                <Path
                  key={slice.categoryId}
                  d={slice.pathData}
                  fill={slice.color}
                />
              ))
            )}
          </G>
        </Svg>

        {/* Center label */}
        <View style={[styles.centerHole, { width: innerRadius * 2, height: innerRadius * 2 }]}>
          <Text style={styles.centerSub}>Total Spent</Text>
          <Text style={styles.centerAmount}>{formatINR(totalAmount)}</Text>
        </View>
      </View>

      {/* Legend */}
      <View style={styles.legendContainer}>
        {data.map((item) => (
          <View key={item.categoryId} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: item.color }]} />
            <Text style={styles.legendLabel} numberOfLines={1}>
              {item.categoryName}
            </Text>
            <Text style={styles.legendPercent}>{item.percentage}%</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  chartWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  centerHole: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
  },
  centerSub: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },
  centerAmount: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  legendContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.sm,
    gap: Spacing.xs,
  },
  legendItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendLabel: {
    flex: 1,
    fontSize: FontSize.xs,
    color: Colors.textPrimary,
  },
  legendPercent: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
});

