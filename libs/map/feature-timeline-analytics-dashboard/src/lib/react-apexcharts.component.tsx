import ApexCharts, { ApexOptions } from 'apexcharts';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';

function omit(obj: object, keysToRemove: string[]) {
  const newObj = { ...obj };
  keysToRemove.forEach((key) => {
    delete newObj[key];
  });
  return newObj;
}

function deepEqual(obj1: object | undefined | null, obj2: object | undefined | null, visited = new WeakSet()) {
  if (obj1 === obj2) {
    return true;
  }

  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
    return false;
  }

  if (visited.has(obj1) || visited.has(obj2)) {
    return true;
  } // Handle circular refs
  visited.add(obj1);
  visited.add(obj2);

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key], visited)) {
      return false;
    }
  }

  return true;
}

const isObject = (item: object) => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

const extend = (target, source) => {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = extend(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
};

export default function Charts({ id, type = 'line', width = '100%', height = 'auto', series, options, ...restProps }) {
  const [currentChartId, setCurrentChartId] = useState(id);
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chart = useRef<ApexCharts | null>(null);
  const prevOptions = useRef<ApexOptions>(options);

  // console.log('charts', id, currentChartId, id === currentChartId);

  const getConfig = useCallback(() => {
    const newOptions = {
      chart: { type, height, width },
      series,
    };

    return extend(options, newOptions);
  }, [height, options, series, type, width]);

  const updateSeries = useCallback(
    (prevSeries: ApexAxisChartSeries | ApexNonAxisChartSeries) => {
      const seriesChanged = !deepEqual(prevSeries, series);
      if (seriesChanged) {
        chart.current?.updateSeries(series);
      }
    },
    [series]
  );

  // useEffect(() => {
  //   prevOptions.current = options;
  // }, [options]);

  useEffect(() => {
    const current = chartRef.current;
    if (currentChartId !== id || !chart.current) {
      if (chart.current) {
        chart.current.destroy();
        chart.current = null;
      }

      chart.current = new ApexCharts(current, getConfig());
      // updateSeries(chart.current.w.config.series);
      chart.current.render();
      console.log('chart---new', currentChartId, id, currentChartId === id, getConfig());
      setCurrentChartId(id);
    }

    return () => {
      // if (chart.current && typeof chart.current.destroy === 'function' && currentChartId !== id) {
      //   console.log('chart---new---destroy', currentChartId, id, currentChartId === id);
      //   chart.current.destroy();
      //   chart.current = null;
      // }
    };
  }, [currentChartId, getConfig, id, updateSeries]);

  // useEffect(() => {
  //   return () => {
  //     if (chart.current && typeof chart.current.destroy === 'function') {
  //       chart.current.destroy();
  //     }
  //   };
  // }, []);

  useEffect(() => {
    if (!chart.current) {
      return;
    }

    const prevSeries = chart.current.w.config.series;

    const seriesChanged = !deepEqual(prevSeries, series);
    const optionsChanged =
      !deepEqual(prevOptions?.current, options) ||
      height !== chart.current.opts.chart.height ||
      width !== chart.current.opts.chart.width;

    console.log('chart---updated', seriesChanged, optionsChanged, getConfig(), series);

    if (seriesChanged || optionsChanged) {
      if (!seriesChanged) {
        // series has not changed, but options or size have changed
        chart.current.updateOptions(getConfig());
      } else if (!optionsChanged) {
        // options or size have not changed, just the series has changed
        chart.current.updateSeries(series);
      } else {
        // both might be changed
        chart.current.updateOptions(getConfig());
      }
    }
    prevOptions.current = options;
  }, [getConfig, height, options, series, width]);

  const rest = omit(restProps, Object.keys(Charts.propTypes));

  return <div ref={chartRef} {...rest} />;
}

Charts.propTypes = {
  type: PropTypes.string.isRequired,
  series: PropTypes.array.isRequired,
  options: PropTypes.object.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
