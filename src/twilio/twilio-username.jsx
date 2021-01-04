import React, { useState, useEffect, useRef } from 'react'
import Client from "twilio-chat"

import "./twilio-username.css"

export default function TwilioUsername() {
    const GENERAL_CHANNEL_UNIQUE_NAME = "general";
    const GENERAL_CHANNEL_NAME = "General Channel";

    const [state, setState] = useState({
        usernameInput: "",
        channelArrays: [],
    })
    const [generalChannel, setGeneralChannel] = useState(null);
    const [messagingClient, setMessagingClient] = useState(null)

    const usernameSpanRef = useRef();
    const statusRowRef = useRef();
    const connectPanelRef = useRef();
    const messageListRef = useRef();
    const inputTextRef = useRef();
    const typingRowRef = useRef();
    const channelListRef = useRef();

    useEffect(() => {
        if(!messagingClient) return;

        messagingClient.on("tokenExpired", refreshToken);
        messagingClient.on("channelAdded", loadChannelList);
    },[messagingClient])

    useEffect(() => {
        if(!state.channelArrays.length) return;

        state.channelArrays.forEach(addChannel);
    }, [state.channelArrays])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    const handleUsernameInputKeypress = (event) => {
        if(event.keyCode === 13){
            connectClientWithUsername()
        }
    }

    const connectClientWithUsername = () => {
        const { usernameInput } = state;

        if(usernameInput === ""){
            alert("Username cannot br empty");
            return;
        }

        fetchAccessToken(usernameInput, connectMessagingClient);
    }

    const fetchAccessToken = (username, handler) => {
        const identity = { identity: username }
        fetch("/token",{
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(identity)
        })
        .then(response => response.json())
        .then(data => handler(data.token))
        .catch(err => console.log("Failed to fetch the Access Token with error", err))
    }

    const connectMessagingClient = (token) => {
        Client.create(token).then((client) => {
            setMessagingClient(client)
            updateConnectedUI();
        })
    }

    const updateConnectedUI = () => {
        usernameSpanRef.current.textContent = state.usernameInput;
        statusRowRef.current.classList.remove("disconnected");
        statusRowRef.current.classList.add("connected");
        connectPanelRef.current.classList.remove("disconnected");
        connectPanelRef.current.classList.add("connected");
        messageListRef.current.classList.remove("disconnected");
        messageListRef.current.classList.add("connected");
        inputTextRef.current.classList.add("with-shadow");
        typingRowRef.current.classList.remove("disconnected");
        typingRowRef.current.classList.add("connected");
    }

    const refreshToken = () => {
        fetchAccessToken(state.usernameInput, setNewToken)
    }

    const setNewToken = (token) => {
        messagingClient.updateToken(token)
    }

    const loadChannelList = (handler) => {
        if(messagingClient === undefined) {
            console.log("Client is not initialised");
            return;
        }

        messagingClient.getPublicChannelDescriptors().then((channels) => {
            setState({ ...state, channelArrays: sortChannelsByName(channels.items) });
            channelListRef.current.textContent = "";
            
        })
    }

    const sortChannelsByName = (channels) => {
        return channels.sort((a, b) => {
            if(a.friendlyName === GENERAL_CHANNEL_NAME) {
                return -1;
            }

            if(b.friendlyName === GENERAL_CHANNEL_NAME){
                return 1;
            }

            return a.friendlyName.localeCompare(b.friendlyName)
        })
    }

    const addChannel = (channel) => {
        if(channel.uniqueName === GENERAL_CHANNEL_UNIQUE_NAME){
            setGeneralChannel(channel);
        }
    }

    const { usernameInput } = state

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <div className="row">
                        <div className="col-md-2 col-md-offset-5" id="logo-column">
                            <img id="logo-image" src={require("./img/twilio-logo.png")} alt=""/>
                        </div>
                    </div>
                    <div ref={statusRowRef} id="status-row" className="row disconnected">
                        <div className="col-md-5 left-align">
                            <span id="delete-channel-span">
                                <b>Delete current channel</b>
                            </span>
                        </div>
                        <div className="col-md-7 right-align">
                            <span id="status-span">Connected as 
                                <b><span ref={usernameSpanRef} id="username-span"></span></b>
                            </span>
                            <span id="leave-span"><b>x Leave</b>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div id="container" className="row">
                <div id="channel-panel" className="col-md-offset-2 col-md-2">
                    <div ref={channelListRef} id="channel-list" className="row not-showing"></div>
                    <div id="new-channel-input-row" className="row not-showing">
                        <textarea id="new-channel-input" rows="1" className="channel-element" placeholder="Type channel name" maxLength="20"></textarea>
                    </div>
                    <div className="row">
                        <img src={require("./img/add-channel-image.png")} alt="" id="add-channel-image"/>
                    </div>
                </div>
                <div id="chat-window" className="col-md-4 with-shadow">
                    <div ref={messageListRef} id="message-list" className="row disconnected"></div>
                    <div ref={typingRowRef} id="typing-row" className="row disconnected">
                        <p id="typing-placeholder"> </p>
                    </div>
                    <div id="input-div" className="row">
                        <textarea ref={inputTextRef} id="input-text" disabled={true} placeholder='     Your message'></textarea>
                    </div>
                    <div ref={connectPanelRef} id="connect-panel" className="disconnected row with-shadow">
                        <div className="row">
                            <div className="col-md-12">
                                <label htmlFor="username-input">Username:</label>
                                <input name="usernameInput" onKeyPress={handleUsernameInputKeypress} value={usernameInput} onChange={handleChange} type="text" placeholder="username" id="username-input"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <img src={require("./img/connect-image.png")} alt="" id="connect-image"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
