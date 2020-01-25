import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { firebase } from '@react-native-firebase/auth';

export default ChatBubble = (props) => {

    const [recieved, setRecieved] = useState(false)

    useEffect(() => {
        if (firebase.auth().currentUser.uid !== props.author){
            setRecieved(true)
        }
    }, [])

    return (
        <View style={recieved === true ? { ...styles.messageView, alignSelf: 'flex-start' } : { ...styles.messageView, alignSelf: 'flex-end', backgroundColor: '#9ddcdc'}}>
            <View style={recieved === true ? { ...styles.messageImageView, left: -15 } : { ...styles.messageImageView, right: -15}}>
                <Image style={styles.messageImage} source={recieved === true ? { uri: props.profileImageURL } : { uri: props.currentUserProfileImageURL }}></Image>
            </View>
            <Text style={recieved === true ? { fontWeight: 'bold' } : { color: 'white', fontWeight: 'bold' }}>{props.message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    messageView: {
        backgroundColor: 'white',
        width: 'auto',
        height: 'auto',
        maxWidth: 350,
        alignSelf: 'flex-end',
        marginVertical: 25,
        borderRadius: 10,
        padding: 25,
        marginHorizontal: 20
    },
    messageImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        padding: 0
    },
    messageImageView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        backgroundColor: '#d9e1e8',
        position: 'absolute',
        right: -15,
        top: -35,
        borderRadius: 30,
        padding: 0
    },
});