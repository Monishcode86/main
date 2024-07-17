
import { SvgChart, SVGRenderer } from '@wuba/react-native-echarts';
import {
  Text,
  View,
} from 'react-native';
import * as echarts from 'echarts/core';
import React, { useRef, useEffect, useState } from 'react';
import {
    BarChart, GaugeChart
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

const E_HEIGHT = 200;
const E_WIDTH = 350;

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
export default function Piechart({ values }) {
    
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (values && values.chart_data && values.chart_data[0] != undefined) {
          console.log(values.chart_data[0])
            const data = values.chart_data[0];
            const newData = data.map(item => ({
                value: item.percent,
                name: item.status_name
            }));
            setChartData(newData);
        }
    }, [values]);
    
    const option = {
        tooltip: {
          
        },
        legend: {
            textStyle: {
                color: 'white'
            },
        },
        series: [
          {
       
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
            //   borderRadius: 10,
            //   borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: '',
              color:'#24252B'

            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: chartData
          }
        ]
      };
      if (!values || !values.chart_data || values.chart_data[0] === undefined) {
        return <View ><Text style={{ color: 'white',textAlign:'center' }}>No data available</Text></View>;
    }
    return <ChartComponent option={option} />
}
