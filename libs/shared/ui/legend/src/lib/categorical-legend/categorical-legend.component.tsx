import clsx from 'clsx';

import { ICategoricalLegendProps } from '../legend.types';
import { categoricalLegendStyles } from './categorical-legend.styles';

export const CategoricalLegend = ({ categories, maxHeight, className }: ICategoricalLegendProps) => {
  return (
    <div className={clsx(categoricalLegendStyles.container, className)}>
      <div className={categoricalLegendStyles.scrollContainer} style={maxHeight ? { maxHeight } : undefined}>
        <table className={categoricalLegendStyles.table}>
          <tbody>
            {categories.map((category, index) => (
              <tr key={`${category.color}-${index}`} className={categoricalLegendStyles.row}>
                <td className={categoricalLegendStyles.labelCell}>{category.label}</td>
                <td className={categoricalLegendStyles.colorCell}>
                  <div
                    className={categoricalLegendStyles.colorSwatch}
                    style={{ backgroundColor: category.color }}
                    title={category.color}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
