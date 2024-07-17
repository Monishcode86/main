import {
  StyleSheet,
  ScrollView,
  StatusBar,
  Text,
  View,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../constants/colors';
import CurrentLiveTrend from '../Charts/CurrentLiveTrend';
import Ganttchart from '../Charts/Ganttchart';
import HeaderLogo from '../components/HeaderLogo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { SelectList } from 'react-native-dropdown-select-list';
import { ButtonGroup } from 'react-native-elements';
import _, { isEmpty } from 'lodash';
import Detailchart from '../Charts/DetailChart';
import Piechart from '../Charts/Piechart';
const Machines = ({ route }) => {
  const resData = route.params;
  console.log(resData.status.currentShift['usershiftId'], "resData.status.currentShift")
  const [shiftList, setShiftList] = useState(['All Shift']);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedShift, setSelectedShift] = useState('all');
  const [data, setData] = useState([]);
  const intervalRef = useRef(null);
  const navigation = useNavigation();
  const [ganttData, setGanttData] = useState([]);
  const [devicebarData, setDevicebarData] = useState([]);
  const [productionLossData, setProductionLossData] = useState([]);
  useEffect(() => {
    const backAction = () => {
      clearInterval(intervalRef.current), navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  })
  useEffect(() => {
    getPageData();
    if (selectedShift === resData.status.currentShift['usershiftId'] || selectedShift === 'all') {
      machineScreenData(selectedShift);
      intervalRef.current = setInterval(() => {
        machineScreenData(selectedShift);
      }, 60000);
    } else {
      machineScreenData(selectedShift);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [selectedShift]);

  const getPageData = async () => {
    try {
      const shiftData = await AsyncStorage.getItem('shiftInfio');
      if (shiftData) {
        const parsedData = JSON.parse(shiftData);
        formatShiftData(parsedData);
      } else {
        console.log('No shift data found');
      }
    } catch (error) {
      console.error('Failed to fetch shift data', error);
    }
  };

  const formatShiftData = (data) => {
    const formattedData = ['All Shift', ...data.map(shift => shift.usershiftId)];
    setShiftList(formattedData);
  };

  const handlePress = (index) => {
    setSelectedIndex(index);
    setSelectedShift(shiftList[index] === 'All Shift' ? 'all' : shiftList[index]);
  };
  const machineScreenData = async () => {
    try {
      let body = JSON.stringify({
        deviceID: resData.id,
        custID: resData.status['custId'],
        shiftName: selectedShift,
      });

      const productionLoss = JSON.stringify({
        deviceID: resData.id,
        custID: resData.status['custId'],
      });

      const [machineResponse, ganttResponse, deviceBarResponse, prductionLossResponse] = await Promise.all([
        fetch('https://k2-oee-prod.azurewebsites.net/api/device_oee?code=vbtZrAQPwenO4iwgJR58jO8pLSM0VUo8MtYetHaCM1KwAzFu3ekVbg==', {
          method: 'POST',
          body,
        }),
        fetch('https://k2-oee-prod.azurewebsites.net/api/device_gantt_chart?code=rTjgE3saT7l_LNXSmiBDlvt3C1_OFBm3as-HY9SeV1YDAzFu-8-HSg==', {
          method: 'POST',
          body: body,
        }),
        fetch('https://k2-oee-prod.azurewebsites.net/api/device_bar_chart?code=mafaTgE3c-yo-6dAVaaD0BYbWI4WLxbG7p846_5Q_2vNAzFuhhVRZg%3D%3D', {
          method: 'POST',
          body: body,
        }),
        fetch('https://k2-oee-prod.azurewebsites.net/api/prod_loss?code=EB7UcHbHBZ2PwKbhP-Clxp14bPqRpJpvxI4DW8CPmYCfAzFuSH3iMA==', {
          method: 'POST',
          body: productionLoss,
        }),
      ]);
      const machineData = await machineResponse.json();
      const ganttData = await ganttResponse.json();
      const deviceBarData = await deviceBarResponse.json();
      const prductionLossData = await prductionLossResponse.json();

      setData(machineData);
      setGanttData(ganttData);
      setDevicebarData(deviceBarData);
      setProductionLossData(prductionLossData);

    } catch (error) {
      console.log(error);
    }
  };


  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.headerContainer}>
        <HeaderLogo />
        <Text style={styles.headerText}>Device</Text>
        <Text style={styles.shiftText}>
          {resData.status.currentShift.shiftName}
        </Text>
      </View>
      <View style={styles.deviceContainer}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.dataText}>LTU:{moment(Number(data.LUT)).format('HH:mm:ss') ? moment(Number(data.LUT)).format('HH:mm:ss') : '-'}</Text>
          <Text style={styles.dataText}>Status: {data.status ? data.status : '0'}</Text>
        </View>
        <Text style={styles.deviceName}>{resData.name}</Text>
        <ButtonGroup
          onPress={handlePress}
          selectedIndex={selectedIndex}
          buttons={shiftList}
          containerStyle={styles.buttonGroupContainer}
          buttonStyle={styles.button}
          selectedButtonStyle={styles.selectedButton}
          textStyle={styles.buttonText}
          selectedTextStyle={styles.selectedButtonText}
        />

      </View>

      <ScrollView style={styles.dataContainer}>
        <View style={styles.chartContainer}>
          <Detailchart detail={data} />
        </View>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={styles.dataItem}>
            <Text style={styles.dataText}>Current: {data.current ? data.current : '0'} Amp</Text>
            <Text style={styles.dataText}>Production Unit Cost: {productionLossData.power_unit_cost ? productionLossData.power_unit_cost : '0'}</Text>
    
          </View>
          <View style={styles.dataItem}>
            <Text style={styles.dataText}>Part Count: {data.part_count ? data.part_count : '0'}</Text>
            <Text style={styles.dataText}>Production Loss: {productionLossData.total_prod_loss ? productionLossData.total_prod_loss : '0'}</Text>

          </View>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={styles.dataItem2}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text style={styles.dataTextSub}>Apparent Power </Text>
                <Text style={styles.dataTextSub}>{data.apparent_power ? data.apparent_power : '0'}</Text>
              </View>
              <View>
                <Text style={styles.dataTextSub}>Real Power</Text>
                <Text style={styles.dataTextSub}>{data.real_power ? data.real_power : '0'}</Text>
              </View>
              <View>
                <Text style={styles.dataTextSub}>Total Energy</Text>
                <Text style={styles.dataTextSub}>{data.total_energy ? data.total_energy : '0'}</Text>
              </View>

            </View>
          </View>
        </View>
        <View style={styles.chartContainer}>
            <Piechart values={devicebarData} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Machines;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#181A20',
  },
  headerContainer: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#181A20',
  },
  headerText: {
    fontSize: 20,
    color: COLORS.white,
  },
  shiftText: {
    color: 'white',
  },
  deviceContainer: {
    backgroundColor: '#24252B',
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  chartContainer:{
    backgroundColor: '#24252B',
    borderRadius: 10,
    margin: 5,
    padding: 10,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  buttonGroupContainer: {
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#41B06E',
  },
  button: {
    backgroundColor: '#ffffff',
  },
  selectedButton: {
    backgroundColor: '#41B06E',
  },
  buttonText: {
    color: '#41B06E',
  },
  selectedButtonText: {
    color: '#ffffff',
  },
  dataContainer: {
    margin: 5,
  },
  dataItem: {
    flex: 1,
    backgroundColor: '#24252B',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    // marginVertical: 5,
  },
  dataItem2: {
    flex: 1,
    backgroundColor: '#24252B',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  dataText: {
    color: 'white',
    marginBottom: 5,
  },
  dataTextSub: {
    textAlign: 'center',
    color: 'white',

  }
});