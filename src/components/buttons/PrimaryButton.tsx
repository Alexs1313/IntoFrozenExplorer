import React from 'react';
import {StyleSheet, Text, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AnimatedPressable} from '../animated/AnimatedPressable';
import {colors, fonts, layout, radius} from '../../constants/theme';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  fullWidth?: boolean;
  style?: ViewStyle;
};

export function PrimaryButton({
  label,
  onPress,
  fullWidth,
  style,
}: PrimaryButtonProps) {
  return (
    <AnimatedPressable
      onPress={onPress}
      scaleStyle={[fullWidth && styles.PrimaryButtonPorticoFull, style]}
      style={styles.PrimaryButtonPortico}>
      {({pressed}) => (
        <LinearGradient
          colors={[colors.btnGradientStart, colors.btnGradientEnd]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={[
            styles.PrimaryButtonLintel,
            pressed && styles.PrimaryButtonPressedDim,
          ]}>
          <Text style={styles.PrimaryButtonFiligree}>{label}</Text>
        </LinearGradient>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  PrimaryButtonPortico: {
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: radius.button,
    borderWidth: 0.5,
    height: layout.buttonHeight,
    overflow: 'hidden',
  },
  PrimaryButtonPorticoFull: {
    alignSelf: 'stretch',
  },
  PrimaryButtonLintel: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  PrimaryButtonPressedDim: {
    opacity: 0.85,
  },
  PrimaryButtonFiligree: {
    color: colors.btnText,
    fontFamily: fonts.sansMedium,
    fontSize: 20,
  },
});
