import React, { createContext, useState, useEffect } from 'react'
import FingerprintJS from '@fingerprintjs/fingerprintjs';

import { firestore } from "../chatbot/firebase/firebase.config"

export const MainContext = createContext();

const MainContextProvider = (props) => {
    const [openChatBox, setOpenChatBox] = useState(false);
    const [visitorId, setVisitorId] = useState(null);
    const [chatbotMessages, setChatbotMessages] = useState([]);

    const [called, setCalled] = useState(true);

    useEffect(() => {
        if(!visitorId) return;
        console.log('I am called');
        const unsubscribe = firestore.collection("visitors").doc(visitorId).collection("visitorMessages")
            .orderBy("createdAt").onSnapshot(async querySnapshot => {
            let docArray = [];
                await querySnapshot.forEach(doc => {
                    docArray.push(doc.data())
            })
            setChatbotMessages(docArray)
        })

        return () => unsubscribe();
    }, [visitorId])

    // console.log({chatbotMessages})

    useEffect(() => {
        fingerprintjs()
    }, [])

    const fingerprintjs = async () => {
            // We recommend to call `load` at application startup.
        const fp = await FingerprintJS.load();

        // The FingerprintJS agent is ready.
        // Get a visitor identifier when you'd like to.
        const result = await fp.get();
        setVisitorId(result.visitorId)
    }

    return (
        <MainContext.Provider value={{openChatBox, setOpenChatBox, visitorId,
             setVisitorId, chatbotMessages, called, setCalled}}>
            {props.children}
        </MainContext.Provider>
    )
}

export default MainContextProvider