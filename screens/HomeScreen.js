import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import firebaseAPI from '../firebase/firebase';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import ThreadItem from '../components/ThreadItem';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";
import Card from '../components/Card';
import ButtonPrimary from '../components/ButtonPrimary';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default HomeScreen = (props) => {

    const [messages, setMessages] = useState([]);
    const [threads, setThreads] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [email, setEmail] = useState();
    const [newMessage, setNewMessage] = useState();

    useEffect(() => {
        const unsubscribeThreads = firestore().collection('users').doc(firebase.auth().currentUser.uid).onSnapshot((querySnapshot) => {
            getThreads()
        })

        return () => {
            unsubscribeThreads()
        }
    }, [])


    const getThreads = () => {
        Firebase.getThreadsRef().then((threads) => {
            setThreads(threads)
            console.log('getting new threads')
            threads.forEach((thread, index) => {
                Firebase.getLatestMessage(thread, 1).then((message) => {
                    message.id = Math.random().toString();
                    setMessages([...messages, message])
                })
            })
        })
    }

    const newThreadEmailHandler = (email) => {
        setEmail(email)
    }

    const newThreadMessageHandler = (message) => {
        setNewMessage(message)
    }

    const createNewThread = () => {
        Firebase.startNewThread(email, newMessage).then(() => {
            setModalVisible(false)
        })
    }

    const Firebase = new firebaseAPI();

    return (
        <View style={styles.container}>
            <Header style={{ paddingHorizontal: 25 }}>
                <TouchableOpacity
                    onPress={() => {
                        Firebase.signOut().then(() => {
                            props.navigation.navigate('Login');
                        })
                    }}
                    style={{ zIndex: 1, justifyContent: 'center', alignItems: 'center', width: 50, height: 50 }}>
                    <Icon name='ios-log-out' size={50} color='white' />
                </TouchableOpacity>
                <Text style={{ flex: 1, fontSize: 30, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Chats</Text>
                <View style={{ width: 50, height: 50 }}></View>
            </Header>
            <Modal avoidKeyboard={true} onBackdropPress={() => {
                setModalVisible(false)
            }} isVisible={modalVisible}>
                <Card>
                    <Text style={styles.modalText}>New thread</Text>
                    <View style={styles.modalTextEntryView}>
                        <TextInput onChangeText={newThreadEmailHandler} style={styles.modalTextEntry} keyboardType='email-address' autoCapitalize='none' autoCorrect={false} placeholder="User's email..." />
                    </View>
                    <View style={styles.modalTextEntryView}>
                        <TextInput onChangeText={newThreadMessageHandler} style={styles.modalTextEntry} placeholder="Your message..." />
                    </View>
                    <ButtonPrimary title='Create' onPress={createNewThread} />
                </Card>
            </Modal>
            <FlatList style={styles.threadList} data={threads} renderItem={(itemData) => (
                <ThreadItem navigation={props.navigation} firebase={Firebase} threadRef={itemData.item} />
            )} />
            <TouchableOpacity onPress={() => {
                setModalVisible(true)
            }} style={styles.addButton}>
                <Icon name='ios-add' color='white' size={70} style={{ textAlign: 'center', textAlignVertical: 'bottom', width: 70, height: 70 }} />
            </TouchableOpacity>
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
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    },
    addButton: {
        position: 'absolute',
        bottom: 60,
        right: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#33ddb1',
        width: 80,
        height: 80,
        borderRadius: 40,
        flexDirection: 'row'
    },
    threadList: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        backgroundColor: '#d9e1e8',
        paddingTop: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 10
    },
    modalText: {
        color: '#006184',
        fontWeight: 'bold',
        fontSize: 25,
        marginVertical: 5,
        textAlign: 'left',
        width: '100%'
    },
    modalTextEntry: {
        padding: 0,
        paddingLeft: 10,
        height: '100%',
        width: '100%',
        fontWeight: 'bold'
    },
    modalTextEntryView: {
        height: 35,
        width: 300,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d9e1e8',
        marginHorizontal: 20,
        borderRadius: 10,
        marginVertical: 10
    }
});