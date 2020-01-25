import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';
import Logo from '../assets/glaciers.svg';
import ButtonPrimary from '../components/ButtonPrimary';
import Firebase from '../firebase/firebase';
import { firebase } from '@react-native-firebase/auth'


export default LoginScreen = (props) => {

    const firebaseAPI = new Firebase()

    useEffect(() => {
        if (firebase.auth().currentUser){
            props.navigation.navigate('Home')
        }
    }, [])

    return (
        <View style={styles.container}>
            <Card>
                <View style={styles.logoView}>
                    <View style={styles.subLogoView}>
                        <Logo width={120} height={120} />
                    </View>
                </View>
                <View style={styles.buttonView}>
                    <Text style={styles.text}>Welcome to Glacier!</Text>
                    <ButtonPrimary title='Login with Google' style={{width: 200, height: 50}} onPress={() => {
                        firebaseAPI.googleSignInHandler().then(
                            (message) => {
                                props.navigation.navigate('Home')
                            },
                            (error) => {
                                console.log(error)
                            }
                        )
                    }}/>
                    <Text style={{...styles.text, ...{marginVertical: 5, fontSize: 25}}}>Or</Text>
                    <ButtonPrimary title='Sign up' style={{ width: 200, height: 50, backgroundColor: '#1b9aaa', shadowColor: '#1b9aaa'}}/>
                </View>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d9e1e8'
    },
    text: {
        color: '#006184',
        fontWeight: 'bold',
        fontSize: 35,
        marginVertical: 30
    },
    logoView: {
        width: 170,
        height: 170,
        backgroundColor: '#d9e1e8',
        position: 'absolute',
        top: -90,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 85,
    },
    buttonView: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        height: 'auto'
    },
    subLogoView: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: 150,
        height: 150,
        backgroundColor: 'white',
        borderRadius: 75
    }
});