import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import Firebase from '../firebase/firebase';
import Header from '../components/Header'
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import ChatBubble from '../components/ChatBubble';
import { firebase } from '@react-native-firebase/auth'



export default ThreadScreen = (props) => {

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState();

   const  messageEntryHandler = (message) => {
       setMessage(message)
   }

   const messageHandler = () => {
       firebaseAPI.sendMessage(threadRef.id, message).then(() => {
            setMessage(null)
       })

   }

    const firebaseAPI = props.navigation.getParam('firebase');
    const participant = props.navigation.getParam('user');
    const threadRef = props.navigation.getParam('threadRef');
    
    useEffect(() => {
        const unsubscribe = threadRef.collection('messages').orderBy('timeStamp', 'desc').onSnapshot((querySnapshot) => {
            if (messages.length < querySnapshot.docs.length){
                setMessages(querySnapshot.docs)
            }
        })
        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <View style={styles.container}>
            <Header>
                <TouchableOpacity 
                    onPress={() => {
                        props.navigation.goBack();
                    }}
                    style={{zIndex: 1, justifyContent: 'center', alignItems: 'center', width: 50, height: 50 }}>
                    <Icon name={Platform.OS === 'android' ? 'ios-arrow-down' : 'ios-arrow-back'} color='white' size={50} />
                </TouchableOpacity>
                <Text style={{flex: 1, fontSize: 30, fontWeight: 'bold' ,color: 'white', textAlign: 'center'}}>{participant.firstName}</Text>
                <View style={{width: 50, height: 50}}></View>
            </Header>
            <KeyboardAvoidingView behavior={Platform.OS === 'android' ? '' : 'padding'} style={styles.messageListKeyboard}>
                <FlatList inverted={true} style={styles.messageList} data={messages} renderItem={ (itemData) => (
                    <ChatBubble author={itemData.item.data().author} message={itemData.item.data().message} currentUserProfileImageURL={firebase.auth().currentUser.photoURL} profileImageURL={participant.profileImageURL}/>
                )}/>
                <View style={styles.bottomView}>
                    <View style={styles.messageEntryRootView}>
                        <View style={styles.messageEntryColoredView}>
                            <TextInput style={styles.messageEntry} placeholder='Type to send a message!' onChangeText={messageEntryHandler} value={message}/>
                            <View style={{width: 50, height: 50, borderRadius: 25, backgroundColor: 'white', position: 'absolute', right: -20, justifyContent: 'center', alignItems: 'center'}}>
                                <TouchableOpacity
                                onPress={messageHandler}
                                text=' '
                                style={{width: 40, height: 40, borderRadius: 20, backgroundColor: '#00d1ff', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                                    <Icon name='ios-send' color='white' size={30} style={{textAlign: 'center', textAlignVertical: 'center', alignSelf: 'center', width: 30, height: 30}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#006184',
    },
    messageListKeyboard: {
        flex: 1,
        width: '100%',
        backgroundColor: '#d9e1e8',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: 'hidden'
    },
    messageList: {
        flex: 1,
        width: '100%',
        backgroundColor: '#d9e1e8',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        padding: 0
    },
    bottomView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 70,
        backgroundColor: '#d9e1e8'
    },
    messageEntryRootView: {
        flex: 1,
        height: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    messageEntryColoredView: {
        height: 35,
        width: 300,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d9e1e8',
        marginHorizontal: 20,
        borderRadius: 10
    },
    messageEntry: {
        padding: 0,
        paddingLeft: 10,
        paddingRight: 35,
        height: '100%',
        width: '100%',
    }
});