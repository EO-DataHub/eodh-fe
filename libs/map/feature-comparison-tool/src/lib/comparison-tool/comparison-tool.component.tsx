import { useComparisonMode } from '@ukri/map/data-access-map';
import { ComparisonToolButton } from '@ukri/map/ui-map';
import { useCallback, useState } from 'react';

import { TooltipComponent } from './tooltip-component/tooltip-component';

export const ComparisonTool = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { comparisonItems } = useComparisonMode();

  const handleOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <div className='relative'>
      <ComparisonToolButton selected={isOpen} onClick={handleOpen} itemsCount={comparisonItems.items.length} />
      {isOpen && <TooltipComponent />}
    </div>
  );
};
