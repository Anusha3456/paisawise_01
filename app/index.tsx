import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../hooks/useAuth';
import { Colors } from '../constants/colors';
import { FontSize, FontWeight } from '../constants/typography';
import { ShieldCheck } from 'lucide-react-native';

export default function IndexScreen() {
  const router = useRouter();
  const { isAuthenticated, isOnboarded, isLoading } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        router.replace('/(auth)/login');
      } else if (!isOnboarded) {
        router.replace('/(onboarding)/profile');
      } else {
        router.replace('/(tabs)');
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [isAuthenticated, isOnboarded, router]);

  return (
    <View style={styles.container}>
      <View style={styles.brandRow}>
        <View style={styles.logoBadge}>
          <ShieldCheck size={36} color={Colors.textInverse} />
        </View>
        <Text style={styles.brandName}>PaisaWise</Text>
      </View>
      <Text style={styles.tagline}>AI Personal Financial Coach</Text>
      <ActivityIndicator size="small" color={Colors.secondary} style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  logoBadge: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    fontSize: FontSize.hero,
    fontWeight: FontWeight.heavy,
    color: Colors.textInverse,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: FontSize.base,
    color: '#94A3B8',
    fontWeight: FontWeight.medium,
  },
  loader: {
    marginTop: 32,
  },
});

