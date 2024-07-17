// import { SkiaChart, SVGRenderer } from '@wuba/react-native-echarts';
import { SvgChart, SVGRenderer } from '@wuba/react-native-echarts';
import * as echarts from 'echarts/core';
import { useRef, useEffect } from 'react';
import {
  BarChart,GaugeChart
} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
} from 'echarts/components';
import { color } from 'echarts';

// Register extensions
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  SVGRenderer,
 GaugeChart,
  BarChart,
])

const E_HEIGHT = 300;
const E_WIDTH = 250;

// Initialize
function ChartComponent({ option }) {
  const chartRef = useRef(null);

  useEffect(() => {
    let chart;
    if (chartRef.current) {
      // @ts-ignore
      chart = echarts.init(chartRef.current, 'light', {
        renderer: 'svg',
        width: E_WIDTH,
        height: E_HEIGHT,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, [option]);

  // Choose your preferred chart component
  // return <SkiaChart ref={chartRef} />;
  return <SvgChart ref={chartRef} />;
}

// Component usage
export default function OperatorCurrentChart({current}) {
  const data = [current];
  const option = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%'
    },
    
    series: [
      
      {
        
        // name: 'Pressure',
        type: 'gauge',
        progress: {
          show: true
        },
        detail: {
          valueAnimation: true,
          formatter: '{value}\nAmp',
          color:'black',
          fontSize: 20
        },
        data: [
          {
            value: data,
          }
        ]
      }
    ]
  };
  return <ChartComponent option={option} />
}