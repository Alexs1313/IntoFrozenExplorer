import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors, radius} from '../../constants/theme';

const TAB_ITEMS = [
  {icon: require('../../assets/into-frozen-explorer-tab-icon-places.png'), label: 'Places'},
  {icon: require('../../assets/into-frozen-explorer-tab-icon-map.png'), label: 'Map'},
  {icon: require('../../assets/into-frozen-explorer-tab-icon-challenges.png'), label: 'Challenges'},
  {icon: require('../../assets/into-frozen-explorer-tab-icon-blog.png'), label: 'Blog'},
  {icon: require('../../assets/into-frozen-explorer-tab-icon-quiz.png'), label: 'Quiz'},
  {icon: require('../../assets/into-frozen-explorer-tab-icon-saved.png'), label: 'Saved'},
  {icon: require('../../assets/into-frozen-explorer-tab-icon-compass.png'), label: 'Compass'},
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
        <Pressable
          key={tab.label}
          onPress={() => onTabPress(i)}
          style={styles.TabBarItemPortico}>
          <Image
            source={tab.icon}
            style={[
              styles.TabBarIconSigil,
              i !== activeIndex && styles.TabBarIconInactiveSigil,
            ]}
            resizeMode="contain"
          />
        </Pressable>
      ))}
    </View>
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
