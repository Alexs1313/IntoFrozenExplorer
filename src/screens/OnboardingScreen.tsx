import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { PaginationDots } from '../components/nav/PaginationDots';
import { ONBOARDING_STEPS } from '../data/onboarding';
import { useAdaptive } from '../hooks/useAdaptive';
import { colors, fonts } from '../constants/theme';

type OnboardingScreenProps = {
  onComplete: () => void;
};

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const adaptive = useAdaptive();
  const insets = useSafeAreaInsets();
  const [stepIndex, setStepIndex] = useState(0);

  const step = ONBOARDING_STEPS[stepIndex];
  const isLastStep = stepIndex === ONBOARDING_STEPS.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
      return;
    }
    setStepIndex(prev => prev + 1);
  };

  return (
    <View style={styles.OnboardingScreenFacetChassis}>
      <ImageBackground
        source={step.background}
        style={styles.OnboardingScreenBackground}
        resizeMode="cover"
      >
        <ScrollView
          contentContainerStyle={styles.OnboardingScreenScrollLintel}
          showsVerticalScrollIndicator={false}
        >
          <Pressable
            onPress={onComplete}
            style={[
              styles.OnboardingScreenTopSkip,
              { top: insets.top + adaptive.verticalScale(12) },
            ]}
            hitSlop={12}
          >
            <Text style={styles.OnboardingScreenTopSkipFiligree}>SKIP</Text>
          </Pressable>
          <View
            style={[
              styles.OnboardingScreenContent,
              { paddingBottom: insets.bottom + adaptive.verticalScale(28) },
            ]}
          >
            <View style={styles.OnboardingScreenHeroEnclave}>
              <Image
                source={step.overlay}
                style={styles.OnboardingScreenOverlaySigil}
                resizeMode="contain"
              />
            </View>

            <View style={styles.OnboardingScreenCardChassis}>
              <Text style={styles.OnboardingScreenTitleFiligree}>
                {step.title}
              </Text>
              <Text style={styles.OnboardingScreenDescFiligree}>
                {step.description}
              </Text>
            </View>

            <View style={styles.OnboardingScreenFooter}>
              <PaginationDots
                total={ONBOARDING_STEPS.length}
                activeIndex={stepIndex}
              />
              <PrimaryButton
                label={isLastStep ? step.buttonLabel : `${step.buttonLabel} ›`}
                onPress={handleNext}
                style={styles.OnboardingScreenPrimaryAction}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  OnboardingScreenScrollLintel: {
    flexGrow: 1,
  },
  OnboardingScreenFacetChassis: {
    backgroundColor: colors.background,
    flex: 1,
  },
  OnboardingScreenBackground: {
    flex: 1,
  },
  OnboardingScreenTopSkip: {
    position: 'absolute',
    right: 28,
    zIndex: 2,
  },
  OnboardingScreenTopSkipFiligree: {
    color: colors.skip,
    fontFamily: fonts.sansSemiBold,
    fontSize: 18,
    textDecorationLine: 'underline',
  },
  OnboardingScreenContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 72,
  },
  OnboardingScreenHeroEnclave: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  OnboardingScreenOverlaySigil: {
    maxHeight: 340,
    width: '100%',
  },
  OnboardingScreenCardChassis: {
    backgroundColor: colors.onboardCard,
    borderColor: colors.onboardCardBorder,
    borderRadius: 17,
    borderWidth: 1,
    marginBottom: 16,
    overflow: 'hidden',
    paddingHorizontal: 15,
    paddingVertical: 19,
  },

  OnboardingScreenTitleFiligree: {
    color: colors.onboardTitle,
    fontFamily: fonts.sansSemiBold,
    fontSize: 24,
    lineHeight: 31,
    marginBottom: 11,
  },

  OnboardingScreenDescFiligree: {
    color: colors.onboardDesc,
    fontFamily: fonts.sansRegular,
    fontSize: 16,
    lineHeight: 23,
  },

  OnboardingScreenFooter: {
    gap: 10,
    paddingTop: 8,
  },
  OnboardingScreenPrimaryAction: {
    alignSelf: 'center',
    width: 242,
  },
});
