import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnimatedPressable } from '../components/animated/AnimatedPressable';
import { FadeSlideIn } from '../components/animated/FadeSlideIn';
import { TabBar, TAB_BAR_TOTAL_HEIGHT } from '../components/nav/TabBar';
import { QUIZ_QUESTIONS } from '../data/quiz';

import { colors, fonts, radius, spacing } from '../constants/theme';

const LETTER = ['A', 'B', 'C', 'D'] as const;
const FORCED_WRONG_COUNT = 2;

const pickForcedWrongIndices = () => {
  const indices = Array.from({ length: QUIZ_QUESTIONS.length }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return new Set(indices.slice(0, FORCED_WRONG_COUNT));
};

type ChallengeScreenProps = {
  activeTab: number;
  onTabPress: (index: number) => void;
  onChallengeComplete?: () => void;
};

type Phase = 'quiz' | 'result';

export function ChallengeScreen({
  activeTab,
  onTabPress,
  onChallengeComplete,
}: ChallengeScreenProps) {
  const insets = useSafeAreaInsets();
  const [phase, setPhase] = useState<Phase>('quiz');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [forcedWrongIndices, setForcedWrongIndices] = useState<Set<number>>(
    pickForcedWrongIndices,
  );
  const [effectiveCorrectIndex, setEffectiveCorrectIndex] = useState<
    number | null
  >(null);

  const question = QUIZ_QUESTIONS[questionIndex];
  const isLast = questionIndex === QUIZ_QUESTIONS.length - 1;
  const isAnswered = selectedOption !== null;

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);

    if (forcedWrongIndices.has(questionIndex)) {
      const otherOptions = [0, 1, 2, 3].filter(i => i !== index);
      const fakeCorrect =
        otherOptions[Math.floor(Math.random() * otherOptions.length)];
      setEffectiveCorrectIndex(fakeCorrect);
      return;
    }

    setEffectiveCorrectIndex(question.correctIndex);
    if (index === question.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (isLast) {
      setPhase('result');
      onChallengeComplete?.();
    } else {
      setQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setEffectiveCorrectIndex(null);
    }
  };

  const handleRetry = () => {
    setPhase('quiz');
    setQuestionIndex(0);
    setSelectedOption(null);
    setEffectiveCorrectIndex(null);
    setScore(0);
    setForcedWrongIndices(pickForcedWrongIndices());
  };

  const getOptionStyle = (index: number) => {
    if (!isAnswered) return styles.ChallengeScreenOptionChassis;
    if (index === effectiveCorrectIndex)
      return styles.ChallengeScreenOptionCorrect;
    if (index === selectedOption) return styles.ChallengeScreenOptionWrong;
    return styles.ChallengeScreenOptionChassis;
  };

  if (phase === 'result') {
    const incorrect = QUIZ_QUESTIONS.length - score;
    return (
      <View style={styles.ChallengeScreenFacetChassis}>
        <ImageBackground
          source={require('../assets/into-explorer-background.png')}
          style={styles.ChallengeScreenBackground}
          resizeMode="cover"
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.ChallengeScreenResultContent,
              {
                paddingTop: insets.top + 16,
                paddingBottom: TAB_BAR_TOTAL_HEIGHT + insets.bottom + spacing.l,
              },
            ]}
          >
            <Text style={styles.ChallengeScreenTitleFiligree}>
              Snow Challenge
            </Text>

            <FadeSlideIn style={styles.ChallengeScreenResultScoreChassis}>
              <Text style={styles.ChallengeScreenResultEmojiSigil}>❄️</Text>
              <Text style={styles.ChallengeScreenResultScoreFiligree}>
                {score} / {QUIZ_QUESTIONS.length}
              </Text>
            </FadeSlideIn>

            <FadeSlideIn
              style={styles.ChallengeScreenResultCardChassis}
              delay={80}
            >
              <Text style={styles.ChallengeScreenResultTitleFiligree}>
                Challenge Complete!
              </Text>
              <Text style={styles.ChallengeScreenResultSubFiligree}>
                Keep learning about the amazing world of winter!
              </Text>
              <View style={styles.ChallengeScreenResultBoxesLintel}>
                <View style={styles.ChallengeScreenCorrectBoxChassis}>
                  <Text style={styles.ChallengeScreenCorrectNumberFiligree}>
                    {score}
                  </Text>
                  <Text style={styles.ChallengeScreenCorrectLabelFiligree}>
                    Correct
                  </Text>
                </View>
                <View style={styles.ChallengeScreenWrongBoxChassis}>
                  <Text style={styles.ChallengeScreenWrongNumberFiligree}>
                    {incorrect}
                  </Text>
                  <Text style={styles.ChallengeScreenWrongLabelFiligree}>
                    Incorrect
                  </Text>
                </View>
              </View>
            </FadeSlideIn>

            <AnimatedPressable
              onPress={handleRetry}
              style={styles.ChallengeScreenRetryPortico}
            >
              {({ pressed }) => (
                <LinearGradient
                  colors={[colors.btnGradientStart, colors.btnGradientEnd]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[
                    styles.ChallengeScreenResultTryLintel,
                    pressed && styles.ChallengeScreenBtnPressedDim,
                  ]}
                >
                  <Text style={styles.ChallengeScreenResultBtnFiligree}>
                    Try Again
                  </Text>
                </LinearGradient>
              )}
            </AnimatedPressable>

            <AnimatedPressable
              onPress={() =>
                Share.share({
                  message: `❄️ Snow Challenge: I scored ${score}/${QUIZ_QUESTIONS.length}! Try to beat my score!`,
                })
              }
              style={styles.ChallengeScreenResultSharePortico}
            >
              <LinearGradient
                colors={[colors.shareGradStart, colors.shareGradEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.ChallengeScreenResultShareLintel}
              >
                <Image
                  source={require('../assets/into-explorer-icon-share.png')}
                  style={styles.ChallengeScreenIconSigil}
                  resizeMode="contain"
                />
                <Text style={styles.ChallengeScreenResultShareFiligree}>
                  Share
                </Text>
              </LinearGradient>
            </AnimatedPressable>
          </ScrollView>

          <TabBar activeIndex={activeTab} onTabPress={onTabPress} />
        </ImageBackground>
      </View>
    );
  }

  return (
    <View style={styles.ChallengeScreenFacetChassis}>
      <ImageBackground
        source={require('../assets/into-explorer-background.png')}
        style={styles.ChallengeScreenBackground}
        resizeMode="cover"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.ChallengeScreenQuizContent,
            {
              paddingTop: insets.top + spacing.s,
              paddingBottom: TAB_BAR_TOTAL_HEIGHT + insets.bottom + spacing.l,
            },
          ]}
        >
          {/* Header row */}
          <View style={styles.ChallengeScreenHeaderLintel}>
            <Text style={styles.ChallengeScreenTitleFiligree}>
              Snow Challenge
            </Text>
            <View style={styles.ChallengeScreenCounterChassis}>
              <Text style={styles.ChallengeScreenCounterFiligree}>
                {questionIndex + 1} / {QUIZ_QUESTIONS.length}
              </Text>
            </View>
          </View>

          <FadeSlideIn key={questionIndex} style={styles.ChallengeScreenQuestionGroupLintel}>
            {/* Question card */}
            <View style={styles.ChallengeScreenQuestionChassis}>
              <LinearGradient
                colors={['rgba(109,206,255,0.88)', 'rgba(255,153,209,0.88)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.ChallengeScreenBadgeSigil}
              >
                <Text style={styles.ChallengeScreenBadgeFiligree}>
                  {questionIndex + 1}
                </Text>
              </LinearGradient>
              <Text style={styles.ChallengeScreenQuestionLabelFiligree}>
                Question
              </Text>
              <Text style={styles.ChallengeScreenQuestionTextFiligree}>
                {question.text}
              </Text>
            </View>

            {/* Answer options */}
            {question.options.map((option, index) => (
              <AnimatedPressable
                key={index}
                onPress={() => handleSelect(index)}
                style={getOptionStyle(index)}
              >
                <LinearGradient
                  colors={['rgba(109,206,255,0.88)', 'rgba(255,153,209,0.88)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.ChallengeScreenOptionBadgeSigil}
                >
                  <Text style={styles.ChallengeScreenBadgeFiligree}>
                    {LETTER[index]}
                  </Text>
                </LinearGradient>
                <Text style={styles.ChallengeScreenOptionTextFiligree}>
                  {option}
                </Text>
              </AnimatedPressable>
            ))}

            {/* Next / See Result button */}
            {isAnswered && (
              <AnimatedPressable onPress={handleNext}>
                {({ pressed }) => (
                  <LinearGradient
                    colors={[colors.btnGradientStart, colors.btnGradientEnd]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[
                      styles.ChallengeScreenNextLintel,
                      pressed && styles.ChallengeScreenBtnPressedDim,
                    ]}
                  >
                    <Text style={styles.ChallengeScreenNextFiligree}>
                      {isLast ? 'See Result' : 'Next Question'}
                    </Text>
                  </LinearGradient>
                )}
              </AnimatedPressable>
            )}
          </FadeSlideIn>
        </ScrollView>

        <TabBar activeIndex={activeTab} onTabPress={onTabPress} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  ChallengeScreenFacetChassis: {
    backgroundColor: colors.background,
    flex: 1,
  },
  ChallengeScreenBackground: {
    flex: 1,
  },
  ChallengeScreenQuizContent: {
    flexGrow: 1,
    gap: 15,
    paddingHorizontal: 16,
  },
  ChallengeScreenQuestionGroupLintel: {
    gap: 15,
  },
  ChallengeScreenHeaderLintel: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },

  ChallengeScreenTitleFiligree: {
    color: colors.white,
    fontFamily: fonts.sansBold,
    fontSize: 32,
  },

  ChallengeScreenCounterChassis: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderRadius: 9,
    borderWidth: 1,
    height: 32,
    justifyContent: 'center',
    overflow: 'hidden',
    paddingHorizontal: 10,
  },
  ChallengeScreenCounterFiligree: {
    color: colors.placeTitle,
    fontFamily: fonts.sansSemiBold,
    fontSize: 16,
  },

  ChallengeScreenQuestionChassis: {
    backgroundColor: 'rgba(161,224,255,0.76)',
    borderColor: colors.cardBorder,
    borderRadius: radius.card,
    borderWidth: 1,
    minHeight: 134,
    overflow: 'hidden',
    paddingBottom: 18,
    paddingLeft: 55,
    paddingRight: 15,
    paddingTop: 18,
  },
  ChallengeScreenBadgeSigil: {
    alignItems: 'center',
    borderColor: 'rgba(255,255,255,0.8)',
    borderRadius: 34,
    borderWidth: 1,
    height: 32,
    justifyContent: 'center',
    left: 15,
    overflow: 'hidden',
    position: 'absolute',
    top: 15,
    width: 32,
  },
  ChallengeScreenBadgeFiligree: {
    color: '#000000',
    fontFamily: fonts.sansSemiBold,
    fontSize: 16,
    textAlign: 'center',
  },
  ChallengeScreenQuestionLabelFiligree: {
    color: '#000000',
    fontFamily: fonts.sansSemiBold,
    fontSize: 16,
    marginBottom: 12,
  },
  ChallengeScreenQuestionTextFiligree: {
    color: '#000000',
    fontFamily: fonts.sansRegular,
    fontSize: 16,
    lineHeight: 23,
  },
  ChallengeScreenOptionChassis: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderRadius: radius.card,
    borderWidth: 1,
    flexDirection: 'row',
    height: 66,
    overflow: 'hidden',
    paddingHorizontal: 15,
  },

  ChallengeScreenOptionCorrect: {
    alignItems: 'center',
    backgroundColor: 'rgba(214,238,214,0.88)',
    borderColor: '#2d6a2d',
    borderRadius: radius.card,
    borderWidth: 1,
    flexDirection: 'row',
    height: 66,
    overflow: 'hidden',
    paddingHorizontal: 15,
  },
  ChallengeScreenOptionWrong: {
    alignItems: 'center',
    backgroundColor: 'rgba(238,206,206,0.88)',
    borderColor: '#9e0000',
    borderRadius: radius.card,
    borderWidth: 1,
    flexDirection: 'row',
    height: 66,
    overflow: 'hidden',
    paddingHorizontal: 15,
  },

  ChallengeScreenOptionBadgeSigil: {
    alignItems: 'center',
    borderColor: 'rgba(255,255,255,0.8)',
    borderRadius: 34,
    borderWidth: 1,
    height: 32,
    justifyContent: 'center',
    marginRight: 14,
    overflow: 'hidden',
    width: 32,
  },
  ChallengeScreenOptionTextFiligree: {
    color: '#000000',
    fontFamily: fonts.sansRegular,
    fontSize: 16,
    flex: 1,
  },
  ChallengeScreenNextLintel: {
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: radius.button,
    borderWidth: 0.5,
    height: 56,
    justifyContent: 'center',
    width: 242,
  },

  ChallengeScreenNextFiligree: {
    color: colors.white,
    fontFamily: fonts.sansMedium,
    fontSize: 20,
  },
  ChallengeScreenBtnPressedDim: {
    opacity: 0.85,
  },

  // Result screen
  ChallengeScreenResultContent: {
    alignItems: 'center',
    flexGrow: 1,
    gap: 20,
    paddingHorizontal: 16,
  },
  ChallengeScreenResultScoreChassis: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderRadius: radius.card,
    borderWidth: 1,
    paddingHorizontal: 28,
    paddingVertical: 18,
  },
  ChallengeScreenResultEmojiSigil: {
    fontSize: 40,
    marginBottom: 8,
  },
  ChallengeScreenResultScoreFiligree: {
    color: '#000000',
    fontFamily: fonts.sansBold,
    fontSize: 28,
  },
  ChallengeScreenResultCardChassis: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderRadius: radius.card,
    borderWidth: 1,
    overflow: 'hidden',
    padding: 20,
    width: '100%',
  },

  ChallengeScreenResultTitleFiligree: {
    color: '#000000',
    fontFamily: fonts.sansBold,
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  ChallengeScreenResultSubFiligree: {
    color: '#444444',
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  ChallengeScreenResultBoxesLintel: {
    flexDirection: 'row',
    gap: 12,
  },

  ChallengeScreenCorrectBoxChassis: {
    alignItems: 'center',
    backgroundColor: 'rgba(214,238,214,0.88)',
    borderColor: '#2d6a2d',
    borderRadius: radius.button,
    borderWidth: 1,
    flex: 1,
    paddingVertical: 14,
  },
  ChallengeScreenCorrectNumberFiligree: {
    color: '#2d6a2d',
    fontFamily: fonts.sansBold,
    fontSize: 28,
  },

  ChallengeScreenCorrectLabelFiligree: {
    color: '#2d6a2d',
    fontFamily: fonts.sansRegular,
    fontSize: 14,
  },
  ChallengeScreenWrongBoxChassis: {
    alignItems: 'center',
    backgroundColor: 'rgba(238,206,206,0.88)',
    borderColor: '#9e0000',
    borderRadius: radius.button,
    borderWidth: 1,
    flex: 1,
    paddingVertical: 14,
  },
  ChallengeScreenWrongNumberFiligree: {
    color: '#9e0000',
    fontFamily: fonts.sansBold,
    fontSize: 28,
  },

  ChallengeScreenWrongLabelFiligree: {
    color: '#9e0000',
    fontFamily: fonts.sansRegular,
    fontSize: 14,
  },
  ChallengeScreenRetryPortico: {
    width: '60%',
  },
  ChallengeScreenResultTryLintel: {
    alignItems: 'center',
    alignSelf: 'stretch',
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: radius.button,
    borderWidth: 0.5,
    height: 56,
    justifyContent: 'center',
  },
  ChallengeScreenResultBtnFiligree: {
    color: colors.white,
    fontFamily: fonts.sansMedium,
    fontSize: 20,
  },

  ChallengeScreenResultSharePortico: {
    borderRadius: radius.button,
    height: 47,
    overflow: 'hidden',
    width: 108,
  },
  ChallengeScreenResultShareLintel: {
    alignItems: 'center',
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: radius.button,
    borderWidth: 0.5,
    flex: 1,
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    width: '100%',
  },
  ChallengeScreenIconSigil: {
    height: 22,
    width: 22,
  },
  ChallengeScreenShareEmojiSigil: {
    fontSize: 18,
  },

  ChallengeScreenResultShareFiligree: {
    color: '#000000',
    fontFamily: fonts.sansMedium,
    fontSize: 16,
  },
});
