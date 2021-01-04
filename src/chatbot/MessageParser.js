import { fingerprintjs } from "../context/visitorId"

class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
    
    async parse(message) {
      //.replace(/\s/g, "") - To remove white space between the words
      const lowerCaseMessage = message.replace(/\s/g, "").toLowerCase();
      const element = { innerText: "" };

      fingerprintjs().then(data => {
        this.actionProvider.handleUserMessage(message, data)
      })
 
      if(lowerCaseMessage.includes("hello")) {
          this.actionProvider.greet();
      }

      if(lowerCaseMessage.includes("ineedstorage")){
        this.actionProvider.handleINeedStorage(element)
      }

      if(lowerCaseMessage.includes("no,thankyou") || lowerCaseMessage.includes("nothankyou")){
        this.actionProvider.handleINeedStorage_NoThankYou(element)
      }

      if(lowerCaseMessage.includes("iwanttomakemoney")){
        this.actionProvider.handleIWantToMakeMoney(element)
      }

      if(lowerCaseMessage.includes("ihaveanissue")){
        this.actionProvider.handleIHaveAnIssue();
      }

      if(lowerCaseMessage.includes("contactourlivesupport")) {
        this.actionProvider.handleContactOurLiveSupport(element)
      }

      if(lowerCaseMessage.includes("nevermind")){
        this.actionProvider.handleStarting(element)
      }
    }
}

export default MessageParser;