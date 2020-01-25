import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Platform } from 'react-native';

export default Header = (props) => {
    return (
        <View {...props} style={{...styles.root, ...props.style}}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        ...Platform.select({
            ios: {
                height: 100, 
                paddingTop: 30
            },
            android: {
                height: 70
            }
        }),
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#006184',
        paddingHorizontal: 10,
    }
});