import { View, Text, Image, Button, TouchableOpacity } from 'react-native';
// import { LinearGradient } from 'react-native-linear-gradient';
import COLORS from '../constants/colors';
import React from 'react';
// import Button from '../components/Buttons';

const Welcome = ({ navigation }) => {
    function onPress() {
        navigation.navigate("LoginMode")
    }
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#007d79"
            }}

        >
            <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"

            }}>
                <Image
                    source={require("../assets/Favicon_White.png")}
                    style={{
                        height: 100,
                        width: 100,
                    }}
                />
            </View>
            <View style={{ flex: 1 }}>
                <View style={{
                    paddingHorizontal: 22,
                    position: "absolute",
                    width: "100%"
                }}>
                    <Text style={{
                        fontSize: 50,
                        fontWeight: 800,
                        color: COLORS.white
                    }}>
                        Let's Get
                    </Text>
                    <Text style={{
                        fontSize: 46,
                        fontWeight: 800,
                        color: COLORS.white,
                        marginBottom: 50,
                    }}>
                        Connect
                    </Text>

                    <TouchableOpacity
                        onPress={onPress}
                        activeOpacity={0.7}
                        style={{
                            height: 55,
                            width: '100%',
                            backgroundColor: "white",
                            borderWidth: 2,
                            borderColor: 'white',
                            marginVertical: 20,
                            borderRadius: 12,
                            justifyContent: 'center',
                            alignItems: 'center',

                        }}>
                        <Text style={{ color: "#007d79", fontWeight: 'bold', fontSize: 18 }}>
                            Join Now
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

export default Welcome