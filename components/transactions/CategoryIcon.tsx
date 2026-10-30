import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Home,
  CreditCard,
  ShoppingCart,
  Utensils,
  Zap,
  Car,
  ShoppingBag,
  Tv,
  HeartPulse,
  Repeat,
  PiggyBank,
  MoreHorizontal,
  Briefcase,
  Award,
  TrendingUp,
  HelpCircle,
} from 'lucide-react-native';
import { getCategoryById } from '../../constants/categories';
import { BorderRadius } from '../../constants/spacing';

interface CategoryIconProps {
  categoryId: string;
  size?: number;
  iconSize?: number;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  categoryId,
  size = 40,
  iconSize = 20,
}) => {
  const category = getCategoryById(categoryId);

  const renderIcon = () => {
    const iconColor = category.color;
    switch (category.icon) {
      case 'Home':
        return <Home size={iconSize} color={iconColor} />;
      case 'CreditCard':
        return <CreditCard size={iconSize} color={iconColor} />;
      case 'ShoppingCart':
        return <ShoppingCart size={iconSize} color={iconColor} />;
      case 'Utensils':
        return <Utensils size={iconSize} color={iconColor} />;
      case 'Zap':
        return <Zap size={iconSize} color={iconColor} />;
      case 'Car':
        return <Car size={iconSize} color={iconColor} />;
      case 'ShoppingBag':
        return <ShoppingBag size={iconSize} color={iconColor} />;
      case 'Tv':
        return <Tv size={iconSize} color={iconColor} />;
      case 'HeartPulse':
        return <HeartPulse size={iconSize} color={iconColor} />;
      case 'Repeat':
        return <Repeat size={iconSize} color={iconColor} />;
      case 'PiggyBank':
        return <PiggyBank size={iconSize} color={iconColor} />;
      case 'Briefcase':
        return <Briefcase size={iconSize} color={iconColor} />;
      case 'Award':
        return <Award size={iconSize} color={iconColor} />;
      case 'TrendingUp':
        return <TrendingUp size={iconSize} color={iconColor} />;
      case 'MoreHorizontal':
      default:
        return <MoreHorizontal size={iconSize} color={iconColor} />;
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: BorderRadius.md,
          backgroundColor: category.bgColor,
        },
      ]}
    >
      {renderIcon()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

