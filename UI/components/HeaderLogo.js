import { StyleSheet, Text, View,Image } from 'react-native';
import React from 'react';
import COLORS from '../constants/colors';
// import { Colors } from 'react-native/Libraries/NewAppScreen';

const HeaderLogo = () => {
  return (
    <View style={styles.ImageContainer}>
      <Image
        source={require('../assets/Favicon_Green.png')}
        style={styles.Image}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    ImageContainer: {
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      },
      Image: {
        height: 50,
        width: 50,
      },
})
export default HeaderLogo