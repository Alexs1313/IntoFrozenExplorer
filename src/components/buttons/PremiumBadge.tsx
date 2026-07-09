import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { AnimatedPressable } from '../animated/AnimatedPressable';
import { colors } from '../../constants/theme';

type PremiumBadgeProps = {
  onPress: () => void;
};

export function PremiumBadge({ onPress }: PremiumBadgeProps) {
  return (
    <AnimatedPressable onPress={onPress} hitSlop={8} activeScale={0.88}>
      <Image
        source={require('../../assets/premiumicon.png')}
        style={styles.PremiumBadgeIconSigil}
        resizeMode="contain"
      />
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  PremiumBadgeLintel: {
    alignItems: 'center',
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    borderWidth: 0.5,
    height: 40,
    justifyContent: 'center',
    shadowColor: colors.premiumGlow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    width: 40,
  },
  PremiumBadgeIconSigil: {},
});
