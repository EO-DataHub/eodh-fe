import React from 'react';

import tokens from './tokens';

interface IFontTypeProps {
  className: string;
}

const Color = ({ className }: IFontTypeProps) => {
  const nameOfClass = `bg-${className}`;
  return (
    <div className='flex flex-row'>
      <div className='basis-1/2'>
        eg.: bg-{className}, text-{className}{' '}
      </div>
      <div className='basis-1/2'>
        <div className={`${nameOfClass} w-4 h-4 border border-black`}></div>
      </div>
    </div>
  );
};

const Colors = () => {
  console.log('tokens.colors', tokens.colors);
  return (
    <div>
      {Object.keys(tokens.colors).map((type) => (
        <div key={type} className=''>
          <Color className={type} />
        </div>
      ))}
      <div className=''>
        <Color className='bg-primary w-4 h-4 border border-black' />
      </div>
    </div>
  );
};

export default Colors;
