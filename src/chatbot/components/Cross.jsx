import React, { useContext, Fragment, useEffect } from 'react'

import "./Cross.css"
import { MainContext } from "../../context/mainContext"

export default function Cross(props) {
    const { setOpenChatBox, chatbotMessages, visitorId } = useContext(MainContext);

    useEffect(() => {
        if(!chatbotMessages.length) return;

        chatbotMessages.forEach(message => {
            props.actionProvider.handleAnyoneSendBotMessage(message, visitorId);
        })

    }, [chatbotMessages])

    const handleClick = () => {
        setOpenChatBox(false);
    }

    return (
        <Fragment>
            <div className="cross" style={{ 
                backgroundColor: "#85bb65",
                borderRadius: "3px",
                fontWeight: "600",
                marginTop: "4px",
                fontSize: "1.7rem" }} onClick={handleClick}>
                <i className="material-icons">close</i>
            </div>
        </Fragment>
    )
}
