import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default Header = (props) => {
    return (
        <View {...props} style={{ ...styles.root, ...props.style }}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        width: 'auto',
        height: 'auto',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        shadowColor: 'grey',
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowRadius: 5,
        shadowOpacity: .5,
        padding: 20,
        borderRadius: 10,
    }
});