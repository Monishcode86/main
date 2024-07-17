import React, {useRef, useEffect} from 'react';
import * as echarts from 'echarts/core';
import {BarChart, LineChart,PieChart,GaugeChart} from 'echarts/charts';
import moment from 'moment';
import {
  GridComponent,
  ToolboxComponent,
  LegendComponent,
  TooltipComponent,
  DataZoomComponent,
} from 'echarts/components';
import {SVGRenderer, SkiaChart} from '@wuba/react-native-echarts';

echarts.use([
  SVGRenderer,
  BarChart,
  LineChart,
  PieChart,
  GaugeChart,
  GridComponent,
  ToolboxComponent,
  LegendComponent,
  TooltipComponent,
  DataZoomComponent,
]);

export default function CurrentLiveTrend({Currentdata}) {

    let data1=[];
    let data2=[];
    for (let i = 0; i < Currentdata.length; i++) {
        data1[i] = Currentdata[i]["current"].toFixed(2);
        data2[i] =moment(Currentdata[i]["ts"]).format("HH:mm:ss");
    }

  const skiaRef = useRef(null);
  useEffect(() => {
  
    const option = {
        tooltip: {
            trigger: 'axis',
            textStyle:{
              color:'black'
            },
          },
        //   title: {
        //     left: 'center',
        //     text: 'Large Area Chart'
        //   },
          toolbox: {
            right : 20,
            feature: {
              
              restore: {},
            //   saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: data2,
            show:false
          },
          yAxis: {
            type: 'value',
            boundaryGap: ['0%', '100%'],
            show:false
          },
          dataZoom: [
            {
                // type: 'inside',
                start: 80,
                end: 100,
                bottom : '20',
              },
            
             
           
          ],
          series: [
            {
              name: 'Current',
              type: 'line',
              symbol: 'none',
              sampling: 'lttb',
              itemStyle: {
                color: '#5B82CE'
              },
            //   areaStyle: {
                // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                //   {
                //     offset: 0,
                //     color: 'blue'
                //   },
                //   {
                //     offset: 1,
                //     color: 'lightblue'
                //   }
                // ])
            //   },
              data: data1
            }
        ]
    };
    let chart;
    if (skiaRef.current) {
      chart = echarts.init(skiaRef.current, 'light', {
        renderer: 'svg',
        width: 350,
        height: 170,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, []);

  return <SkiaChart ref={skiaRef} />;
}