import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AnimatedPressable } from '../animated/AnimatedPressable';
import { colors, fonts } from '../../constants/theme';

type LockedOverlayProps = {
  onPress: () => void;
};

export function LockedOverlay({ onPress }: LockedOverlayProps) {
  return (
    <AnimatedPressable
      onPress={onPress}
      scaleStyle={StyleSheet.absoluteFill}
      style={styles.LockedOverlayFill}
      activeScale={0.97}
    >
      <View style={[StyleSheet.absoluteFill, styles.LockedOverlayTintSigil]} />

      <LinearGradient
        colors={[colors.btnGradientStart, colors.btnGradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.LockedOverlayBadgeLintel}
      >
        <Image
          source={require('../../assets/fluent_lock-closed-16-filled.png')}
          style={styles.LockedOverlayLockIconSigil}
          resizeMode="contain"
        />
      </LinearGradient>

      <LinearGradient
        colors={[colors.btnGradientStart, colors.btnGradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.LockedOverlayPillLintel}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            paddingHorizontal: 11,
          }}
        >
          <Image
            source={require('../../assets/premicon.png')}
            style={styles.LockedOverlayPillIconSigil}
            resizeMode="contain"
          />
          <Text style={styles.LockedOverlayPillFiligree}>PREMIUM</Text>
        </View>
      </LinearGradient>

      <Text style={styles.LockedOverlayAvailableFiligree}>
        Available with Premium
      </Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  LockedOverlayFill: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  LockedOverlayTintSigil: {
    backgroundColor: colors.lockedOverlayTint,
  },
  LockedOverlayBadgeLintel: {
    alignItems: 'center',
    borderColor: colors.white,
    borderRadius: 18,
    borderWidth: 1.1,
    height: 84,
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: colors.premiumGlow,
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.7,
    shadowRadius: 22,
    width: 84,
  },
  LockedOverlayLockIconSigil: {
    height: 50,
    width: 50,
  },
  LockedOverlayPillLintel: {
    alignItems: 'center',
    borderColor: colors.white,
    borderRadius: 100,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 6,
    height: 25,
    marginBottom: 6,
  },
  LockedOverlayPillIconSigil: {
    height: 11,
    width: 11,
  },
  LockedOverlayPillFiligree: {
    color: colors.white,
    fontFamily: fonts.sansBold,
    fontSize: 11,
  },
  LockedOverlayAvailableFiligree: {
    color: colors.lockedAvailableText,
    fontFamily: fonts.sansSemiBold,
    fontSize: 12,
  },
});
