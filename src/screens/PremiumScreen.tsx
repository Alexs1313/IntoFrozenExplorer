import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useIAP } from 'react-native-iap';

import { AnimatedPressable } from '../components/animated/AnimatedPressable';
import { FadeSlideIn } from '../components/animated/FadeSlideIn';
import { PremiumBadge } from '../components/buttons/PremiumBadge';
import { colors, fonts, spacing } from '../constants/theme';
import { PREMIUM_PRODUCT_ID } from '../services/iap';

type PremiumScreenProps = {
  onBack: () => void;
  isPremium: boolean;
  onPurchased: () => void;
};

const FEATURES = [
  {
    title: 'Exclusive Locations',
    subtitle: '+9 new winter locations to explore.',
  },
  {
    title: 'More Blog Articles',
    subtitle: '+12 additional articles with travel tips.',
  },
  {
    title: 'Complete Winter Access',
    subtitle: 'Unlock all Premium content with no limits.',
  },
];

export function PremiumScreen({
  onBack,
  isPremium,
  onPurchased,
}: PremiumScreenProps) {
  const insets = useSafeAreaInsets();
  const [isRestoring, setIsRestoring] = useState(false);

  const {
    connected,
    products,
    fetchProducts,
    requestPurchase,
    finishTransaction,
    restorePurchases,
    availablePurchases,
  } = useIAP({
    onPurchaseSuccess: async purchase => {
      if (purchase.productId !== PREMIUM_PRODUCT_ID) return;
      await finishTransaction({ purchase, isConsumable: false });
      onPurchased();
      Alert.alert(
        'Purchase Successful',
        'You now have permanent access to Winter Premium!',
      );
    },
    onPurchaseError: error => {
      Alert.alert('Purchase Failed', error.message);
    },
  });

  useEffect(() => {
    if (connected) {
      fetchProducts({ skus: [PREMIUM_PRODUCT_ID], type: 'in-app' });
    }
  }, [connected, fetchProducts]);

  useEffect(() => {
    const owned = availablePurchases.some(
      purchase => purchase.productId === PREMIUM_PRODUCT_ID,
    );
    if (owned && !isPremium) {
      onPurchased();
    }
    if (isRestoring) {
      setIsRestoring(false);
      if (owned) {
        Alert.alert('Restored', 'Your Premium purchase has been restored.');
      } else {
        Alert.alert(
          'Nothing to Restore',
          'No previous purchase was found for this Apple ID.',
        );
      }
    }
  }, [availablePurchases, isPremium, isRestoring, onPurchased]);

  const product = products.find(item => item.id === PREMIUM_PRODUCT_ID);
  const displayPrice = product?.displayPrice ?? '$1.99';

  const handleBuyPress = () => {
    if (isPremium) return;
    requestPurchase({
      request: { apple: { sku: PREMIUM_PRODUCT_ID } },
      type: 'in-app',
    });
  };

  const handleRestorePress = async () => {
    setIsRestoring(true);
    await restorePurchases();
  };

  return (
    <View style={styles.PremiumScreenFacetChassis}>
      <ImageBackground
        source={require('../assets/into-explorer-background.png')}
        style={styles.PremiumScreenBackground}
        resizeMode="cover"
      >
        <LinearGradient
          colors={[colors.topGradientStart, colors.topGradientEnd]}
          style={styles.PremiumScreenTopGradientVeil}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.PremiumScreenScrollLintel,
            { paddingBottom: insets.bottom + spacing.l },
          ]}
        >
          <View
            style={[
              styles.PremiumScreenHeaderLintel,
              { paddingTop: insets.top },
            ]}
          >
            <AnimatedPressable
              onPress={onBack}
              style={styles.PremiumScreenBackPortico}
              hitSlop={12}
            >
              <Image
                source={require('../assets/into-explorer-backarrow.png')}
                style={styles.PremiumScreenBackArrowSigil}
                resizeMode="contain"
              />
              <Text style={styles.PremiumScreenBackFiligree}>Back</Text>
            </AnimatedPressable>

            <PremiumBadge onPress={() => {}} />
          </View>

          <FadeSlideIn style={styles.PremiumScreenBodyLintel}>
            <Image
              source={require('../assets/premiumiconlarge.png')}
              style={styles.PremiumScreenHeroIconSigil}
              resizeMode="contain"
            />

            <Text style={styles.PremiumScreenTitleFiligree}>
              UNLOCK YOUR{'\n'}PREMIUM
            </Text>

            <LinearGradient
              colors={[colors.btnGradientStart, colors.btnGradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.PremiumScreenPriceCardChassis}
            >
              <View style={{ paddingTop: 20, paddingHorizontal: 20, flex: 1 }}>
                <Text style={styles.PremiumScreenPriceLabelFiligree}>
                  PREMIUM ACCESS
                </Text>
                <View style={styles.PremiumScreenPriceRowLintel}>
                  <Text style={styles.PremiumScreenPriceFiligree}>
                    {displayPrice}
                  </Text>
                </View>
              </View>
            </LinearGradient>

            <Text style={styles.PremiumScreenIncludedLabelFiligree}>
              WHAT'S INCLUDED
            </Text>

            <View style={styles.PremiumScreenFeaturesLintel}>
              {FEATURES.map((feature, index) => (
                <FadeSlideIn
                  key={feature.title}
                  delay={150 + index * 70}
                  style={styles.PremiumScreenFeatureCard}
                >
                  <View style={styles.PremiumScreenFeatureDotSigil} />
                  <View style={styles.PremiumScreenFeatureTextLintel}>
                    <Text style={styles.PremiumScreenFeatureTitleFiligree}>
                      {feature.title}
                    </Text>
                    <Text style={styles.PremiumScreenFeatureSubtitleFiligree}>
                      {feature.subtitle}
                    </Text>
                  </View>
                  <View style={styles.PremiumScreenFeatureCheckPortico}>
                    <Text style={styles.PremiumScreenFeatureCheckFiligree}>
                      ✓
                    </Text>
                  </View>
                </FadeSlideIn>
              ))}
            </View>

            <AnimatedPressable
              onPress={handleBuyPress}
              style={styles.PremiumScreenBuyPortico}
            >
              <LinearGradient
                colors={[colors.btnGradientStart, colors.btnGradientEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.PremiumScreenBuyLintel}
              >
                <Image
                  source={require('../assets/premicon.png')}
                  style={styles.PremiumScreenBuyIconSigil}
                  resizeMode="contain"
                />
                <Text style={styles.PremiumScreenBuyFiligree}>
                  {isPremium
                    ? 'Premium Unlocked ✓'
                    : `Buy Premium — ${displayPrice}`}
                </Text>
              </LinearGradient>
            </AnimatedPressable>

            <AnimatedPressable
              onPress={handleRestorePress}
              style={styles.PremiumScreenRestorePortico}
            >
              <Text style={styles.PremiumScreenRestoreFiligree}>
                Restore Purchases
              </Text>
            </AnimatedPressable>
          </FadeSlideIn>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  PremiumScreenFacetChassis: {
    backgroundColor: colors.background,
    flex: 1,
  },
  PremiumScreenBackground: {
    flex: 1,
  },
  PremiumScreenTopGradientVeil: {
    height: 205,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  PremiumScreenScrollLintel: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  PremiumScreenHeaderLintel: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingBottom: 8,
  },
  PremiumScreenBodyLintel: {
    alignItems: 'center',
    alignSelf: 'stretch',
  },

  PremiumScreenBackPortico: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  PremiumScreenBackArrowSigil: {
    height: 24,
    width: 24,
  },
  PremiumScreenBackFiligree: {
    color: colors.white,
    fontFamily: fonts.sansMedium,
    fontSize: 16,
  },
  PremiumScreenHeroLintel: {
    alignItems: 'center',
    borderColor: colors.white,
    borderRadius: 22,
    borderWidth: 2,
    height: 160,
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: colors.premiumGlow,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.7,
    shadowRadius: 24,
    width: 160,
  },

  PremiumScreenHeroIconSigil: {
    marginBottom: 20,
    marginTop: 10,
    width: 130,
    height: 130,
  },
  PremiumScreenTitleFiligree: {
    color: colors.white,
    fontFamily: fonts.sansBlack,
    fontSize: 32,
    letterSpacing: 0.5,
    lineHeight: 38,
    marginBottom: 20,
    textAlign: 'center',
  },
  PremiumScreenPriceCardChassis: {
    alignSelf: 'stretch',
    borderColor: colors.premiumCardBorder,
    borderRadius: 24,
    borderWidth: 1,
    minHeight: 120,
    marginBottom: 20,
    overflow: 'hidden',
  },
  PremiumScreenPriceLabelFiligree: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    marginBottom: 12,
  },

  PremiumScreenPriceRowLintel: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: 6,
  },
  PremiumScreenPriceFiligree: {
    color: colors.white,
    fontFamily: fonts.sansBlack,
    fontSize: 44,
    lineHeight: 56,
  },
  PremiumScreenPricePeriodFiligree: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: fonts.sansRegular,
    fontSize: 15,
    lineHeight: 22,
    bottom: 8,
  },

  PremiumScreenIncludedLabelFiligree: {
    alignSelf: 'flex-start',
    color: colors.white,
    fontFamily: fonts.sansBold,
    fontSize: 14,
    marginBottom: 12,
  },
  PremiumScreenFeaturesLintel: {
    alignSelf: 'stretch',
    gap: 12,
    marginBottom: 24,
  },
  PremiumScreenFeatureCard: {
    alignItems: 'center',
    backgroundColor: colors.premiumFeatureBg,
    borderBottomColor: 'rgba(255, 255, 255, 0.07)',
    borderBottomWidth: 1,
    borderRadius: 22,
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  PremiumScreenFeatureDotSigil: {
    backgroundColor: colors.premiumDot,
    borderRadius: 6,
    height: 12,
    width: 12,
  },
  PremiumScreenFeatureTextLintel: {
    flex: 1,
    gap: 4,
  },
  PremiumScreenFeatureTitleFiligree: {
    color: colors.white,
    fontFamily: fonts.sansSemiBold,
    fontSize: 14,
  },

  PremiumScreenFeatureSubtitleFiligree: {
    color: colors.premiumSubtitle,
    fontFamily: fonts.sansRegular,
    fontSize: 12,
  },
  PremiumScreenFeatureCheckPortico: {
    alignItems: 'center',
    borderColor: colors.white,
    borderRadius: 9,
    borderWidth: 1.5,
    height: 18,
    justifyContent: 'center',
    width: 18,
  },
  PremiumScreenFeatureCheckFiligree: {
    color: colors.white,
    fontSize: 11,
    fontFamily: fonts.sansBold,
  },
  PremiumScreenBuyPortico: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: colors.premiumBuyGlow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
  },
  PremiumScreenBuyLintel: {
    alignItems: 'center',
    borderColor: colors.premiumCardBorder,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    height: 58,
    justifyContent: 'center',
    width: '100%',
  },

  PremiumScreenBuyIconSigil: {
    height: 20,
    width: 20,
  },
  PremiumScreenBuyFiligree: {
    color: colors.white,
    fontFamily: fonts.sansBold,
    fontSize: 17,
  },
  PremiumScreenRestorePortico: {
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 8,
  },
  PremiumScreenRestoreFiligree: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: fonts.sansMedium,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
