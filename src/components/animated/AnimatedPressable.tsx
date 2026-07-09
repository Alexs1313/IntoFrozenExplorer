import React from 'react';
import {Animated, Pressable, PressableProps, StyleProp, ViewStyle} from 'react-native';
import {usePressScale} from '../../hooks/usePressScale';

type AnimatedPressableProps = PressableProps & {
  scaleStyle?: StyleProp<ViewStyle>;
  activeScale?: number;
};

export function AnimatedPressable({
  style,
  scaleStyle,
  activeScale,
  onPressIn,
  onPressOut,
  children,
  ...rest
}: AnimatedPressableProps) {
  const {
    scale,
    onPressIn: handlePressIn,
    onPressOut: handlePressOut,
  } = usePressScale(activeScale);

  return (
    <Animated.View style={[scaleStyle, {transform: [{scale}]}]}>
      <Pressable
        style={style}
        onPressIn={event => {
          handlePressIn();
          onPressIn?.(event);
        }}
        onPressOut={event => {
          handlePressOut();
          onPressOut?.(event);
        }}
        {...rest}>
        {children}
      </Pressable>
    </Animated.View>
  );
}
