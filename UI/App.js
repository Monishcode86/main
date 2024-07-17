import React,{useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './LogInScreens/Login';
import SplashScreen from 'react-native-splash-screen';
import MachineList from './Screens/MachineList';
import OtherScreen from './OthersScreen/others';
import Machines from './OthersScreen/Machines';
import Welcome from './LogInScreens/Welcome';
import LoginMode from './LogInScreens/LoginMode';
import QRCodeLogin from './LogInScreens/QRCodeLogin';
import OperatorScreen from './Screens/OperatorScreen';
import MaintenanceScreen from './Screens/MaintenanceScreen';
// import 'react-native-gesture-handler';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(()=>{
    SplashScreen.hide();
  },[])
  return (


    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false,
          }}
        /> 
          <Stack.Screen
          name="LoginMode"
          component={LoginMode}
          options={{
            headerShown: false,
          }}
        /> 
        <Stack.Screen
          name="QRCodeLogin"
          component={QRCodeLogin}
          options={{
            headerShown: false,
          }}
        /> 
      <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        /> 
        <Stack.Screen
          name="MachineList"
          component={MachineList}
          options={{
            headerShown: false,
          }}
        /> 
          <Stack.Screen
          name="OperatorScreen"
          component={OperatorScreen}
          options={{
            headerShown: false,
          }}
        /> 
         <Stack.Screen
          name="MaintenanceScreen"
          component={MaintenanceScreen}
          options={{
            headerShown: false,
          }}
        /> 
        <Stack.Screen
          name="others"
          component={OtherScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="machines"
          component={Machines}
          options={{
            headerShown: false,
          }}
        />    
      </Stack.Navigator>
    </NavigationContainer>

  );
}
