import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AnimatedPressable} from '../animated/AnimatedPressable';
import {colors, radius} from '../../constants/theme';

const TAB_ITEMS = [
  {icon: require('../../assets/into-explorer-tab-icon-places.png'), label: 'Places'},
  {icon: require('../../assets/into-explorer-tab-icon-map.png'), label: 'Map'},
  {icon: require('../../assets/into-explorer-tab-icon-challenges.png'), label: 'Challenges'},
  {icon: require('../../assets/into-explorer-tab-icon-blog.png'), label: 'Blog'},
  {icon: require('../../assets/into-explorer-tab-icon-quiz.png'), label: 'Quiz'},
  {icon: require('../../assets/into-explorer-tab-icon-saved.png'), label: 'Saved'},
  {icon: require('../../assets/into-explorer-tab-icon-compass.png'), label: 'Compass'},
];

type TabBarProps = {
  activeIndex: number;
  onTabPress: (index: number) => void;
};

export function TabBar({activeIndex, onTabPress}: TabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.TabBarChassis, {bottom: insets.bottom + 17}]}>
      {TAB_ITEMS.map((tab, i) => (
        <TabBarItem
          key={tab.label}
          icon={tab.icon}
          isActive={i === activeIndex}
          onPress={() => onTabPress(i)}
        />
      ))}
    </View>
  );
}

type TabBarItemProps = {
  icon: number;
  isActive: boolean;
  onPress: () => void;
};

function TabBarItem({icon, isActive, onPress}: TabBarItemProps) {
  const activeScale = useRef(new Animated.Value(isActive ? 1 : 0.88)).current;

  useEffect(() => {
    Animated.spring(activeScale, {
      toValue: isActive ? 1 : 0.88,
      useNativeDriver: true,
      speed: 40,
      bounciness: 8,
    }).start();
  }, [isActive, activeScale]);

  return (
    <AnimatedPressable
      onPress={onPress}
      scaleStyle={styles.TabBarItemPortico}
      style={styles.TabBarItemPressable}
      activeScale={0.85}>
      <Animated.Image
        source={icon}
        style={[
          styles.TabBarIconSigil,
          !isActive && styles.TabBarIconInactiveSigil,
          {transform: [{scale: activeScale}]},
        ]}
        resizeMode="contain"
      />
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  TabBarChassis: {
    alignSelf: 'center',
    backgroundColor: colors.tabBarBg,
    borderRadius: radius.tabBar,
    flexDirection: 'row',
    height: 75,
    position: 'absolute',
    width: '90%',
  },
  TabBarItemPortico: {
    flex: 1,
  },
  TabBarItemPressable: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  TabBarIconSigil: {
    height: 24,
    width: 24,
  },
  TabBarIconInactiveSigil: {
    opacity: 0.45,
  },
});

export const TAB_BAR_TOTAL_HEIGHT = 75 + 17;
