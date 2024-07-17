
import { SvgChart, SVGRenderer } from '@wuba/react-native-echarts';
import * as echarts from 'echarts/core';
import { useRef, useEffect } from 'react';
import {
    Text,
    View,
  } from 'react-native';
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
export default function Detailchart({ detail }) {
    const data = [detail];
    console.log(data,"kjhgfdsdfghj")

    const isDataAvailable = data[0].availability !== undefined ||
                            data[0].performance !== undefined ||
                            data[0].quality !== undefined ||
                            data[0].oee !== undefined;

    if (!isDataAvailable) {
        return <View><Text style={{ color: 'white',textAlign:'center' }}>No data available</Text></View> ;
    }
    const option = {
        tooltip: {
            formatter: function (params) {
                console.log(params)
                let tooltipContent = `${params.seriesName} ${params.value}`;
                // params.forEach(param => {
                //     tooltipContent += `${param.marker} ${param.seriesName}: ${param.value}<br/>`;
                // });
                return tooltipContent;
            },
        },
        legend: {
            textStyle: {
                color: 'white'
            },
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                axisLabel: {
                    color: '#24252B'
                },
                type: 'category',
                data: ['1']
            }
        ],
        yAxis: [
            {
                axisLabel: {
                    color: 'white'
                },
                type: 'value',
                splitLine: {
                    lineStyle: {
                        color: '#24252B'
                    },
                },
            }
        ],
        series: [
            {
                name: 'Availability',
                type: 'bar',
                data: [data[0].availability ? data[0].availability : '0']
            },
            {
                name: 'Performance',
                type: 'bar',
                data: [data[0].performance ? data[0].performance : '0']
            },
            {
                name: 'Quality',
                type: 'bar',
                data: [data[0].quality ? data[0].quality : '0']
            },
            {
                name: 'Oee',
                type: 'bar',
                data: [data[0].oee ? data[0].oee : '0']
            }
        ]
    };
 
    return <ChartComponent option={option} />
}
