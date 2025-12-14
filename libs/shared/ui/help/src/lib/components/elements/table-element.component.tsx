import { Text } from '@ukri/shared/design-system';
import { useTranslation } from 'react-i18next';

import { ITableElement } from '../../types/help-config.types';

interface ITableElementProps {
  readonly element: ITableElement;
}

const styles = {
  table: 'mt-2 mb-5',
  tableCell: 'border border-main p-1 w-full',
  colorCell: 'min-w-12 h-4',
};

export const TableElement = ({ element }: ITableElementProps) => {
  const { t } = useTranslation();

  return (
    <div>
      {element.title && <Text content={t(element.title)} fontSize='medium' fontWeight='semibold' className='mb-2' />}
      <table className={styles.table}>
        <tbody>
          {element.rows.map((row, index) => (
            <tr key={`${row.color}_${index}`}>
              <td className={styles.tableCell}>
                <Text content={row.label} fontSize='medium' fontWeight='regular' />
              </td>
              <td className={`${styles.tableCell} ${styles.colorCell}`} style={{ backgroundColor: row.color }} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
