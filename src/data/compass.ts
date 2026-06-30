export type Mood = {
  id: string;
  emoji: string;
  title: string;
  description: string;
  placeId: string;
};

export const MOODS: Mood[] = [
  {
    id: 'silence',
    emoji: '🤍',
    title: 'Silence',
    description:
      'You are looking for peace, quiet and snowy landscapes without rushing. Most of all now you want to be alone with nature, enjoy the frosty air and feel the real winter atmosphere.',
    placeId: 'lake-inari',
  },
  {
    id: 'adventure',
    emoji: '🏔',
    title: 'Adventure',
    description:
      'You have an adventurous spirit. You want to discover new places, admire the majestic mountains, glaciers and unusual winter landscapes that leave vivid impressions.',
    placeId: 'lake-louise',
  },
  {
    id: 'northern-lights',
    emoji: '✨',
    title: 'Northern Lights',
    description:
      'You are attracted by the magic of the winter sky. Now is the time to go where you can see the northern lights, the starry sky and feel the atmosphere of a real Arctic fairy tale.',
    placeId: 'tromso-lights',
  },
  {
    id: 'cozy-escape',
    emoji: '☕',
    title: 'Cozy Escape',
    description:
      'You want warmth, comfort and a leisurely rest. Atmospheric winter towns, snowy streets, hot drinks and peaceful walks will make this mood special.',
    placeId: 'hallstatt',
  },
  {
    id: 'frozen-beauty',
    emoji: '❄',
    title: 'Frozen Beauty',
    description:
      'You want to see the most impressive winter landscapes. Transparent glacial lakes, ice caves, snow-capped peaks and unique natural wonders will be the perfect choice for new discoveries.',
    placeId: 'abraham-lake',
  },
];
