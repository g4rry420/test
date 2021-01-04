import React,{ useState, useContext, useEffect } from 'react'

import "./with-ring.css"
import { MainContext } from '../../../context/mainContext'

const WithRing = (WrappedComponent) => {
    const WithRing = (props) => {
        // console.log(props)
        const { visitorId, chatbotMessages } = useContext(MainContext)
        const [options, setOptions] = useState([...props.state])


        // useEffect(() => {
        //     if(!chatbotMessages.length) return;
        //     console.log("I am called")
            // props.actionProvider.handleAnyoneSendBotMessage(chatbotMessages, visitorId);
            // setChatbotMessages([]);

            // chatbotMessages.forEach(chatMessage => {
                // console.log(chatMessage)
                // if(chatMessage.message === "user"){
                //     props.actionProvider.createClientMessage(chatMessage.message)
                // }else if(chatMessage.message === "bot"){
                //     props.actionProvider.createChatBotMessage(chatMessage.message);
                // }
                // props.actionProvider.handleAnyoneSendBotMessage(chatMessage, visitorId)
            // })
        // }, [chatbotMessages])
    
        const optionsMarkup = options && options.map((option) => (
            <button id={option.id} className="learning-option-button" key={option.id} onClick={(e) => {
                setOptions([]);
                return option.handler(e.target, visitorId);
            }}>
                {option.text}
            </button>
        ));
    
        return (
            <WrappedComponent optionsMarkup={optionsMarkup} {...props} />
        )
    }

    return WithRing;
}

export default WithRing;