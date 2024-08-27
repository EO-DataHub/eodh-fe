import { useMemo } from 'react';

const useDateCalculations = () => {
  return useMemo(() => {
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);
    const formattedOneMonthAgo = oneMonthAgo.toISOString().split('T')[0];

    return { formattedToday, formattedOneMonthAgo };
  }, []);
};

export default useDateCalculations;
