
import React, { useState, useRef,useEffect } from 'react';
import { View, Alert,Text, StatusBar, BackHandler, StyleSheet, TouchableOpacity, FlatList, Dimensions, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderLogo from '../components/HeaderLogo';
import COLORS from '../constants/colors';
import OperatorCurrentChart from '../Charts/OperatorPowerChart';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SelectList } from 'react-native-dropdown-select-list'
import RBSheet from 'react-native-raw-bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputSpinner from 'react-native-input-spinner';

const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;

const OperatorScreen = () => {
 
  const [selected, setSelected] = useState(null);
  const [selectedReason, setSelectedReason] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = ['All', 'Reason', 'NoReason'];
  const [filterData, setFilterData] = useState([]);
  const [value, setValue] = useState(0);
  const [flatListData, setFlatListData] = useState([])
  const [items, updateItem] = useState([
    { key: 1, title: "machine_1" },
    { key: 2, title: "machine_2" },
    { key: 3, title: "machine_3" },
    { key: 4, title: "machine_4" },
    { key: 5, title: "machine_5" },
    { key: 6, title: "machine_6" }
  ])
  const [selectedItem, setSelectedItem] = useState(items[0].key);
  const [selectedValue, setSelectValue] = useState(null);
  const [rejectionCount, setRejectionCount] = useState(0);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showBottomSheet, setShowBottomSheet] = useState(true);

  useEffect(() => {

    const backAction = () => {
     
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
      
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [])

  async function clearData() {
    await AsyncStorage.clear();
  }

  const openMenu = () => {
    setIsMenuOpen(true);
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 5000)
  };

  const closeMenu = () => {
    setIsMenuOpen(false);

  };

  const handleMenuItemPress = (item) => {

    let tempArray = []

    console.log('Selected:', item);
    if (item == 'All') {
      console.log("if")
      setFilterData(data)
    } else if (item == 'Reason') {
      console.log("else if")

      data.forEach((val) => {
        if (val.reason != '') {
          tempArray.push(val)
        }
      })
      setFilterData(tempArray)
    } else {
      console.log("else")

      data.forEach((val) => {
        if (val.reason == '') {
          tempArray.push(val)
        }
        setFilterData(tempArray)

      })
    }

    closeMenu();
  };

  const ref = useRef(null);

  const rejectionSheetRef = useRef(null);

  const data1 = [
    { key: '1', value: 'Breakdown' },
    { key: '2', value: 'No Current' },
    { key: '3', value: 'Breakdown' },
    { key: '4', value: 'Over Dia' },
    { key: '5', value: 'No Power' },
    { key: '6', value: 'No Raw Material' },

  ]
  const rejection = [
    { key: '1', value: 'OD +' },
    { key: '2', value: 'OD -' },
    { key: '3', value: 'ID +' },
    { key: '4', value: 'ID -' },
    { key: '5', value: 'No Go Entered' },
    { key: '6', value: 'Go Not Entered' },

  ]
  const data = [
    { id: '1', value: '10:00:00 - 10:10:00 Breakdown', reason: 'Breakdown' },
    { id: '2', value: '11:30:00 - 11:32:00 No Reason', reason: '' },
    { id: '3', value: '12:00:00 - 12:15:00 Breakdown', reason: 'Breakdown' },
    { id: '4', value: '12:20:00 - 12:23:00 Over Dia', reason: 'Over Dia' },
    { id: '5', value: '12:30:00 - 12:50:00 No Power', reason: 'No Power' },
    { id: '6', value: '13:00:00 - 13:11:00 No Reason', reason: '' },
    { id: '7', value: '13:30:00 - 13:55:00 Power Failure', reason: 'Power Failure' },
    { id: '8', value: '14:00:00 - 14:10:00 No Reason', reason: '' },
    { id: '9', value: '14:20:00 - 14:21:00 VoltageDrop', reason: 'VoltageDrop' },
    { id: '10', value: '14:30:00 - 14:33:00 Coolent Decrease', reason: 'Coolent Decrease' },
    { id: '11', value: '15:00:00 - 15:10:00 High Temperature', reason: 'High Temperature' },
    { id: '12', value: '15:12:00 - 15:27:00 No Reason', reason: '' },
    { id: '13', value: '15:30:00 - 15:39:00 No Raw Material', reason: 'No Raw Material' },
    { id: '14', value: '15:50:00 - 15:55:00 No Reason', reason: '' },
  ]
  const RejectionData = {
    machine_1: [
      {
        id: '1',
        rejectedCount: 50,
        reason: "OD +"
      },
      {
        id: '2',
        rejectedCount: 25,
        reason: "OD -"
      },
      {
        id: '3',
        rejectedCount: 25,
        reason: "Thickness"
      },
      {
        id: '4',
        rejectedCount: 50,
        reason: "OD +"
      },
      {
        id: '5',
        rejectedCount: 25,
        reason: "OD -"
      },
      {
        id: '6',
        rejectedCount: 25,
        reason: "Thickness"
      },
      {
        id: '7',
        rejectedCount: 50,
        reason: "OD +"
      },
      {
        id: '8',
        rejectedCount: 25,
        reason: "OD -"
      },
      {
        id: '9',
        rejectedCount: 25,
        reason: "Thickness"
      }
    ],
    machine_2: [
      {
        id: '1',
        rejectedCount: 20,
        reason: "OD +"
      },
      {
        id: '2',
        rejectedCount: 20,
        reason: "OD -"
      },
      {
        id: '3',
        rejectedCount: 10,
        reason: "Thickness"
      }
    ]
  };
  const colors = ['#f8b400', '#e74c3c', '#2ecc71', '#3498db'];
  const message = [
    {
      machineName: 'machine_1',
      shiftName: "Shift-1",
      operatorName: 'Operator1',
      rejection: 150,
      partProduced: 200,
      downTime: '01:30:00',
      notification: 2,
      ltu: '16:43:00',
      status: 2,
      power: 80,
      r_power: 80,
      a_power: 50,
      t_energy: 60,
      availability: 100,
      performance: 60,
      quality: 100,
      oee: 50,
      previousshift_availability: 90,
      previousshift_performance: 75,
      previousshift_quality: 90,
      previousshift_oee: 60,
    },
    {
      machineName: 'machine_2',
      shiftName: "Shift-1",
      operatorName: 'Operator1',
      rejection: 170,
      partProduced: 220,
      downTime: '01:45:00',
      notification: 8,
      ltu: '16:43:00',
      status: 1,
      power: 40,
      r_power: 53,
      a_power: 86,
      t_energy: 95,
      availability: 56,
      performance: 70,
      quality: 66,
      oee: 87,
      previousshift_availability: 63,
      previousshift_performance: 48,
      previousshift_quality: 99,
      previousshift_oee: 32,
    },
  ];

  const openList = () => {
    setShowBottomSheet(!showBottomSheet);
  };

  const getComparisonStyles = (current, previous) => {
    const difference = current - previous;
    if (difference >= 0) {
      return { color: COLORS.green, icon: "arrow-up-thin", difference: `+${difference}` };
    } else {
      return { color: COLORS.red, icon: "arrow-down-thin", difference: `${difference}` };
    }
  };


  const showBottomSheets = () => {
    setSelected('')
    setFilterData(data)
    ref.current.open()
    rejectionSheetRef.current.close()
  };
  const toggleModal = () => {
    rejectionSheetRef.current.open();

  };
  function closeRejection() {

    rejectionSheetRef.current.close();
  }
  function closeDowntime() {
    ref.current.close()
    setSelected('')

  }
  const openItem = (item) => {
    setSelectedItem(item.key);
    const selectedMachine = message.find(machine => machine.machineName === item.title);
    const selectedMachineRejection = RejectionData[item.title];
    console.log(selectedMachineRejection, "selectedMachineRejection,", selectedMachine)
    setFlatListData(selectedMachineRejection)
    setSelectValue(selectedMachine);
    const sumRejectedCount = selectedMachine.partProduced - selectedMachine.rejection;
    setRejectionCount(sumRejectedCount)
  };

  return (
    <GestureHandlerRootView>

      <View style={styles.screenContainer}>
        <StatusBar backgroundColor={COLORS.black} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.ScrollViewFlex}>
          <View style={styles.headerContainer}>
            <HeaderLogo />
            <Text style={styles.headerText}>{selectedValue?.operatorName ?? '-'}</Text>
            <Text style={styles.shiftText}>{selectedValue?.shiftName ?? '-'}</Text>
          </View>
          <View style={styles.carouselContainer}>
            <ScrollView
              horizontal={true}
              persistentScrollbar={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={styles.scrollView}
              contentContainerStyle={styles.scrollViewContent}>
              {items.map(item => (
                <TouchableOpacity
                  key={item.key}
                  onPress={() => openItem(item)}
                  style={[
                    styles.tab,
                    item.key === selectedItem ? styles.selectedTab : null
                  ]}
                >
                  <Text style={item.key === selectedItem ? styles.selectedTabText : styles.tabText}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View style={styles.footerContainer}>
            <TouchableOpacity style={[styles.dataContainer, { backgroundColor: colors[0] }]} onPress={toggleModal}>
              <Text style={styles.dataText}>Rejections</Text>
              <Text style={styles.dataText}>{selectedValue?.rejection ?? 0}</Text>
            </TouchableOpacity >
            <TouchableOpacity style={[styles.dataContainer, { backgroundColor: colors[1] }]} onPress={showBottomSheets}>
              <Text style={styles.dataText}>Downtime</Text>
              <Text style={styles.dataText}>{selectedValue?.downTime ?? 0}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footerContainer}>
            <TouchableOpacity style={[styles.dataContainer, { backgroundColor: colors[2] }]} >
              <Text style={styles.dataText}>Fill</Text>
              <Text style={styles.dataText}>Check List</Text>
            </TouchableOpacity>
            <View style={[styles.dataContainer, { backgroundColor: colors[3] }]}>
              <Text style={styles.dataText}>Notification</Text>
              <Text style={styles.dataText}>{selectedValue?.notification ?? 0}</Text>
            </View>
          </View>
          <View style={{
            marginVertical: 10,
            marginHorizontal: 5,
            backgroundColor: '#fff',
            borderRadius: 8,
            overflow: 'hidden',
            shadowColor: '#000',
            padding: 15,
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 5,
          }}>
            <View style={styles.machineHeader}>
              <Text style={{ color: 'black' }}>LUT : {selectedValue?.ltu ?? '-'}</Text>
              <Text style={{ color: 'black' }}>{selectedValue?.machineName ?? '-'}</Text>
              <Text style={{ color: 'black' }}>Running</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: -40 }}>
              <View>
                <OperatorCurrentChart current={selectedValue?.power ?? ''} />
              </View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: -60 }}>
              <View>
                <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: 'black' }}>R-Power</Text>
                <Text style={{ fontSize: 16, textAlign: 'center', color: 'black' }}>{selectedValue?.r_power ?? 0} W</Text>
              </View>
              <View>
                <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: 'black' }}>A-Power</Text>
                <Text style={{ fontSize: 16, textAlign: 'center', color: 'black' }}>{selectedValue?.a_power ?? 0} VA</Text>
              </View>
              <View>
                <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: 'black' }}>T-Energy</Text>
                <Text style={{ fontSize: 16, textAlign: 'center', color: 'black' }}>{selectedValue?.t_energy ?? 0} KWh</Text>
              </View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 10 }}>
              <View style={styles.machinedataContainer}>
                <View style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <Icon
                    name={"hours-24"}
                    style={{ color: COLORS.black, fontSize: 30, marginRight: 10 }}
                  />
                  <Text style={{ fontWeight: 'bold' }}>Availability</Text>
                </View>
                <View style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <Text style={{ fontSize: 24, fontWeight: 'bold', color: getComparisonStyles(selectedValue?.availability ?? 0, selectedValue?.previousshift_availability ?? '').color }}>
                    <Icon
                      name={getComparisonStyles(selectedValue?.availability ?? 0, selectedValue?.previousshift_availability ?? '').icon}
                      style={{ color: getComparisonStyles(selectedValue?.availability ?? 0, selectedValue?.previousshift_availability ?? '').color, fontSize: 16, marginRight: 10 }}
                    />
                    {selectedValue?.availability ?? 0} %

                  </Text>

                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: getComparisonStyles(selectedValue?.availability ?? 0, selectedValue?.previousshift_availability ?? 0).color }}>
                    {getComparisonStyles(selectedValue?.availability ?? 0, selectedValue?.previousshift_availability ?? 0).difference} %

                  </Text>
                  <Text >
                    LS:{selectedValue?.previousshift_availability ?? 0} %
                  </Text>
                </View>
              </View>
              <View style={styles.machinedataContainer}>
                <View style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <Icon
                    name={"alarm-multiple"}
                    style={{ color: COLORS.black, fontSize: 30, marginRight: 10 }}
                  />
                  <Text style={{ fontWeight: 'bold' }}>Performance</Text>
                </View>
                <View style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <Text style={{ fontSize: 24, fontWeight: 'bold', color: getComparisonStyles(selectedValue?.performance ?? 0, selectedValue?.previousshift_performance ?? 0).color }}>
                    <Icon
                      name={getComparisonStyles(selectedValue?.performance ?? 0, selectedValue?.previousshift_performance ?? 0).icon}
                      style={{ color: getComparisonStyles(selectedValue?.performance ?? 0, selectedValue?.previousshift_performance ?? 0).color, fontSize: 16, marginRight: 10 }}
                    />
                    {selectedValue?.performance ?? 0} %
                  </Text>

                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: getComparisonStyles(selectedValue?.performance ?? 0, selectedValue?.previousshift_performance ?? 0).color }}>
                    {getComparisonStyles(selectedValue?.performance ?? 0, selectedValue?.previousshift_performance ?? 0).difference} %

                  </Text>
                  <Text >
                    LS:{selectedValue?.previousshift_performance ?? 0} %

                  </Text>
                </View>
              </View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 10 }}>
              <View style={styles.machinedataContainer}>
                <View style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <Icon
                    name={"check-decagram"}
                    style={{ color: COLORS.black, fontSize: 30, marginRight: 10 }}
                  />
                  <Text style={{ fontWeight: 'bold' }}>Quality</Text>
                </View>
                <View style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <Text style={{ fontSize: 24, fontWeight: 'bold', color: getComparisonStyles(selectedValue?.quality, selectedValue?.previousshift_quality).color }}>
                    <Icon
                      name={getComparisonStyles(selectedValue?.quality ?? 0, selectedValue?.previousshift_quality ?? 0).icon}
                      style={{ color: getComparisonStyles(selectedValue?.quality ?? 0, selectedValue?.previousshift_quality ?? 0).color, fontSize: 16, marginRight: 10 }}
                    />
                    {selectedValue?.quality ?? 0} %
                  </Text>

                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: getComparisonStyles(selectedValue?.quality ?? 0, selectedValue?.previousshift_quality ?? 0).color }}>
                    {getComparisonStyles(selectedValue?.quality ?? 0, selectedValue?.previousshift_quality ?? 0).difference} %

                  </Text>
                  <Text >
                    LS:{selectedValue?.previousshift_quality ?? 0} %
                  </Text>
                </View>
              </View>
              <View style={styles.machinedataContainer}>
                <View style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <Icon
                    name={"cog-transfer"}
                    style={{ color: COLORS.black, fontSize: 30, marginRight: 10 }}
                  />
                  <Text style={{ fontWeight: 'bold' }}>OEE</Text>
                </View>
                <View style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <Text style={{ fontSize: 24, fontWeight: 'bold', color: getComparisonStyles(selectedValue?.oee ?? 0, selectedValue?.previousshift_oee ?? 0).color }}>
                    <Icon
                      name={getComparisonStyles(selectedValue?.oee ?? 0, selectedValue?.previousshift_oee ?? 0).icon}
                      style={{ color: getComparisonStyles(selectedValue?.oee ?? 0, selectedValue?.previousshift_oee ?? 0).color, fontSize: 16, marginRight: 10 }}
                    />
                    {selectedValue?.oee ?? 0} %
                  </Text>

                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: getComparisonStyles(selectedValue?.oee ?? 0, selectedValue?.previousshift_oee ?? 0).color }}>
                    {getComparisonStyles(selectedValue?.oee ?? 0, selectedValue?.previousshift_oee ?? 0).difference} %

                  </Text>
                  <Text >
                    LS:{selectedValue?.previousshift_oee ?? 0} %
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <RBSheet
          ref={ref}
          useNativeDriver={false}
          height={400}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}
          customModalProps={{
            animationType: 'slide',
            statusBarTranslucent: true,
          }}
          customAvoidingViewProps={{
            enabled: false,
          }}
        >

          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Downtime Reason</Text>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <TouchableOpacity onPress={openMenu}>
                  <Icon name="filter-variant" size={26} color={COLORS.black} />
                </TouchableOpacity>
                {isMenuOpen && (
                  <View style={styles.tooltipContainer}>
                    <View style={styles.arrowBorder} />
                    <View style={styles.arrow} />
                    <View style={styles.tooltip}>
                      {menuItems.map((item, index) => (
                        <TouchableOpacity
                          key={index}
                          style={styles.menuItem}
                          onPress={() => handleMenuItemPress(item)}
                        >
                          <Text>{item}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )}
                <Text>{'\u00A0'}</Text>
                <Text>{'\u00A0'}</Text>

                <TouchableOpacity onPress={closeDowntime}>
                  <Icon name="close" size={26} color={COLORS.black} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.modalContent}>
              <View >

                <SelectList
                  setSelected={(val) => setSelected(val)}
                  data={filterData}
                  save="value"
                />
              </View>
              <View style={{ marginTop: 10 }}>

                {selected && (
                  <SelectList
                    setSelected={(val) => setSelectedReason(val)}
                    data={data1}
                    save="value"
                  />
                )}
              </View>
              <TouchableOpacity style={styles.button2} onPress={() => ref.current.close()}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>

        </RBSheet >
        <RBSheet
          ref={rejectionSheetRef}
          useNativeDriver={false}
          height={400}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: 'black',
            },
          }}
          customModalProps={{
            animationType: 'slide',
            statusBarTranslucent: true,
          }}
          customAvoidingViewProps={{
            enabled: false,
          }}>
          <View style={styles.bottomSheetContainer}>
            <View style={styles.bottomSheetHeader}>
              <View>
                <Text style={styles.bottomSheetTitle}>Rejection Input</Text>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row' }}>

                <TouchableOpacity onPress={openList}>
                  <Icon name="script-text" size={26} color={COLORS.black} />
                </TouchableOpacity>
                <Text>{'\u00A0'}</Text>
                <Text>{'\u00A0'}</Text>
                <Text>{'\u00A0'}</Text>
                <Text>{'\u00A0'}</Text>
                <TouchableOpacity onPress={closeRejection}>
                  <Icon name="close" size={24} color={COLORS.black} />
                </TouchableOpacity>
              </View>
            </View>
            {showBottomSheet ? (

              <View style={styles.bottomSheetContent}>
                <View style={{
                  display: 'flex',
                  flexDirection: "row",
                  justifyContent: 'space-between'
                }}>

                  <Text style={styles.summaryText}>PartProduced: {selectedValue?.partProduced ?? 0}</Text>
                  <Text style={styles.summaryText}>PartRejected: {selectedValue?.rejection ?? 0}</Text>
                </View>
                <InputSpinner
                  max={rejectionCount}
                  min={0}
                  step={1}
                  value={value}
                  onChange={(num) => setValue(num)}
                  style={styles.spinner}
                  skin="clean"
                  buttonStyle={styles.spinbutton}
                  inputStyle={styles.spininput}
                  background="#F0F3F8"
                />
                <View style={{ marginTop: 20 }}>

                  <SelectList
                    setSelected={(val) => setRejectionReason(val)}
                    data={rejection}
                    save="value"
                  />
                </View >
                <TouchableOpacity style={styles.button} onPress={() => rejectionSheetRef.current.close()}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <FlatList
                data={flatListData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.listItem}>
                    <Text style={styles.listItemText}>{item.reason}</Text>
                    <Text style={styles.listItemText}>{item.rejectedCount}</Text>
                  </View>
                )}
              />
            )}
          </View>

        </RBSheet>
      </View>
    </GestureHandlerRootView>
  );
};


const styles = StyleSheet.create({
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 2,
    // marginHorizontal: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
  },
  listItemText: {
    fontSize: 16,
    color: '#333',
  },
  scrollView: {
    width: '100%',
    height: 60,
    paddingVertical: 10
  },
  scrollViewContent: {
    justifyContent: 'center',
    height: 60,
  },
  summaryText: {

    fontWeight: 'bold',
    marginBottom: 5,
  },
  spinner: {
    marginTop: 10,
    width: 200,
    height: 50,
  },
  spinbutton: {
    backgroundColor: '#fff',
    borderWidth: 0,
  },
  spininput: {
    borderWidth: 1,
    borderColor: '#F0F3F8',
    backgroundColor: '#F0F3F8',
    borderRadius: 5,
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
  },
  tab: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginHorizontal: 5,
    borderColor: 'transparent',
  },
  selectedTab: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#007bff',
    borderColor: '#007bff',
    borderBottomWidth: 2
  },
  tabText: {
    color: '#000',
    fontSize: 16,
  },
  selectedTabText: {

    color: 'black',
    fontSize: 16,
  },
  filterButton: {
    marginRight: 10,
    padding: 5,
  },
  tooltipContainer: {
    position: 'absolute',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 100,
    top: 40,
    right: 10,
  },
  arrowBorder: {
    position: 'absolute',
    top: -10,
    right: 10,
    width: 0,
    height: 0,
    borderTopWidth: 10,
    borderTopColor: 'transparent',
    borderBottomWidth: 10,
    borderBottomColor: COLORS.white,
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
  },
  arrow: {
    position: 'absolute',
    top: -8,
    right: 12,
    width: 0,
    height: 0,
    borderTopWidth: 8,
    borderTopColor: 'transparent',
    borderBottomWidth: 8,
    borderBottomColor: COLORS.black,
    borderRightWidth: 8,
    borderRightColor: 'transparent',
    borderLeftWidth: 8,
    borderLeftColor: 'transparent',
  },
  tooltip: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  menuItem: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#F0F3F8',
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F5F5',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },


  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#F0F3F8',
  },
  headerText: {
    fontSize: PAGE_WIDTH * 0.05,
    color: COLORS.black,
  },
  shiftText: {
    fontSize: PAGE_WIDTH * 0.04,
    color: COLORS.black,
  },
  carouselContainer: {
    height: 70,
  },
  carouselStyle: {
    height: 100,
  },
  modalContent: {
    marginBottom: 10,
    marginHorizontal: 20

  },
  carouselItem: {
    width: PAGE_WIDTH * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: PAGE_HEIGHT * 0.1,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
    marginHorizontal: PAGE_WIDTH * 0.1,
  },
  title: {
    fontSize: PAGE_WIDTH * 0.05,
    fontWeight: 'bold',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  dataContainer: {
    width: PAGE_WIDTH * 0.47,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  dataText: {
    fontWeight: 'bold',
    textAlign: 'center',
    padding: PAGE_HEIGHT * 0.01,
    fontSize: PAGE_WIDTH * 0.04,
  },
  machineHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  machinedataContainer: {
    width: PAGE_WIDTH * 0.40,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    padding: 10
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    height: 400,
    backgroundColor: '#F6F5F5'
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 5,
    marginBottom: 15,
  },
  input1: {
    marginTop: 5,
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    marginBottom: 15,
  },
  bottomSheetContainer: {
    height: 400,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#F6F5F5'
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,

  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  bottomSheetContent: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  button2: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    marginTop: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OperatorScreen;



