import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../constants/colors';
import Input from '../components/Input';
// import MachinePerformanceChart from '../Charts/MachinePerformanceChart';
import { useNavigation, useFocusEffect, useIsFocused } from '@react-navigation/native';
// import Machinecount from '../APIServices/machinelist';
// import Gaugechart from '../Charts/Gaugechart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import _, { isEmpty } from 'lodash';
// import HeaderBar from '../components/HeaderBar';
import HeaderLogo from '../components/HeaderLogo';
import CurrentChart from '../Charts/CurrentLive';




export default function OtherScreen({ route }) {
  const isFocused = useIsFocused();
  let machineName;
  const [status, setStatus] = useState({});
  let token = ""
  useEffect(() => {
    if (isFocused) {
      console.log("cameinside");
      _retrieveData();
    }
  }, [isFocused]);
  const navigation = useNavigation();

  const [timeIntervel, settimeIntervel] = useState();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [copyData, setCopyData] = useState([]);
  const [newToken, setnewToken] = useState('');

  const { id } = route ? route.params : {};
  const [selectedId, setSelectedId] = useState();

  const Item = ({ item, onPress, backgroundColor, textColor, textstyle }) => (

    <TouchableOpacity
      onPress={onPress}
      style={[styles.item, { backgroundColor }]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

        <Text style={[styles.title, { color: textColor }]}>{item.device_name}</Text>
        <Icon name={'lightning-bolt-circle'} style={{ color: textstyle, fontSize: 22 }} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <View style={{
          justifyContent: 'center',
          alignItems: 'left'
        }}>
          <Text style={{ color: 'white', marginTop: 5, fontSize: 16 }}>
            Power : {item.current ? item.current.toFixed(2) : 0} amps
          </Text>
          <Text style={{ color: 'white', marginTop: 5, fontSize: 16 }}>
            OEE : {item.oee}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center'
          }}>
          <View >
            <Text style={{ color: 'white', marginTop: 1, fontSize: 16 }}>
              R_Power : {item.real_power} W
            </Text>
            <Text style={{ color: 'white', marginTop: 1, fontSize: 16 }}>
              A_Power : {item.apparent_power} VA
            </Text>
            <Text style={{ color: 'white', marginTop: 1, fontSize: 16 }}>
              T-Energy : {item.total_energy} KwH
            </Text>

          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
        <Text style={{ color: 'white', fontSize: 16 }}>
          Parts : {item.part_count}
        </Text>
        <Text style={{ color: 'white', fontSize: 16 }}>
          LUT : {moment(Number(item.LUT)).format('HH:mm:ss')}
        </Text>
      </View>

    </TouchableOpacity>

  );
  useEffect(() => {

    const backAction = () => {
      let perviousPage = navigation.getState();
      console.log(perviousPage, '---------perviousPageperviousPage-------');
      // if (perviousPage.history[1]) {
      //   navigation.navigate(perviousPage.history[1].key.split('-')[0]);
      // } else {
      Alert.alert('Exit App!', 'Are you sure you want to close the App?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => {
            BackHandler.exitApp(), clearData();
          },
        },
      ]);
      return true;
      // }
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [])

  async function _retrieveData() {
    try {
      const tokenres = await AsyncStorage.getItem('token');
      token = tokenres
      const custres = await AsyncStorage.getItem('custId');
      custId = custres
      Tokenstatus()
    } catch (error) {
      console.log(error);
    }

  };

  async function Tokenstatus() {
    try {
      const statusres = await fetch(
        'https://k2prod.azurewebsites.net/api/getLoginStatus',
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      );
      const json = await statusres.json();
      if (!Object.keys(json).includes("message"))
        setStatus(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!_.isEmpty(status)) {
      machinelist();

      settimeIntervel(setInterval(async () => {
        machinelist()

      }, 60000));

    }
  }, [status])

  function cleartimeInterval() {
    console.log(timeIntervel, "gdhgidiyf");
    clearInterval(timeIntervel);
  }

  async function clearData() {
    console.log('cleared');
    await AsyncStorage.clear();
  }
  async function machinelist() {
    console.log(moment().format("YYYY-MM-DD HH-mm-ss"))
    try {
      let body = JSON.stringify({
        // devices:status?.deviceDetails?.map(({deviceId}) => deviceId),
        // start_time: status?.currentShift['start'],
        // end_time: status?.currentShift['end'],
        // ideal_run_rate: '400',
        custID: custId,
      });
      console.log(body, "body")
      const response = await fetch(
        // 'https://k2functionapp.azurewebsites.net/api/DevicesOEE?code=B1qQd2JsbnQ_KD79hl8s82mNTe9COSnWpZsfseWbRqW3AzFuB1TpuA==',
        'https://k2-oee-prod.azurewebsites.net/api/devices_oee?code=IDafVwREaejNu5cZkPFu9KcbltWw2a4YKmBewQD5HrteAzFuh1QEQg==',
        {
          method: 'POST',
          body,
        },
      );
      const json = await response.json();
      await AsyncStorage.setItem('shiftInfio',JSON.stringify(json.Shift_List));
      console.log(json, 'response');
      machineName = json.device_List;

      let copyDataAfter = []
      if (!_.isEmpty(status?.deviceDetails))
        status.deviceDetails.map(deviceConfig => {
          let indexOfData = machineName.findIndex(device => device.device_id == deviceConfig.deviceId);
          // console.log(deviceConfig.deviceName, machineName, indexOfData, "indexOfData")
          if (Math.sign(indexOfData) !== -1)
            copyDataAfter.push({ ...machineName[indexOfData], ...{ device_name: deviceConfig.deviceName } });
        });
        console.log(copyDataAfter,"%%%%%%%%%%%%%%%%%%%%%%%%")
        setData(copyDataAfter)
        setCopyData(json.device_List);
    } catch (error) {
      console.log(error);
    }


  }

  function machinefilter(machineid) {
    console.log(machineid,"ehfgvdaswdekvfv")
    machineid = machineid.trimStart();
    console.log(machineid,machineid.trimStart(),"############################")
    if (machineid.length) {
      console.log(machineid.length,"LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLl")
      let d1 = [
        ...copyData.filter(function (item) {
          return item.device_name.toLowerCase().includes(machineid.toLowerCase());
        }),
      ];
      console.log(d1),"))))))))))))))))))))"
      setData(d1);
    } else {
      console.log(copyData),"-------------------->)))))))))))))))))))),NOOOOOOO"

      setData(copyData);
    }
  }

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#24252B' : '#24252B';
    const color = item.id === selectedId ? 'white' : 'white';
    let textColor;
    if (item.status === 0) {
      textColor = '#FFD93D';
    } else if (item.status === 1) {
      textColor = '#6BCB77';
    } else if (item.status === 2) {
      textColor = '#FF6B6B';
    } else if (item.status === 4) {
      textColor = '#4D96FF';
    }
    else {
      textColor = 'grey';
    }
    return (
      <Item
        item={item}
        onPress={() => {
          console.log(status, "nextpagge",item.device_id,item.device_name);
          cleartimeInterval(),
            navigation.navigate('machines', { id: item.device_id, name: item.device_name, status });
        }}
        backgroundColor={backgroundColor}
        textColor={color}
        textstyle={textColor}
      />
    );
  };
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.HeaderContainer}>
        <View>
          <HeaderLogo />
        </View>
        <View>
          <Text style={styles.HeaderText}>Device List</Text>
        </View>
        {status.currentShift ? (
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Text style={{ color: 'white' }}>{status.currentShift['shiftName']}{" "}</Text>
            <TouchableOpacity
              onPress={() => {
                cleartimeInterval(),
                  clearData(), navigation.navigate('LoginMode');
              }}>
              <Icon name={'logout'} style={{ color: COLORS.white, fontSize: 22 }} />
            </TouchableOpacity>
          </View>) : null}
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: 'white',
            }}>
            Total Devices : {data.length}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            // marginLeft: 10,
          }}>
          <Text
            style={{
              color: 'white',
            }}>
            Total Parts : {data.reduce((n, { part_count }) => n + part_count, 0)}
          </Text>
        </View>
      </View>

      {/* <View style={{ justifyContent: 'center', alignItems: 'center' }}> */}
       
          <View style={{ justifyContent: 'center', alignItems: 'center'}}>
            {data.length ? (
              <CurrentChart
                current={data.reduce((n, { current }) => n + current, 0).toFixed(2)}
              />
            ) :
              null}
          </View>
      {/* </View> */}
      <View
        style={{
          // backgroundColor:'green',
          paddingLeft: 10,
          paddingRight: 10,
          marginTop:-80
          // position:'relative'
        }}>
        <Input
          onChangeText={machinefilter}
          iconName="magnify"
          placeholder="Enter Device ID"
        />
      </View>

      {data.length ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.device_id}
          extraData={selectedId}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 16 }}>
            Fetching Response !!!
          </Text>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: '#181A20',
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    // marginTop:-20
  },
  title1: {
    fontSize: 14,
  },
  HeaderContainer: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#181A20',
  },
  HeaderText: {
    // fontFamily: "bol",

    fontSize: 20,
    color: COLORS.white,
  },
});
