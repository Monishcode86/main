import React, {useRef, useEffect} from 'react';
import {View} from 'react-native';
import * as echarts from 'echarts/core';
import {BarChart, LineChart, PieChart} from 'echarts/charts';
import Legend from '../Charts/piechartLegend';
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
  GridComponent,
  ToolboxComponent,
  LegendComponent,
  TooltipComponent,
  DataZoomComponent,
]);

export default function MachineReport({data}) {
console.log(data,"piechart");
  let piedata = [];
  if (data.length) {
    
    piedata = data.map(function (piedata) {
      return {name: piedata.status, value: piedata.duration};
    });

  
  }

  var colorPalette = ['#FFD93D', '#6BCB77']

  const skiaRef = useRef(null);
  useEffect(() => {
    const option = {
      tooltip: {
        trigger: 'item',
      },
      
      // legend: {
      //   // top: '15%',
      //   // left: '5%',
      //   textStyle: {
      //     color: 'white',
      //   },
      // },
      series: [
        {
          color:colorPalette,
          // name: 'Access From',
          type: 'pie',
          radius: ['20%', '60%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            // borderColor: 'black',
            borderWidth: 1,
          },
          label: {
            color: 'white',
            show: true,

            formatter(param) {
              // correct the percentage
              return '' + param.percent * 1 + '%';
            },
          },
          // emphasis: {
          //   label: {
          //     show: true,
          //     fontSize: 40,
          //     fontWeight: 'bold'
          //   }
          // },
          labelLine: {
            show: false,
          },
          data: piedata,
        },
      ],
    };
    let chart;
    if (skiaRef.current) {
      chart = echarts.init(skiaRef.current, 'light', {
        renderer: 'svg',
        width: 380,
        height: 250,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, []);

  return (
    <>
      <SkiaChart ref={skiaRef} />
      <View
        style={{
          marginTop: -30,
        }}>
        <Legend data={piedata} />
      </View>
    </>
  );
}
