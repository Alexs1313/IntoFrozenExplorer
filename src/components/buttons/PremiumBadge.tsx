import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../constants/theme';

type PremiumBadgeProps = {
  onPress: () => void;
};

export function PremiumBadge({ onPress }: PremiumBadgeProps) {
  return (
    <Pressable onPress={onPress} hitSlop={8}>
      <Image
        source={require('../../assets/premiumicon.png')}
        style={styles.PremiumBadgeIconSigil}
        resizeMode="contain"
      />
    </Pressable>
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
