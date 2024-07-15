import React from 'react';

import tokens from './tokens';

interface IFontTypeProps {
  className: string;
  typographyText?: string;
}

const FontType = ({ className, typographyText = 'Sample text' }: IFontTypeProps) => (
  <div className='flex flex-row'>
    <div className='basis-1/4'>text-{className}</div>
    <div className='basis-1/4'>
      {/* <table>
        <tr>
          <th>font-family:</th>
          <td>F37 Zagma;</td>
        </tr>
        <tr>
          <th>font-size (min):</th>
          <td className={`typography__data--${fontType}-font-size-min`}></td>
        </tr>
        <tr>
          <th>font-size: </th>
          <td className={`typography__data--${fontType}-font-size`}></td>
        </tr>
        <tr>
          <th>font-weight:</th>
          <td
            className={`typography__data--${fontType}-weight ${weight && `typography__data--${fontType}-weight-bold`}`}
          ></td>
        </tr>
        <tr>
          <th>line-height:</th>
          <td className={`typography__data--${fontType}-line-height`}></td>
        </tr>
        <tr>
          <th>letter-spacing:</th>
          <td className={`typography__data--${fontType}-letter-spacing`}></td>
        </tr>
      </table> */}
    </div>
    <div className='basis-1/2'>
      <p className={`text-${className}`}>{typographyText}</p>
    </div>
  </div>
);

const TypographyComponent = () => {
  return (
    <div>
      {Object.keys(tokens.fontSize).map((type) => (
        <div key={type} className=''>
          <FontType className={type} />
        </div>
      ))}
    </div>
  );
};

export default TypographyComponent;
