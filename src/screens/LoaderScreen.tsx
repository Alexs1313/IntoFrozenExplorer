import React, { useEffect, useRef } from 'react';
import { Animated, Easing, ImageBackground, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../constants/theme';

type Props = {
  onDone: () => void;
};

export function LoaderScreen({ onDone }: Props) {
  const progressValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    Animated.timing(progressValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.06,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    const timer = setTimeout(onDone, 3000);
    return () => clearTimeout(timer);
  }, [onDone, progressValue, scaleValue]);

  const progressWidth = progressValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <ImageBackground
      source={require('../assets/into-frozen-explorer-onboard-bg.png')}
      style={styles.LoaderScreenChassis}
      resizeMode="cover"
    >
      <Animated.Image
        source={require('../assets/into-frozen-explorer-icon.png')}
        style={[
          styles.LoaderScreenIconSigil,
          { transform: [{ scale: scaleValue }] },
        ]}
        resizeMode="cover"
      />

      <Animated.View
        style={[
          styles.LoaderScreenProgressTrackChassis,
          { bottom: insets.bottom + 44 },
        ]}
      >
        <Animated.View
          style={[styles.LoaderScreenProgressLintel, { width: progressWidth }]}
        />
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  LoaderScreenChassis: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  LoaderScreenIconSigil: {
    borderRadius: 36,
    height: 180,
    marginBottom: 24,
    overflow: 'hidden',
    width: 180,
  },

  LoaderScreenTitleFiligree: {
    color: colors.white,
    fontFamily: fonts.sansBold,
    fontSize: 22,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  LoaderScreenProgressTrackChassis: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 2,
    height: 3,
    overflow: 'hidden',
    position: 'absolute',
    width: 200,
  },

  LoaderScreenProgressLintel: {
    backgroundColor: colors.white,
    height: '100%',
  },
});
