import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';

export default class Firestore {

    constructor() {
        this.bootstrap()
    }

    getThreadUser = (thread) => {
        return new Promise((resolve, reject) => {
            thread.get().then((doc) => {
                doc.data().members.forEach((member) => {
                    if (member.id !== firebase.auth().currentUser.uid){
                        member.get().then((doc) => {
                            resolve(doc.data())
                        })
                    }
                })
            }).catch((error) => {
                reject(error);
            });
        });
    }

    startNewThread = (email, message) => {
        return new Promise((resolve, reject) => {
            const currentUserRef = firestore().collection('users').doc(firebase.auth().currentUser.uid);
            firestore().collection('users').where('email', '==', email).get().then((docSnapshot) => {
                const participantUID = docSnapshot.docs[0].id;
                const participantRef = firestore().collection('users').doc(participantUID)
                const thread = firestore().collection('threads').doc();
                const batch = firestore().batch();
                batch.set(thread, {
                    members: [currentUserRef, participantRef]
                })
                batch.set(thread.collection('messages').doc(), {
                    author: firebase.auth().currentUser.uid,
                    message: message,
                    timeStamp: firestore.Timestamp.now()
                })
                batch.update(firestore().collection('users').doc(firebase.auth().currentUser.uid), {
                    threads: firestore.FieldValue.arrayUnion(thread)
                })
                batch.update(participantRef, {
                    threads: firestore.FieldValue.arrayUnion(thread)
                })

                batch.commit().then(
                    resolve()
                ).catch((error) => {
                    reject(error);
                })
            });
        })
    }

    getThreads = async () => {
        return new Promise((resolve, reject) => {
            const threads = []
            this.getThreadsRef().then((threadRefs) => {
                threadRefs.forEach((thread) => {
                    thread.get().then((doc) => {
                            threads.push(doc.data())
                        })
                        .catch((error) => {
                            reject(error)
                        })
                    if (threads.length === threadRefs.length) {
                        resolve(threads)
                    }
                })
            })
        })
    }

    getThreadsRef = async () => {
        return new Promise((resolve, reject) => {
            const threads = [];
            firestore().collection('users').doc(firebase.auth().currentUser.uid).get().then((doc) => {
                    const loop = new Promise((resolve, reject) => {
                        doc.data().threads.forEach((thread, index) => {
                            threads.push(thread)
                            if (threads.length === doc.data().threads.length) {
                                resolve(threads)
                            }
                        })
                    })

                    loop.then(() => {
                        resolve(threads)
                    })
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    getLatestMessage = async (thread, limitInt) => {
        return new Promise((resolve, reject) => {
            thread.collection('messages').orderBy('timeStamp', 'desc').limit(limitInt).get().then((doc) => {
                resolve(doc.docs)
            }).catch((error) => {
                reject(error)
            })
        })
    }



    sendMessage = (threadID, message) => {
        return new Promise((resolve, reject) => {
            const currentUserUID = firebase.auth().currentUser.uid;
            firestore().collection('threads').doc(threadID).collection('messages').add({
                    author: currentUserUID,
                    message: message,
                    timeStamp: firestore.Timestamp.now()
                }).then(resolve())
                .catch((error) => {
                    reject(error)
                })
        })
    }

    bootstrap = async () => {
        await GoogleSignin.configure({
            iosClientId: '1007956097562-gn0ba2d32v63uqb8n1etrls8sbt20n4e.apps.googleusercontent.com',
            webClientId: '1007956097562-03alomjsr5s1d3eovk8mfqor0v48a5e0.apps.googleusercontent.com',
            offlineAccess: true,
        })

        await firestore().settings({
            persistence: true,
            cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
        })
    }

    googleSignInHandler = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const {
                    accessToken,
                    idToken
                } = await GoogleSignin.signIn();
                this.credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
                firebase.auth().signInWithCredential(this.credential).then(
                    () => {
                        const currentUser = firebase.auth().currentUser;
                        const docRef = firestore().collection('users').doc(currentUser.uid);
                        const name = currentUser.displayName.split(' ')

                        docRef.get().then(
                            (doc) => {
                                if (doc.exists) {
                                    resolve('success')
                                } else {
                                    docRef.set({
                                        firstName: name[0],
                                        lastName: name[1],
                                        profileImageURL: currentUser.photoURL,
                                        email: currentUser.email,
                                        threads: []
                                    }).then(() => {
                                        resolve('success')
                                    })
                                }
                            }
                        ).catch((error) => {
                            reject(error)
                        })
                    }
                )
            } catch (error) {
                if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                    reject(error.code)
                } else {
                    reject(error)
                }
            }
        })
    }
}