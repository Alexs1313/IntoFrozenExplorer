import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../constants/theme';

type PaginationDotsProps = {
  total: number;
  activeIndex: number;
};

export function PaginationDots({total, activeIndex}: PaginationDotsProps) {
  return (
    <View style={styles.PaginationDotsChassis}>
      {Array.from({length: total}).map((_, i) => (
        <View
          key={i}
          style={[
            styles.PaginationDotSigil,
            i === activeIndex && styles.PaginationDotActiveSigil,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  PaginationDotsChassis: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
  },
  PaginationDotSigil: {
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    borderRadius: 4,
    height: 8,
    width: 8,
  },
  PaginationDotActiveSigil: {
    backgroundColor: colors.btnGradientStart,
    width: 24,
  },
});
