export type TLangCoverItem = {
  timestamp: string;
  classification: {
    class_name: string;
    area: number;
    color_hint: string;
    percentage: number;
  }[];
};

export const data: TLangCoverItem[] = [
  {
    timestamp: '2014-01-01',
    classification: [
      {
        class_name: 'Forest',
        area: 79825110.88,
        color_hint: '#228B22',
        percentage: 7.98,
      },
      {
        class_name: 'Water',
        area: 512038389.41,
        color_hint: '#1E90FF',
        percentage: 51.2,
      },
      {
        class_name: 'Urban',
        area: 223985762.59,
        color_hint: '#FF4500',
        percentage: 22.4,
      },
      {
        class_name: 'Cropland',
        area: 155296603.67,
        color_hint: '#FFD700',
        percentage: 15.53,
      },
      {
        class_name: 'Grassland',
        area: 28854133.45,
        color_hint: '#32CD32',
        percentage: 2.89,
      },
    ],
  },
  {
    timestamp: '2015-01-01',
    classification: [
      {
        class_name: 'Forest',
        area: 38623631.0,
        color_hint: '#228B22',
        percentage: 3.86,
      },
      {
        class_name: 'Water',
        area: 13627600.54,
        color_hint: '#1E90FF',
        percentage: 1.36,
      },
      {
        class_name: 'Urban',
        area: 458035007.12,
        color_hint: '#FF4500',
        percentage: 45.8,
      },
      {
        class_name: 'Cropland',
        area: 209310531.29,
        color_hint: '#FFD700',
        percentage: 20.93,
      },
      {
        class_name: 'Grassland',
        area: 280403230.05,
        color_hint: '#32CD32',
        percentage: 28.04,
      },
    ],
  },
  {
    timestamp: '2016-01-01',
    classification: [
      {
        class_name: 'Forest',
        area: 3617174.75,
        color_hint: '#228B22',
        percentage: 0.36,
      },
      {
        class_name: 'Water',
        area: 609298137.18,
        color_hint: '#1E90FF',
        percentage: 60.93,
      },
      {
        class_name: 'Urban',
        area: 310675135.4,
        color_hint: '#FF4500',
        percentage: 31.07,
      },
      {
        class_name: 'Cropland',
        area: 41509787.26,
        color_hint: '#FFD700',
        percentage: 4.15,
      },
      {
        class_name: 'Grassland',
        area: 34899765.42,
        color_hint: '#32CD32',
        percentage: 3.49,
      },
    ],
  },
  // {
  //   timestamp: '2017-01-01',
  //   classification: [
  //     {
  //       class_name: 'Forest',
  //       area: 91305353.66,
  //       color_hint: '#228B22',
  //       percentage: 9.13,
  //     },
  //     {
  //       class_name: 'Water',
  //       area: 163472311.17,
  //       color_hint: '#1E90FF',
  //       percentage: 16.35,
  //     },
  //     {
  //       class_name: 'Urban',
  //       area: 335245628.03,
  //       color_hint: '#FF4500',
  //       percentage: 33.52,
  //     },
  //     {
  //       class_name: 'Cropland',
  //       area: 254855136.83,
  //       color_hint: '#FFD700',
  //       percentage: 25.49,
  //     },
  //     {
  //       class_name: 'Grassland',
  //       area: 155121570.31,
  //       color_hint: '#32CD32',
  //       percentage: 15.51,
  //     },
  //   ],
  // },
  {
    timestamp: '2018-01-01',
    classification: [
      {
        class_name: 'Forest',
        area: 377441265.91,
        color_hint: '#228B22',
        percentage: 37.74,
      },
      {
        class_name: 'Water',
        area: 59918064.12,
        color_hint: '#1E90FF',
        percentage: 5.99,
      },
      {
        class_name: 'Urban',
        area: 137802013.82,
        color_hint: '#FF4500',
        percentage: 13.78,
      },
      {
        class_name: 'Cropland',
        area: 181977125.04,
        color_hint: '#FFD700',
        percentage: 18.2,
      },
      {
        class_name: 'Grassland',
        area: 242861531.12,
        color_hint: '#32CD32',
        percentage: 24.29,
      },
    ],
  },
  {
    timestamp: '2019-01-01',
    classification: [
      {
        class_name: 'Forest',
        area: 448669598.84,
        color_hint: '#228B22',
        percentage: 44.87,
      },
      {
        class_name: 'Water',
        area: 64979823.08,
        color_hint: '#1E90FF',
        percentage: 6.5,
      },
      {
        class_name: 'Urban',
        area: 210641098.86,
        color_hint: '#FF4500',
        percentage: 21.06,
      },
      {
        class_name: 'Cropland',
        area: 261833444.55,
        color_hint: '#FFD700',
        percentage: 26.18,
      },
      {
        class_name: 'Grassland',
        area: 13876034.66,
        color_hint: '#32CD32',
        percentage: 1.39,
      },
    ],
  },
  {
    timestamp: '2020-01-01',
    classification: [
      {
        class_name: 'Forest',
        area: 124150301.72,
        color_hint: '#228B22',
        percentage: 12.42,
      },
      {
        class_name: 'Water',
        area: 24816076.55,
        color_hint: '#1E90FF',
        percentage: 2.48,
      },
      {
        class_name: 'Urban',
        area: 8928196.83,
        color_hint: '#FF4500',
        percentage: 0.89,
      },
      {
        class_name: 'Cropland',
        area: 394708866.92,
        color_hint: '#FFD700',
        percentage: 39.47,
      },
      {
        class_name: 'Grassland',
        area: 447396557.97,
        color_hint: '#32CD32',
        percentage: 44.74,
      },
    ],
  },
  {
    timestamp: '2021-01-01',
    classification: [
      {
        class_name: 'Forest',
        area: 429039031.39,
        color_hint: '#228B22',
        percentage: 42.9,
      },
      {
        class_name: 'Water',
        area: 94330141.79,
        color_hint: '#1E90FF',
        percentage: 9.43,
      },
      {
        class_name: 'Urban',
        area: 26686822.67,
        color_hint: '#FF4500',
        percentage: 2.67,
      },
      {
        class_name: 'Cropland',
        area: 299319506.43,
        color_hint: '#FFD700',
        percentage: 29.93,
      },
      {
        class_name: 'Grassland',
        area: 150624497.72,
        color_hint: '#32CD32',
        percentage: 15.06,
      },
    ],
  },
  {
    timestamp: '2022-01-01',
    classification: [
      {
        class_name: 'Forest',
        area: 36677335.61,
        color_hint: '#228B22',
        percentage: 3.67,
      },
      {
        class_name: 'Water',
        area: 192625899.15,
        color_hint: '#1E90FF',
        percentage: 19.26,
      },
      {
        class_name: 'Urban',
        area: 9861347.95,
        color_hint: '#FF4500',
        percentage: 0.99,
      },
      {
        class_name: 'Cropland',
        area: 676447212.42,
        color_hint: '#FFD700',
        percentage: 67.64,
      },
      {
        class_name: 'Grassland',
        area: 84388204.86,
        color_hint: '#32CD32',
        percentage: 8.44,
      },
    ],
  },
  {
    timestamp: '2023-01-01',
    classification: [
      {
        class_name: 'Forest',
        area: 340569698.98,
        color_hint: '#228B22',
        percentage: 34.06,
      },
      {
        class_name: 'Water',
        area: 117116656.17,
        color_hint: '#1E90FF',
        percentage: 11.71,
      },
      {
        class_name: 'Urban',
        area: 230163030.82,
        color_hint: '#FF4500',
        percentage: 23.02,
      },
      {
        class_name: 'Cropland',
        area: 248069424.41,
        color_hint: '#FFD700',
        percentage: 24.81,
      },
      {
        class_name: 'Grassland',
        area: 64081189.63,
        color_hint: '#32CD32',
        percentage: 6.41,
      },
    ],
  },
  {
    timestamp: '2024-01-01',
    classification: [
      {
        class_name: 'Forest',
        area: 318880166.16,
        color_hint: '#228B22',
        percentage: 31.89,
      },
      {
        class_name: 'Water',
        area: 136236395.46,
        color_hint: '#1E90FF',
        percentage: 13.62,
      },
      {
        class_name: 'Urban',
        area: 256094579.66,
        color_hint: '#FF4500',
        percentage: 25.61,
      },
      {
        class_name: 'Cropland',
        area: 205613014.37,
        color_hint: '#FFD700',
        percentage: 20.56,
      },
      {
        class_name: 'Grassland',
        area: 83175844.34,
        color_hint: '#32CD32',
        percentage: 8.32,
      },
    ],
  },
];

export const getData = () => {
  const result: {
    [key: string]: {
      colorHint: string;
      area: { y: number; x: string }[];
      percentage: { y: number; x: string }[];
      name: string;
    };
  } = {};

  data.forEach((item) => {
    item.classification.forEach((classification) => {
      const name = classification.class_name;
      if (!result[name]) {
        result[name] = {
          colorHint: classification.color_hint,
          name,
          area: [],
          percentage: [],
        };
      }

      result[name].area.push({ y: classification.area, x: item.timestamp });
      result[name].percentage.push({ y: classification.percentage, x: item.timestamp });
    });
  });

  return Object.values(result);
};
