export type QuizQuestion = {
  id: number;
  text: string;
  options: [string, string, string, string];
  correctIndex: number;
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: 'Which lake is famous for its incredibly clear ice?',
    options: ['Lake Bled', 'Lake Louise', 'Lake Baikal', 'Lake Tekapo'],
    correctIndex: 2,
  },
  {
    id: 2,
    text: 'In which country is Hallstatt located?',
    options: ['Germany', 'Switzerland', 'Austria', 'France'],
    correctIndex: 2,
  },
  {
    id: 3,
    text: 'Where can you see the famous frozen methane bubbles?',
    options: ['Lake Inari', 'Lake Louise', 'Abraham Lake', 'Lake Bled'],
    correctIndex: 2,
  },
  {
    id: 4,
    text: 'What is the most common natural phenomenon in Tromsø?',
    options: ['Polar bears', 'Ice caves', 'Northern lights', 'Volcanic eruptions'],
    correctIndex: 2,
  },
  {
    id: 5,
    text: 'In which country is the village of Shirakawa-go located?',
    options: ['China', 'South Korea', 'Japan', 'Mongolia'],
    correctIndex: 2,
  },
  {
    id: 6,
    text: 'What are the Snow Monsters in Zao?',
    options: ['Ice caves', 'Icebergs', 'Trees covered in ice and snow', 'Stone statues'],
    correctIndex: 2,
  },
  {
    id: 7,
    text: 'Which town is near the Matterhorn?',
    options: ['Reine', 'Colmar', 'Zermatt', 'Rovaniemi'],
    correctIndex: 2,
  },
  {
    id: 8,
    text: 'In which country is Reine located?',
    options: ['Sweden', 'Finland', 'Norway', 'Iceland'],
    correctIndex: 2,
  },
  {
    id: 9,
    text: 'What is Diamond Beach famous for?',
    options: ['White sand', 'Hot springs', 'Ice shards on black sand', 'Big waves'],
    correctIndex: 2,
  },
  {
    id: 10,
    text: 'Which lake is in Lapland?',
    options: ['Lake Louise', 'Lake Tekapo', 'Lake Inari', 'Lake Bled'],
    correctIndex: 2,
  },
  {
    id: 11,
    text: 'In which country is the Icehotel located?',
    options: ['Norway', 'Sweden', 'Canada', 'Iceland'],
    correctIndex: 1,
  },
  {
    id: 12,
    text: 'Which place is a UNESCO World Heritage Site for its traditional houses?',
    options: ['Colmar', 'Shirakawa-go', 'Tromsø', 'Zermatt'],
    correctIndex: 1,
  },
  {
    id: 13,
    text: 'Where is the famous Church of the Good Shepherd located?',
    options: ['Hallstatt', 'Lake Bled', 'Lake Tekapo', 'Rovaniemi'],
    correctIndex: 2,
  },
  {
    id: 14,
    text: 'Which city is considered the capital of Finnish Lapland?',
    options: ['Zao', 'Colmar', 'Reine', 'Rovaniemi'],
    correctIndex: 3,
  },
  {
    id: 15,
    text: 'Where are the Mendenhall Ice Caves located?',
    options: ['Greenland', 'Iceland', 'Finland', 'Alaska'],
    correctIndex: 3,
  },
];
