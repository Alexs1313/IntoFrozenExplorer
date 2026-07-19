import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {LoaderScreen} from './src/screens/LoaderScreen';
import {OnboardingScreen} from './src/screens/OnboardingScreen';
import {PremiumScreen} from './src/screens/PremiumScreen';
import {PlacesScreen} from './src/screens/PlacesScreen';
import {MapScreen} from './src/screens/MapScreen';
import {PlaceDetailScreen} from './src/screens/PlaceDetailScreen';
import {FactsScreen} from './src/screens/FactsScreen';
import {BlogScreen} from './src/screens/BlogScreen';
import {ChallengeScreen} from './src/screens/ChallengeScreen';
import {SavedScreen} from './src/screens/SavedScreen';
import {CompassScreen} from './src/screens/CompassScreen';

type AppPhase = 'loader' | 'onboarding' | 'premium' | 'main';

function App() {
  const [phase, setPhase] = useState<AppPhase>('loader');
  const [activeTab, setActiveTab] = useState(0);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  const [savedPlaceIds, setSavedPlaceIds] = useState<Set<string>>(new Set());
  const [savedFactIds, setSavedFactIds] = useState<Set<number>>(new Set());

  const [completedChallenges, setCompletedChallenges] = useState(0);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    AsyncStorage.getMany(['completedChallenges', 'isPremium']).then(stored => {
      if (stored.completedChallenges) {
        setCompletedChallenges(Number(stored.completedChallenges));
      }
      if (stored.isPremium === 'true') {
        setIsPremium(true);
      }
    });
  }, []);

  const handleOpenPlace = (id: string) => setSelectedPlaceId(id);
  const handleClosePlace = () => setSelectedPlaceId(null);
  const handleOpenPremium = () => setPhase('premium');

  const handleChallengeComplete = () => {
    setCompletedChallenges(prev => {
      const next = prev + 1;
      AsyncStorage.setItem('completedChallenges', String(next));
      return next;
    });
  };

  const handlePremiumUnlocked = () => {
    setIsPremium(true);
    AsyncStorage.setItem('isPremium', 'true');
  };
  const handleTabPress = (index: number) => {
    setActiveTab(index);
    setSelectedPlaceId(null);
  };

  const toggleSavePlace = (id: string) => {
    setSavedPlaceIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSaveFact = (id: number) => {
    setSavedFactIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {phase === 'loader' && (
        <LoaderScreen onDone={() => setPhase('onboarding')} />
      )}

      {phase === 'onboarding' && (
        <OnboardingScreen onComplete={() => setPhase('main')} />
      )}

      {phase === 'premium' && (
        <PremiumScreen
          onBack={() => setPhase('main')}
          completedChallenges={completedChallenges}
          isPremium={isPremium}
          onPurchased={handlePremiumUnlocked}
        />
      )}

      {phase === 'main' && selectedPlaceId && (
        <PlaceDetailScreen
          placeId={selectedPlaceId}
          onBack={handleClosePlace}
          isSaved={savedPlaceIds.has(selectedPlaceId)}
          onToggleSave={() => toggleSavePlace(selectedPlaceId)}
          onOpenPremium={handleOpenPremium}
          activeTab={activeTab}
          onTabPress={handleTabPress}
        />
      )}

      {phase === 'main' && !selectedPlaceId && activeTab === 0 && (
        <PlacesScreen
          onOpenPlace={handleOpenPlace}
          onOpenPremium={handleOpenPremium}
          activeTab={activeTab}
          onTabPress={handleTabPress}
        />
      )}

      {phase === 'main' && !selectedPlaceId && activeTab === 1 && (
        <MapScreen
          onOpenPlace={handleOpenPlace}
          onOpenPremium={handleOpenPremium}
          activeTab={activeTab}
          onTabPress={handleTabPress}
        />
      )}

      {phase === 'main' && !selectedPlaceId && activeTab === 2 && (
        <FactsScreen
          savedIds={savedFactIds}
          onToggleSave={toggleSaveFact}
          onOpenPremium={handleOpenPremium}
          activeTab={activeTab}
          onTabPress={handleTabPress}
        />
      )}

      {phase === 'main' && !selectedPlaceId && activeTab === 3 && (
        <BlogScreen
          onOpenPremium={handleOpenPremium}
          activeTab={activeTab}
          onTabPress={handleTabPress}
        />
      )}

      {phase === 'main' && !selectedPlaceId && activeTab === 4 && (
        <ChallengeScreen
          activeTab={activeTab}
          onTabPress={handleTabPress}
          onChallengeComplete={handleChallengeComplete}
        />
      )}

      {phase === 'main' && !selectedPlaceId && activeTab === 6 && (
        <CompassScreen
          onOpenPlace={handleOpenPlace}
          onOpenPremium={handleOpenPremium}
          activeTab={activeTab}
          onTabPress={handleTabPress}
        />
      )}

      {phase === 'main' && !selectedPlaceId && activeTab === 5 && (
        <SavedScreen
          savedPlaceIds={savedPlaceIds}
          savedFactIds={savedFactIds}
          onToggleSavePlace={toggleSavePlace}
          onToggleSaveFact={toggleSaveFact}
          onOpenPlace={handleOpenPlace}
          onOpenPremium={handleOpenPremium}
          activeTab={activeTab}
          onTabPress={handleTabPress}
        />
      )}
    </SafeAreaProvider>
  );
}

export default App;
