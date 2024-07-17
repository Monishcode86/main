import { View, Text } from 'react-native'
import React from 'react'
import moment from 'moment';
const piechartLegend = ({data}) => {
  
  let idletime = moment(moment.duration(data[0]["value"],'seconds').as('milliseconds')).utc().format("HH:mm:ss")
  let runtime = moment(moment.duration(data[1]["value"],'seconds').as('milliseconds')).utc().format("HH:mm:ss")
  
  return (
    <><View style={{ flexDirection:'row',justifyContent: 'space-around'}}>
          <Text style={{ fontSize: 12, color: '#6BCB77' }}>Running : 
          <Text> {runtime}</Text>
          </Text>
          <Text style={{ fontSize: 12, color: '#FFD93D' }}>Idle:
          <Text> {idletime}</Text></Text>
          {/* <Text style={{ fontSize: 12, color: '#EB5353' }}>{data[2]["status"]} {'\n'}
          <Text>{data[2]["time"]}</Text></Text>
          <Text style={{ fontSize: 12, color: '#187498' }}>{data[3]["status"]} {'\n'}
          <Text>{data[3]["time"]}</Text></Text> */}

      </View>
      </>
  )
}
export default piechartLegend