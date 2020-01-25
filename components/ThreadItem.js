import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import ProfileModal from '../components/ProfileModal';

export default ThreadItem = (props) => {
    
    const [message, setMessage] = useState();
    const [participant, setParticipant] = useState({});
    const [modalVisible, setModalVisible] = useState(false);

    useEffect( () => {

        props.firebase.getLatestMessage(props.threadRef, 1).then( (message) => {
            setMessage(message[0].data().message)
        })

        props.firebase.getThreadUser(props.threadRef).then((user) => {
            setParticipant(user)
        })
        
    }, [])

    const openThreadHandler = () => {
        props.navigation.navigate('Thread', {
            threadRef: props.threadRef,
            user: participant,
            firebase: props.firebase,
        })
    }

    return (
            <View style={styles.container}>
                <ProfileModal onBackdropPress={() => { setModalVisible(false) }} participant={participant} threadRef={props.threadRef} firebase={props.firebase} isVisible={modalVisible} profileImageURL='https://lh3.googleusercontent.com/a-/AAuE7mCjUEBIzI5Rs9HK7iqTLEn0yAoQ-yoJ6r0o2CDa=s96-c' userName='Luke Berg' />
                <TouchableOpacity onPress={() => {
                setModalVisible(true)
                 }}>
                    <Image style={{ width: 70, height: 70, borderRadius: 45 }} source={{ uri: participant.profileImageURL}}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1}} onPress={openThreadHandler}>
                    <View style={styles.nameView}>
                        <Text lineBreakMode='tail' style={styles.nameText}>{participant.firstName}</Text>
                        <View style={{height: 10}}></View>
                        <Text numberOfLines={1} >{message}</Text>
                    </View>
                </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        flexDirection: 'row',
        marginVertical: 10
    },
    nameLatestView: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        height: '100%',
    },
    nameText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#006184',
    },
    nameView: {
        paddingLeft: 10,
        flex: 1
    }
});