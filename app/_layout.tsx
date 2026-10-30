import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';

// Create a persistent QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Colors.background },
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="transactions/add" options={{ presentation: 'modal' }} />
          <Stack.Screen name="transactions/[id]" />
          <Stack.Screen name="accounts/index" />
          <Stack.Screen name="accounts/add" options={{ presentation: 'modal' }} />
          <Stack.Screen name="commitments/index" />
          <Stack.Screen name="commitments/add" options={{ presentation: 'modal' }} />
          <Stack.Screen name="savings/index" />
          <Stack.Screen name="savings/goals" />
          <Stack.Screen name="savings/recommendations" />
          <Stack.Screen name="salary-survival/index" />
          <Stack.Screen name="ai-coach/index" />
          <Stack.Screen name="settings/index" />
          <Stack.Screen name="settings/privacy" />
        </Stack>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
