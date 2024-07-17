import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader'; // Assuming Loader component is correctly implemented
import userLogin from '../APIServices/login'; // Assuming userLogin function is correctly implemented

const QRCodeLogin = ({ navigation }) => {
    const [inputs, setInputs] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const onSuccess = (e) => {
        const qrData = e.data;
        parseQRData(qrData);
    };

    const parseQRData = (qrData) => {
        const regex = /Email:\s*([^\s,]+),\s*Password:\s*([^\s,]+)/;
        const match = qrData.match(regex);
        if (match && match.length === 3) {
            const email = match[1];
            const password = match[2];
            setInputs({ email, password });
            validate({ email, password });
        } else {
            Alert.alert('Invalid QR Code', 'The QR code format is not valid.');
        }
    };

    const validate = ({ email, password }) => {
        let isValid = true;

        if (!email) {
            handleError('Please input email');
            isValid = false;
        }
        if (!password) {
            handleError('Please input password');
            isValid = false;
        }

        if (isValid && isValidEmail(email)) {
            login({ email, password });
        } else if (!isValidEmail(email)) {
            Alert.alert('Invalid Email', 'Please enter a valid email address.');
        }
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleError = (message) => {
        Alert.alert('Error', message);
    };

    const login = async ({ email, password }) => {
        setLoading(true);
        try {
            const userData = await userLogin(email, password);
            console.log('userData:', userData);

            if (userData.result === 'success') {
                await AsyncStorage.setItem('token', userData.token);
                await AsyncStorage.setItem('custId', userData.user.custId);
                await AsyncStorage.setItem('role', userData.user.role);
                if (userData.user.role == 'CUSTOMER' || userData.user.role == 'SUPERADMIN') {
                    navigation.navigate('MachineList');
                } else if (userData.user.role == 'OPERATOR') {
                    navigation.navigate('OperatorScreen');
                } else if (userData.user.role == 'SUPERVISOR') {
                    navigation.navigate('MaintenanceScreen');
                } else {
                    Alert.alert('Alert', userData.message);
                }

            } else {
                Alert.alert('Alert', userData.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Error', 'An error occurred while logging in.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Loader visible={loading} />
            <QRCodeScanner
                onRead={onSuccess}
                flashMode={RNCamera.Constants.FlashMode.off}
                reactivate={true}
                reactivateTimeout={5000}
                showMarker={true}
                topContent={<Text style={styles.centerText}>Scan the QR Code</Text>}
            />
        </View>
    );
};

export default QRCodeLogin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerText: {
        fontSize: 18,
        color: '#000',
    },
});
