import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCAfIRGGAA4C3qzwWiUZ68N9LhHDJV-kWo",
    authDomain: "messaggio-2247e.firebaseapp.com",
    databaseURL: "https://messaggio-2247e.firebaseio.com",
    projectId: "messaggio-2247e",
    storageBucket: "messaggio-2247e.appspot.com",
    messagingSenderId: "952307065289",
    appId: "1:952307065289:web:1745d7680f9c3a02de8818",
    measurementId: "G-ZVVC1MBWFM"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export const visitingUsers = async (visitorId, additionalData) => {
    if(!visitorId) return;

    const visitorsRef = firestore.doc(`visitors/${visitorId}`);
    const snapshot = visitorsRef.get();

    const createdAt = new Date();

    if(!snapshot.exists) {
        try {
            await visitorsRef.set({
                createdAt,
                visitorId 
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    // check if we already have the documents
    const visitorMessages = await firestore.collection("visitors").doc(visitorId).collection("visitorMessages").where("id", "==", additionalData.id);
    const visitorMessagesSnapshot = await visitorMessages.get();
    
    if(visitorMessagesSnapshot.empty) {
        const visitorMessagesRef = await firestore.collection("visitors").doc(visitorId).collection("visitorMessages").doc();

        try {
            await visitorMessagesRef.set({
                ...additionalData,
                createdAt
            })
        } catch (error) {
            console.log(error)
        }
    }
}