import React, { useState } from 'react';
import { View, Text, Image, Keyboard, Alert } from 'react-native';
import COLORS from '../constants/colors';
import Button from '../components/Buttons';
import Input from '../components/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';
import userLogin from '../APIServices/login';

const Login = ({ navigation }) => {

  const [inputs, setInputs] = React.useState({ email: '', password: '' });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const [email] = useState('');

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    }
    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    }
    if (isValid) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (emailRegex.test(inputs.email)) {

        login();
      } else {
        Alert.alert('Invalid Email', 'Please enter a valid email address.');

      }
    }
  };
  const login = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      userLogin(inputs.email, inputs.password).then(async (res) => {
        let userData = res
        console.log(userData, "userData");
        if (userData.result == 'success') {
          await AsyncStorage.setItem('token', userData.token)
          await AsyncStorage.setItem('custId', userData.user.custId)
          await AsyncStorage.setItem('role', userData.user.role);
        }
        console.log(userData, "logindata");
        if (Object.keys(userData).length) {
          if (userData.token && userData.user.role == 'CUSTOMER' || userData.user.role == 'SUPERADMIN' ) {
            navigation.navigate('MachineList');
          } else if (userData.user.role == 'OPERATOR') {
            navigation.navigate('OperatorScreen');
          } else if (userData.user.role == 'SUPERVISOR') {
            navigation.navigate('MaintenanceScreen');
          } else {
            Alert.alert('Alert', userData.message);
          }
        } else {
          console.log("Wrong Password",userData.message)
          Alert.alert('Alert', userData.message);
        }
      }).catch(err => {
        console.log(err)
      });

    }, 3000);
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };
  return (
    // <SafeAreaView style={{ backgroundColor: COLORS.black, flex: 1 }}>
    <View  style={{ backgroundColor: COLORS.black, flex: 1 }}>

      <Loader visible={loading} />
      <View style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Image
          source={require('../assets/Wimera_Logo.png')}
          style={{
            height: 70,
            width: 200,
          }}
        />
      </View>
      <View style={{ flex: 1, marginHorizontal: 22, marginBottom: 100 }}>
        <View style={{ marginBottom: 1 }}>
          <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />
        </View>
        <View style={{ marginBottom: 1 }}>
          <Input
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />
          <Button title="Log In" onPress={validate} />
        </View>
      </View>
    </View>
    // </SafeAreaView>
  );
};


export default Login;