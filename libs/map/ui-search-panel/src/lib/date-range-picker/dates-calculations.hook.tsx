import { useMemo } from 'react';

const useDateCalculations = () => {
  return useMemo(() => {
    const today = new Date();

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);
    const formattedOneMonthAgo = oneMonthAgo

    return { today, formattedOneMonthAgo };
  }, []);
};

export default useDateCalculations;
