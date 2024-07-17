
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import COLORS from '../constants/colors';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const LoginMode = ({ navigation }) => {
    function onPress() {
        navigation.navigate('Login');
    }
    function onPressQR() {
        navigation.navigate('QRCodeLogin');
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#007d79',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: height * 0.1,
            }}>
            <View
                style={{
                    alignItems: 'center',
                }}>
                <Image
                    source={require('../assets/Favicon_White.png')}
                    style={{
                        height: 80,
                        width: 80,
                    }}
                />
                <Text
                    style={{
                        fontSize: 30,
                        fontWeight: '800',
                        color: COLORS.white,
                        marginTop: 20,
                    }}>
                    Smart Sign In
                </Text>
            </View>
            <View
                style={{
                    width: '100%',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <TouchableOpacity
                    onPress={onPress}
                    activeOpacity={0.7}
                    style={{
                        height: 55,
                        width: width * 0.8,
                        backgroundColor: 'white',
                        borderWidth: 2,
                        borderColor: 'white',
                        marginVertical: 10,
                        borderRadius: 12,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Text style={{ color: '#007d79', fontWeight: 'bold', fontSize: 18 }}>
                        Log in with Email
                    </Text>
                </TouchableOpacity>
                <Text style={{ color: COLORS.white }}>or</Text>
                <TouchableOpacity
                    onPress={onPressQR}
                    activeOpacity={0.7}
                    style={{
                        height: 55,
                        width: width * 0.8,
                        backgroundColor: 'white',
                        borderWidth: 2,
                        borderColor: 'white',
                        marginVertical: 10,
                        borderRadius: 12,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}>
                    <Icon name="qrcode-scan" size={24} color="#007d79" style={{ marginRight: 10 }} />
                    <Text style={{ color: '#007d79', fontWeight: 'bold', fontSize: 18 }}>
                        QR Code
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginMode;
