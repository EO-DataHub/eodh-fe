import { extendTailwindMerge } from 'tailwind-merge';

const isNotShadowColor = (value: string) => !/^[a-z]+-\d+(\/\d+)?$/i.test(value);

const isNumberOrPx = (value: string) => /^\d+(px)?$/i.test(value);

export const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      shadow: [
        {
          shadow: [isNotShadowColor],
        },
      ],
      'font-size': [{ text: [isNumberOrPx] }],
    },
  },
});
