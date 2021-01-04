import React from "react"
import { createChatBotMessage } from "react-chatbot-kit";

import Rings from "./components/Rings"
import Logo from "./components/Logo";
import Cross from "./components/Cross"
import Starting from "./components/Starting"

const config =  {
    botName: "StoreNextDoorBot",
    state: {},
    initialMessages: [
        createChatBotMessage(`Welcome to the StoreNextDoor.io!`,{
            widget: "cross",
            delay: -500
        }),
        createChatBotMessage(`What brought you here to check us out?`, {
            widget: "starting",
            delay: 500
        }),
    ],
    customStyles: {
        botMessageBox: {
            backgroundColor: "#85bb65",
        },
        chatButton: {
            backgroundColor: "#85bb65",
        },
    },
    customComponents: {
        // Replaces the default bot avatar
        botAvatar: (props) => <Logo {...props} />,
        // Replaces the default header
        header: () => {
            return (
                <div style={{ 
                    backgroundColor: "#85bb65",
                    padding: "5px",
                    borderRadius: "3px",
                    fontWeight: "600",
                    fontSize: "1.5rem" }}>
                    StoreNextDoorBot
                </div>
            )
        }
    },
    widgets: [
        {
            widgetName: "cross",
            widgetFunc: (props) =>  <Cross { ...props } />
        },
        {
            widgetName: "starting",
            widgetFunc: (props) => <Starting { ...props } state={[
                { text: "I need storage", handler: props.actionProvider.handleINeedStorage, id: 1 },
                { text: "I want to make money", handler: props.actionProvider.handleIWantToMakeMoney, id: 2 },
                { text: "I have an issue", handler: props.actionProvider.handleIHaveAnIssue, id: 3 },
                { text: "Just Browsing", handler: () => {}, id: 4 },
            ]} /> ,
        },
        {
            widgetName: "INeedStorage",
            widgetFunc: props => <Rings { ...props } state={[
                { text: "Yes, Sure", handler: () => {}, id: 1 },
                { text: "No, thank you", handler: props.actionProvider.handleINeedStorage_NoThankYou, id: 2 },
                { text: "Nevermind", handler: props.actionProvider.handleStarting, id: 3 }
              ]} />,
        },
        {
            widgetName: "IWantToMakeMoney",
            widgetFunc: props => <Rings { ...props } state={[
                { text: "Get a quote for your Space", handler: () => {}, id: 1 },
                { text: "Nevermind", handler: props.actionProvider.handleStarting, id: 2 }
            ]} />
        },
        {
            widgetName: "IHaveAnIssue",
            widgetFunc: props => <Rings { ...props } state={[
                { text: "Contact our live support", handler: props.actionProvider.handleContactOurLiveSupport, id: 1 },
                { text: "Nevermind", handler: props.actionProvider.handleStarting, id: 2 }
            ]} />
        },
        {
            widgetName: "nevermind",
            widgetFunc: props => <Rings { ...props } state={[
                { text: "Nevermind", handler: props.actionProvider.handleStarting, id: 1 }
            ]} />
        }
    ],
}

export default config;