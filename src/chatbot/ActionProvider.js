import { visitingUsers } from "./firebase/firebase.config"

class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage, state) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
        this.createClientMessage = createClientMessage;
    }

    async updateChatbotState(message, visitorId) {
        // console.log(message)
        // message.forEach(async mess => {
        //     await visitingUsers(visitorId, mess)
        // })

        if(message.length){
            this.setState(prevState => { 
                return ({
                    ...prevState, messages: [...prevState.messages, ...message]
                })
            })
        }else {
            this.setState(prevState => {
                // console.log(prevState.messages)
                if(prevState !== undefined){
                    let result = prevState.messages.map(mess => mess.id).includes(message.id);
                    let result2 = prevState.messages.map(mess => mess.message).includes(message.message)
                    if(!result && !result2){
                        return ({
                            ...prevState, messages: [...prevState.messages, message]
                        })
                    }else{
                        return ({
                            ...prevState, messages: [...prevState.messages]
                        })
                    }
                }
            })
        }

        await visitingUsers(visitorId, message)
    }

    greet() {
        const greetingMessage = this.createChatBotMessage("Hi, friend.");
        this.updateChatbotState(greetingMessage);
    }

    handleStarting = (element, visitorId) => {
        const clientMessage = this.createClientMessage(element.innerText);
        const botMessage = this.createChatBotMessage(`What brought you here to check us out?`,{
            widget: "starting",
            withAvatar: true,
            delay: 500
        })

        if(clientMessage.message.length){
            this.updateChatbotState([clientMessage, botMessage], visitorId)
        }else{
            this.updateChatbotState([ botMessage], visitorId)
        }
    }

    handleINeedStorage = (element, visitorId) => {
        const clientMessage = this.createClientMessage(element.innerText);
        const botMessageOne = this.createChatBotMessage(
            `You came to the right place!`
        )
        const botMessageTwo = this.createChatBotMessage(
            `Can I help you get a free quote?`,{
            widget: "INeedStorage",
            withAvatar: true,
            delay: 500
        })

        if(clientMessage.message.length){
            this.updateChatbotState([clientMessage, botMessageOne, botMessageTwo], visitorId)
        }else{
            this.updateChatbotState([ botMessageOne, botMessageTwo], visitorId)
        }
    }

    handleINeedStorage_NoThankYou = (element, visitorId) => {
        const clientMessage = this.createClientMessage(element.innerText);
        const botMessage = this.createChatBotMessage(
            `Alright - if you have additional questions or would like more information, 
            drop your zip code and phone number in the form on this page. A rep will give you a call during 
            our business hours!`,{
                widget: "nevermind",
                withAvatar: true
            }
        )

        if(clientMessage.message.length){
            this.updateChatbotState([clientMessage, botMessage], visitorId)
        }else{
            this.updateChatbotState([ botMessage], visitorId)
        }
    }

    handleIWantToMakeMoney = (element, visitorId) => {
        const clientMessage = this.createClientMessage(element.innerText);
        const botMessageOne = this.createChatBotMessage(`You've come to the right place!`)
        const botMessageTwo = this.createChatBotMessage(`StoreNextDoor is the best choice for Storage Listers`,{
            widget: "IWantToMakeMoney",
            withAvatar: true,
            delay: 500
        });

        if(clientMessage.message.length){
            this.updateChatbotState([clientMessage, botMessageOne, botMessageTwo], visitorId)
        }else{
            this.updateChatbotState([ botMessageOne, botMessageTwo], visitorId)
        }
    }

    handleIHaveAnIssue = (element, visitorId) => {
        const clientMessage = this.createClientMessage(element.innerText);
        const botMessageOne = this.createChatBotMessage(`We're sorry to hear that.`);
        const botMessageTwo = this.createChatBotMessage(`Your happiness is our priority`,{
            widget: "IHaveAnIssue",
            withAvatar: true,
            delay: 500
        })

        if(clientMessage.message.length){
            this.updateChatbotState([clientMessage, botMessageOne, botMessageTwo], visitorId)
        }else{
            this.updateChatbotState([ botMessageOne, botMessageTwo], visitorId)
        }
    }

    handleContactOurLiveSupport = (element, visitorId) => {
        const clientMessage = this.createClientMessage(element.innerText);
        const botMessage = this.createChatBotMessage(`Someone will be here with you shortly. Thanks :)`);

        if(clientMessage.message.length){
            this.updateChatbotState([clientMessage, botMessage], visitorId)
        }else{
            this.updateChatbotState([ botMessage], visitorId)
        }
    }

    handleAnyoneSendBotMessage = (chatMessage, visitorId) => {
        this.updateChatbotState(chatMessage, visitorId);
    }

    handleUserMessage = async (chatMessage, visitorId) => {
        let message;
        this.setState(state => {
            message = state.messages.filter(mess => mess.message === chatMessage)
            return state
        })
        console.log(message)
        await visitingUsers(visitorId, message[0])
    }
}
  
export default ActionProvider;