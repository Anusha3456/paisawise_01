import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Rect, Line, Text as SvgText } from 'react-native-svg';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { formatCompactINR } from '../../utils/currency';

interface SpendingDataPoint {
  label: string; // e.g. "Week 1", "Week 2", "Week 3", "Week 4"
  amount: number;
  allowanceLimit: number;
}

interface MonthlySpendingChartProps {
  data?: SpendingDataPoint[];
  height?: number;
}

const DEFAULT_DATA: SpendingDataPoint[] = [
  { label: 'Wk 1', amount: 2100, allowanceLimit: 7000 },
  { label: 'Wk 2', amount: 3400, allowanceLimit: 7000 },
  { label: 'Wk 3', amount: 2500, allowanceLimit: 7000 },
  { label: 'Wk 4', amount: 0, allowanceLimit: 7000 },
];

export const MonthlySpendingChart: React.FC<MonthlySpendingChartProps> = ({
  data = DEFAULT_DATA,
  height = 160,
}) => {
  const chartWidth = 280;
  const chartHeight = height - 40;
  const maxAmount = 8000;
  const barWidth = 32;
  const barSpacing = (chartWidth - barWidth * data.length) / (data.length + 1);

  return (
    <View style={styles.container}>
      <Svg width={chartWidth} height={height}>
        {/* Horizontal grid lines */}
        {[2000, 4000, 6000, 8000].map((val) => {
          const y = chartHeight - (val / maxAmount) * chartHeight;
          return (
            <React.Fragment key={val}>
              <Line
                x1={0}
                y1={y}
                x2={chartWidth}
                y2={y}
                stroke={Colors.borderSubtle}
                strokeWidth={1}
                strokeDasharray="4 4"
              />
              <SvgText
                x={4}
                y={y - 4}
                fontSize={9}
                fill={Colors.textMuted}
              >
                {formatCompactINR(val)}
              </SvgText>
            </React.Fragment>
          );
        })}

        {/* Bars */}
        {data.map((item, index) => {
          const x = barSpacing + index * (barWidth + barSpacing);
          const barH = (item.amount / maxAmount) * chartHeight;
          const y = chartHeight - barH;

          return (
            <React.Fragment key={item.label}>
              <Rect
                x={x}
                y={y}
                width={barWidth}
                height={Math.max(barH, 4)}
                rx={6}
                fill={item.amount > item.allowanceLimit ? Colors.danger : Colors.primary}
              />
              <SvgText
                x={x + barWidth / 2}
                y={chartHeight + 18}
                fontSize={11}
                fontWeight="bold"
                fill={Colors.textSecondary}
                textAnchor="middle"
              >
                {item.label}
              </SvgText>
            </React.Fragment>
          );
        })}
      </Svg>

      <View style={styles.chartLegend}>
        <View style={styles.legendPair}>
          <View style={[styles.legendBox, { backgroundColor: Colors.primary }]} />
          <Text style={styles.legendText}>Under Weekly Target</Text>
        </View>
        <View style={styles.legendPair}>
          <View style={[styles.legendBox, { backgroundColor: Colors.danger }]} />
          <Text style={styles.legendText}>Over Target</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.lg,
    marginTop: Spacing.md,
  },
  legendPair: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendBox: {
    width: 10,
    height: 10,
    borderRadius: 2,
  },
  legendText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },
});

