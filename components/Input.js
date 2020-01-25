import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default ButtonPrimary = (props) => {
    return (
        <View {...props} style={styles.root}>
            <TextInput 
            style={styles.textInput} 
            blurOnSubmit={true} 
            placeholder={props.placeholder} 
            placeholderTextColor='white'
            autoCapitalize='none'
            keyboardType='email-address'/>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        width: 200,
        height: 40,
        flexDirection: 'column',
        borderRadius: 10,
        backgroundColor: '#d9e1e8',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        width: 'auto',
        height: 'auto',
        fontWeight: 'bold'
    }
});