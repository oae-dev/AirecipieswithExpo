import React from 'react';
import { DimensionValue, StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../../services/colors';

type MyButtonProps ={
    title:string,
    color:string | undefined,
    onpress: ()=> void,
    btnwidth: DimensionValue
}

const MyButton = ({title,color,onpress,btnwidth}:MyButtonProps) => {
  return (
    <TouchableOpacity
    onPress={onpress}
    style={[styles.btn,{backgroundColor:color,width:btnwidth}]}>
            <Text style={styles.btntext}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    btn:{
        borderRadius:20,
    },
    btntext:{
        color:colors.White,
        textAlign:'center',
        padding:20,
        fontWeight:'600',
        fontSize: 19,
    },
});

export default MyButton;
