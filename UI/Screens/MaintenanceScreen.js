import React, { useState, useRef, useEffect } from 'react';
import { ExpandableCalendar, AgendaList, CalendarProvider } from 'react-native-calendars';
import { StyleSheet,Alert,BackHandler,StatusBar, Dimensions, TouchableOpacity, Text, View, TextInput } from 'react-native';
import COLORS from '../constants/colors';
import HeaderLogo from '../components/HeaderLogo';
import testIDs from './testIDs';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _, { isEmpty } from 'lodash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import { CheckBox } from 'react-native-elements';
const PAGE_WIDTH = Dimensions.get('window').width;

const TimelineCalendarScreen = () => {
   
  const ITEMS = [
    {
      title: '2024-07-01',
      data: [{}],
    },
    {
      title: '2024-07-02',
      data: [
        { status: 'Pending', Planning: 'Oil Check', title: 'Machine 1', comment: '' },
        { status: 'Pending', Planning: 'Lubricant Level', title: 'Machine 2', comment: '' },
      ],
    },
    {
      title: '2024-07-03',
      data: [
        { status: 'Completed', Planning: 'Coolent Level', title: 'Machine 3', comment: 'Done' },
        { status: 'Pending', Planning: 'Power Supply', title: 'Machine 4', comment: '' },
        { status: 'Completed', Planning: 'Scrap Cleaning', title: 'Machine 7', comment: 'Done' },
      ],
    },
    {
      title: '2024-07-04',
      data: [{ status: 'Pending', Planning: 'Voltage Check', title: 'Machine 5', comment: '' }],
    },
    {
      title: '2024-07-05',
      data: [{ status: 'Pending', Planning: 'Voltage Check', title: 'Machine 5', comment: '' }],

    },
    {
      title: '2024-07-06',
      data: [
        { status: 'Completed', Planning: 'Current Check', title: 'Machine 8', comment: 'Done' },
        { status: 'Pending', Planning: 'Oil Check', title: 'Machine 21', comment: '' },
        { status: 'Completed', Planning: 'Air Pressure', title: 'Machine 15', comment: 'Done' },
        { status: 'Pending', Planning: 'Coolent Viscocity', title: 'Machine 12', comment: '' },
      ],
    },
    {
      title: '2024-07-07',
      data: [{ status: 'Pending', Planning: 'Oil Viscocity', title: 'Machine 18', comment: '' }],
    },
    {
      title: '2024-07-08',
      data: [{ status: 'Pending', Planning: 'Voltage Check', title: 'Machine 5', comment: '' }],

    },
    {
      title: '2024-07-09',
      data: [
        { status: 'Pending', Planning: 'Lubricant change', title: 'Machie 15', comment: '' },
        { status: 'Completed', Planning: 'Oil Change', title: 'Machine 6', comment: 'Done' },
        { status: 'Completed', Planning: 'Oil Pressure', title: 'Machine 5', comment: 'Done' },
        { status: 'Pending', Planning: 'Temperature Check', title: 'Machine 8', comment: '' },
      ],
    },
    {
      title: '2024-07-10',
      data: [
        { status: 'Completed', Planning: 'Air Pressure', title: 'Machine 5', comment: 'Done' },
        { status: 'Pending', Planning: 'Current', title: 'Machine 5', comment: '' },
        { status: 'Completed', Planning: 'Pressure', title: 'Machine 9', comment: 'Done' },
      ],
    },
    {
      title: '2024-07-11',
      data: [
        { status: 'Pending', Planning: 'Lubricant Level', title: 'Machine 5', comment: '' },
      ],
    },
    {
      title: '2024-07-12',
      data: [
        { status: 'Completed', Planning: 'Oil Pressure', title: 'Machine 6', comment: 'Done' },
        { status: 'Pending', Planning: 'Air Flow', title: 'Machine 8', comment: '' },
        { status: 'Completed', Planning: 'Coolent Level', title: 'Machine 5', comment: 'Done' },
      ],
    },
    {
      title: '2024-07-13',
      data: [
        { status: 'Pending', Planning: 'Coolent Viscocity', title: 'Machine 14', comment: '' },
      ],
    },
    {
      title: '2024-07-14',
      data: [{ status: 'Pending', Planning: 'Air Pressure', title: 'Machine 20', comment: '' }],
    },
    {
      title: '2024-07-15',
      data: [{ status: 'Pending', Planning: 'Air Pressure', title: 'Machine 20', comment: '' }],
    },
    {
      title: '2024-07-16',
      data: [{ status: 'Pending', Planning: 'Voltage Check', title: 'Machine 5', comment: '' }],

    },
    {
      title: '2024-07-17',
      data: [{ status: 'Pending', Planning: 'Voltage Check', title: 'Machine 5', comment: '' }],

    },
    {
      title: '2024-07-18',
      data: [{ status: 'Pending', Planning: 'Voltage Check', title: 'Machine 5', comment: '' }],

    },
    {
      title: '2024-07-19',
      data: [{ status: 'Pending', Planning: 'Voltage Check', title: 'Machine 5', comment: '' }],

    },
    {
      title: '2024-07-20',
      data: [{ status: 'Pending', Planning: 'Voltage Check', title: 'Machine 5', comment: '' }],

    },
    {
      title: '2024-07-21',
      data: [{ status: 'Pending', Planning: 'Voltage Check', title: 'Machine 5', comment: '' }],

    },
  ];

  const modalizeRef = useRef(null);
  const [isChecked, setIsChecked] = useState(false);
  let [planning, setPlanning] = useState('');
  let [status, setStatus] = useState('');
  let [comments, setComments] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);


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

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);

  };

  const isSubmitDisabled = () => {
    return (
      status === 'Completed' ||
      (!(isChecked && comments != ''))
    );
  };

  const onOpen = (item) => {
    setSelectedItem(item);
    setIsChecked(item.item.status === 'Completed');
    setComments(item.item.comment);
    setStatus(item.item.status);
    setPlanning(item.item.Planning);
    const Today = moment().format('YYYY-MM-DD');
    if (Today == item.section['title']) {
      modalizeRef.current.expand();

    } else {
      Toast.show({
        type: 'info',
        text1: 'Info',
        text2: 'The selected date is not today.',
      });
    }
  };


  const renderItem = (item) => {
    if (_.isEmpty(item.item)) {
      return (
        <View style={styles.agendaItem}>
          <Text style={{ color: 'black', textAlign: 'center' }}>No Events Planned Today</Text>
        </View>
      );
    }
    return (
      <TouchableOpacity style={styles.agendaItem} onPress={() => onOpen(item)}>
        <View>
          <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: 'black' }}>{item.item.title}</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>{item.item.Planning}</Text>

          <Text
            style={[
              styles.button,
              { backgroundColor: item.item['status'] === 'Pending' ? 'lightpink' : 'lightgreen' }
            ]}>{item.item.status}</Text>

        </View>
      </TouchableOpacity>
    );
  };

  const submitData = () => {
    if (selectedItem) {
      const sectionIndex = ITEMS.findIndex(section => section.title === selectedItem.section.title);
      if (sectionIndex !== -1) {
        const itemIndex = ITEMS[sectionIndex].data.findIndex(item => item.title === selectedItem.item.title);
        if (itemIndex !== -1) {
          const newItems = [...ITEMS];
          newItems[sectionIndex].data[itemIndex] = {
            ...newItems[sectionIndex].data[itemIndex],
            status: 'Completed',
            comment: comments,
          };
          console.log(newItems[sectionIndex].data[itemIndex]); // This will log the updated item
          modalizeRef.current.close();
        }
      }
    }
  };

  return (
    <>
      <GestureHandlerRootView>
        <StatusBar backgroundColor={COLORS.black} />
        <View style={styles.headerContainer}>
          <HeaderLogo />
          <Text style={styles.headerText}>Maintenance</Text>
          <Text style={styles.shiftText}>Shift-1</Text>
        </View>
        <CalendarProvider date={ITEMS[0]?.title} showTodayButton>
          <ExpandableCalendar
            testID={testIDs.expandableCalendar.CONTAINER}
            firstDay={1}
            leftArrowImageSource={require('../Screens/image/previous.png')}
            rightArrowImageSource={require('../Screens/image/next.png')} />

          <AgendaList
            sections={ITEMS}
            renderItem={renderItem}
            scrollToNextEvent
            sectionStyle={styles.section}
            showsHorizontalScrollIndicator />
        </CalendarProvider>
        <BottomSheet ref={modalizeRef} index={-1} snapPoints={['50%', '50%', '50%']} enableHandlePanningGesture={true}>
          <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Maintenance</Text>
            <TouchableOpacity onPress={() => modalizeRef.current.close()}>
              <Text style={{ fontSize: 20, color: 'black' }}>X</Text>
            </TouchableOpacity>
          </View>
          <View style={{}}>
            <CheckBox
              title={planning}
              checked={isChecked}
              onPress={toggleCheckbox}
              checkedColor="green"
              uncheckedColor="red"
              size={30}
              containerStyle={{ backgroundColor: 'white', borderColor: 'white' }}
              disabled={status === 'Completed'}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Comments"
              editable={status !== 'Completed'}
              onChangeText={text => setComments(text)}
              value={comments}
            />
            <TouchableOpacity
              style={{
                backgroundColor: '#007BFF',
                padding: 15,
                marginHorizontal: 20,
                borderRadius: 5,
                alignItems: 'center',
              }}
              disabled={isSubmitDisabled()}
              onPress={() => submitData()}
            >
              <Text style={{
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
              }}>Submit</Text>
            </TouchableOpacity>
          </View>
        </BottomSheet>
      </GestureHandlerRootView>
    </>
  );
};

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  section: {
    backgroundColor: '#F2F1EB',
    color: 'black',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  agendaItem: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  button: {
    width: 100,
    padding: 5,
    borderRadius: 5,
    textAlign: 'center'
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: PAGE_WIDTH * 0.05,
    color: COLORS.black,
  },
  shiftText: {
    fontSize: PAGE_WIDTH * 0.04,
    color: COLORS.black,
  },
  input: {
    marginHorizontal: 20,
    color: 'black',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 15,
  },
});

export default TimelineCalendarScreen;


