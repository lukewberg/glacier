import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Modal from "react-native-modal";
import Card from './Card';
import ChatBubble from './ChatBubble';
import { firebase } from '@react-native-firebase/auth'

export default ProfileModal = (props) => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        props.firebase.getLatestMessage(props.threadRef, 5).then((messages) => {
            setMessages(messages.reverse())
        }).then(() => {
            messages.forEach((message) => {
                message.key = Math.random().toString()
            })
        })
    }, [])

    return (
        <Modal {...props}>
            <Card style={{padding: 10}}>
                <View style={styles.profilePictureView}>
                    <Image style={{ width: 100, height: 100, borderRadius: 50 }} source={{ uri: props.participant.profileImageURL}}></Image>
                </View>
                <Text style={styles.userName}>{props.participant.firstName +' ' +props.participant.lastName}</Text>
                <View style={styles.recentMessagesView}>
                    <ScrollView style={styles.recentMessagesScrollView} >
                        {messages.map((message) => (
                            <ChatBubble key={Math.random().toString()} author={message.data().author} message={message.data().message} currentUserProfileImageURL={firebase.auth().currentUser.photoURL} profileImageURL={props.participant.profileImageURL} />
                        ))}
                    </ScrollView>
                </View>
            </Card>
        </Modal>
    );
};

const styles = StyleSheet.create({
    profilePictureView: {
        width: 100,
        height: 100,
        position: 'absolute',
        top: -70,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 85,
    },
    userName: {
        color: '#006184',
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: 25,
        marginBottom: 10,
        width: '100%',
        textAlign: 'center'
    },
    recentMessagesView: {
        width: '100%',
        height: 300,
        backgroundColor: '#d9e1e8',
        borderRadius: 10,
        flexDirection: 'column'
    },
    recentMessagesScrollView: {
        flex: 1,
        width: '100%',
        paddingTop: 10
    }
});