import React,{ useContext, useState, useEffect } from 'react';
import Chatbot from "react-chatbot-kit";

import './App.css';
import ActionProvider from "./chatbot/ActionProvider";
import MessageParser from "./chatbot/MessageParser";
import config from "./chatbot/config";
import { MainContext } from './context/mainContext';
import { firestore } from "./chatbot/firebase/firebase.config"
// import TwilioUsername from './twilio/twilio-username';

function App() {
  const [notifi, setNotifi] = useState(true);
  // const [chatbotMessages, setChatbotMessages] = useState([]);
  const { openChatBox, setOpenChatBox, chatbotMessages, visitorId } = useContext(MainContext)

  

  const handleChatIconClick = () => {
    setOpenChatBox(true);
    setNotifi(false);
  }

  const saveMessages = (messages) => {
    localStorage.setItem("chat_messages", JSON.stringify(messages));
    console.log(messages)
  };

  const loadMessages =  () => {
    // let messages = [...chatbotMessages]
  
    // const localStorageMessages = JSON.parse(localStorage.getItem("chat_messages"));
    // console.log(localStorageMessages)
    // const messages = [...localStorageMessages, {id: 2, message: "I will at the end of the message", type: "bot", withAvatar: true}]
   return chatbotMessages;
  };

  return (
    <div>
    {/*<TwilioUsername />*/}
      <div className="chat-container">
        <div className="main-chat-icon-container">
          <div className="chat-icon-container" onClick={handleChatIconClick}>
          {
            notifi && <div className="chat-message-number">1</div>
          } 
            <i className="material-icons chat-icon">chat</i>
          </div>
        </div>
        {
          openChatBox && (
            <Chatbot
            config={config}
            actionProvider={ActionProvider}
            messageParser={MessageParser}
            visitorId={visitorId} />
          )
        }
      </div>
    </div>
  );
}

export default App;