import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSetupSchema, ProfileSetupFormData } from '../../utils/validators';
import { useAuth } from '../../hooks/useAuth';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/spacing';
import { FontSize, FontWeight } from '../../constants/typography';
import { AppInput } from '../../components/common/AppInput';
import { AppButton } from '../../components/common/AppButton';
import { User, Briefcase, MapPin } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OnboardingProfileScreen() {
  const router = useRouter();
  const { user, updateUser } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileSetupFormData>({
    resolver: zodResolver(profileSetupSchema),
    defaultValues: {
      fullName: user?.fullName || 'Rajesh Sharma',
      occupation: user?.occupation || 'Software Engineer',
      city: user?.city || 'Bengaluru',
    },
  });

  const onSubmit = async (data: ProfileSetupFormData) => {
    await updateUser(data);
    router.push('/(onboarding)/salary-setup');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          {/* Progress Indicator */}
          <View style={styles.stepContainer}>
            <Text style={styles.stepIndicator}>Step 1 of 4</Text>
            <View style={styles.stepTrack}>
              <View style={[styles.stepFill, { width: '25%' }]} />
            </View>
          </View>

          <View style={styles.header}>
            <Text style={styles.title}>Tell Us About Yourself</Text>
            <Text style={styles.subtitle}>
              Personalize your PaisaWise financial profile to get smart recommendations.
            </Text>
          </View>

          <View style={styles.card}>
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, onBlur, value } }) => (
                <AppInput
                  label="Your Name"
                  placeholder="e.g. Rajesh Sharma"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.fullName?.message}
                  suffix={<User size={18} color={Colors.textSecondary} />}
                />
              )}
            />

            <Controller
              control={control}
              name="occupation"
              render={({ field: { onChange, onBlur, value } }) => (
                <AppInput
                  label="Occupation / Designation"
                  placeholder="e.g. Software Engineer, Marketing Mgr"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.occupation?.message}
                  suffix={<Briefcase size={18} color={Colors.textSecondary} />}
                />
              )}
            />

            <Controller
              control={control}
              name="city"
              render={({ field: { onChange, onBlur, value } }) => (
                <AppInput
                  label="City of Residence"
                  placeholder="e.g. Bengaluru, Mumbai, Pune, Delhi"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.city?.message}
                  suffix={<MapPin size={18} color={Colors.textSecondary} />}
                />
              )}
            />
          </View>

          <AppButton
            title="Next: Salary Cycle"
            onPress={handleSubmit(onSubmit)}
            loading={isSubmitting}
            size="lg"
            style={styles.nextBtn}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.screenPadding,
    flexGrow: 1,
  },
  stepContainer: {
    marginBottom: Spacing.base,
  },
  stepIndicator: {
    fontSize: FontSize.xs,
    color: Colors.secondary,
    fontWeight: FontWeight.bold,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  stepTrack: {
    height: 4,
    backgroundColor: Colors.borderSubtle,
    borderRadius: 2,
    overflow: 'hidden',
  },
  stepFill: {
    height: '100%',
    backgroundColor: Colors.secondary,
    borderRadius: 2,
  },
  header: {
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.xl,
  },
  nextBtn: {
    marginTop: 'auto',
    marginBottom: Spacing.base,
  },
});

