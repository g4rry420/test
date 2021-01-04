import React,{ useContext, useState } from 'react';
import Chatbot from "react-chatbot-kit";

import './App.css';
import ActionProvider from "./chatbot/ActionProvider";
import MessageParser from "./chatbot/MessageParser";
import config from "./chatbot/config";
import { MainContext } from './context/mainContext';
// import { firestore } from "./chatbot/firebase/firebase.config"
// import TwilioUsername from './twilio/twilio-username';

function App() {
  const [notifi, setNotifi] = useState(true);
  
  const { openChatBox, setOpenChatBox } = useContext(MainContext)

  

  const handleChatIconClick = () => {
    setOpenChatBox(true);
    setNotifi(false);
  }

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
             />
          )
        }
      </div>
    </div>
  );
}

export default App;