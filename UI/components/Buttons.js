import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import COLORS from '../constants/colors';
const Button = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        height: 55,
        width: '100%',
        backgroundColor: "#007d79",
        borderWidth:2,
        borderColor:'#007d79',
        marginVertical: 20,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',

      }}>
      <Text style={{color: COLORS.white, fontWeight: 'bold', fontSize: 18}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;