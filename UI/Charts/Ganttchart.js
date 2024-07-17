import React, {useRef, useEffect,useState} from 'react';
import * as echarts from 'echarts/core';
import {BarChart, LineChart, PieChart, GaugeChart} from 'echarts/charts';
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

export default function MachineReport({data}) {
    

  // let chartdata = [
    
  //   {
  //     data: [25452],
  //     name: 'run',
  //     color: 'lightgreen',
  //     fromTo: '06:00:00-07:12:49',
  //   },
  //   {
  //     data: [4583],
  //     name: 'idle',
  //     color: 'yellow',
  //     fromTo: '06:00:00-07:12:49',
  //   },
  //   {
  //     data: [4525],
  //     name: 'break',
  //     color: 'red',
  //     fromTo: '06:00:00-07:12:49',
  //   },
  //   {
  //     data: [4534],
  //     name: 'off',
  //     color: 'lightblue',
  //     fromTo: '06:00:00-07:12:49',
  //   },
  //   {
  //     data: [6594],
  //     name: 'run',
  //     color: 'lightgreen',
  //     fromTo: '09:00:00-10:12:49',
  //   },
  //   {
  //       data: [6594],
  //       name: 'idle',
  //       color: 'yellow',
  //       fromTo: '10:12:49-11:12:49',
  //   },
  // ];

 

  const skiaRef = useRef(null);
  useEffect(() => {
    const option = {

      tooltip: {
        textStyle:{
            fontSize:6
        },
        trigger: 'item',
        formatter: function (params) {
          console.log(params, 'gdfdsg');
          var tooltipContent =
            'Status : ' +
            params.seriesName +
            '\n' +
            'Duration : ' +
            params.data +
            '\n' +
            'FromTo : ' +
            data[params.seriesIndex].fromto;

          return tooltipContent;
        },
      },

    //   grid: {
    //     left: '3%',
    //     right: '4%',
    //     bottom: '3%',
    //     containLabel: true,
    //   },
      xAxis: {
        type: 'value',

        show: false,
      },
      yAxis: {
        type: 'category',
        data: ['Duration'],
        show: false,
      },
      // dataZoom:{},
      series: data,
    };
    let chart;
    if (skiaRef.current) {
      chart = echarts.init(skiaRef.current, 'light', {
        renderer: 'svg',
        width: 380,
        height: 200,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, []);

  return <SkiaChart ref={skiaRef} />;
}
