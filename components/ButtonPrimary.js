import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export default ButtonPrimary = (props) => {
    return (
        <TouchableOpacity activeOpacity={.7} {...props} style={{ ...styles.root, ...props.style }}>
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    root: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 120,
        backgroundColor: '#33ddb1',
        shadowColor: '#33ddb1',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: .7,
        shadowRadius: 20,
        borderRadius: 10,
        marginVertical: 10
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#F0F3F5'
    }
});