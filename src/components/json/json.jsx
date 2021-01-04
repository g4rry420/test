import React, {useRef, useState} from 'react'
import "./json.css"

export default function JSon() {

    const [jsonTextarea, setJsonTextarea] = useState("");

    const errorButton = useRef();
    const textareaRef = useRef();
    const resultRefContainer = useRef();
  
    const handleJsonTextarea = (e) => {
      setJsonTextarea(e.target.value);
    }
  
    const handleButton = () => {
  
      let str = jsonTextarea;
      
  
      try {
        JSON.parse(str);
        console.log("SUcesss")
      } catch (error) {
        errorButton.current.innerHTML = `Looks like something's not right: <br/> ${error}`;
  
        const number =  error.message.slice(error.message.indexOf("line") + 4, error.message.indexOf("line") + 7);
        let lineNumber = selectTextareaLine(textareaRef.current, parseInt(number))
      }
      // str = JSON.stringify(JSON.parse(str), null, 4);
      // let pre = document.createElement("pre");
      // pre.textContent = str;
      // errorButton.current.appendChild(pre);
    }
  
    const selectTextareaLine = (tarea,lineNum) => {
      lineNum--; // array starts at 0
      let lines = tarea.value.split("\n");
  
  
      // calculate start/end
      let startPos = 0, endPos = tarea.value.length;
      let mainPos = 0;
      for(let x = 0; x < lines.length; x++) {
          if(x === lineNum) {
            mainPos += x;
              break;
          }
          startPos += (lines[x].length + 1);
  
      }
  
      endPos = lines[lineNum].length + startPos;
  
      // do selection
      // Chrome / Firefox
  
      if(typeof(tarea.selectionStart) !== "undefined") {
          tarea.focus();
          tarea.selectionStart = startPos;
          tarea.selectionEnd = tarea.textLength;
  
          let selected = tarea.value.slice(tarea.selectionStart, tarea.selectionEnd)
          let notSelected = tarea.value.slice(0, tarea.selectionStart - 1)
  
          let notSelectedTextNode = document.createTextNode(notSelected);
          let selectedTextNode = document.createTextNode(selected);
  
          // let preContainer = document.createElement("pre");
          // let preChild = document.createElement("pre");
          // preContainer.classList.add("resultP");
  
          // preContainer.appendChild(notSelectedTextNode);
          resultRefContainer.current.children[0].appendChild(selectedTextNode);
          resultRefContainer.current.appendChild(notSelectedTextNode);
  
          // preContainer.appendChild(preChild);
          // resultRefContainer.current.appendChild(preChild)
  
          // document.body.appendChild(preContainer)
  
          console.log(resultRefContainer.current)
  
  
          let range = new Range();
          // range.selectNodeContents(preChild);
  
          range.setStart(resultRefContainer.current, 0)
          range.setEnd(resultRefContainer.current, 1);
  
          console.log(range)
  
          window.getSelection().removeAllRanges();
          window.getSelection().addRange(range)
  
  
      // IE
      if (document.selection && document.selection.createRange) {
          tarea.focus();
          tarea.select();
          let range = document.selection.createRange();
          range.collapse(true);
          range.moveEnd("character", endPos);
          range.moveStart("character", startPos);
          range.select();
          return true;
      }
    }
  
    const copyText = () => {
      let text = "";
      text = document.all ? document.selection.createRange().text : document.getSelection();
  
      console.log(text);
  
    }
  
    // document.onselectionchange = () => {
    //   let selection = document.getSelection();
  
    // // Clone DOM nodes from ranges (we support multiselect here)
    //   for (let i = 0; i < selection.rangeCount; i++) {
    //     textareaResultRef.current.append(selection.getRangeAt(i).cloneContents());
  
    //     console.log(selection.getRangeAt(i).cloneContents())
    //   }
      
    //   textareaResultRef.current.innerHTML += selection;
        
          
    // }
  
  
    tarea.classList.add("red-color-selection")
    return true;
  }

    return (
        <div className="main-container">
            <textarea ref={textareaRef} className="red-color-selection" onChange={handleJsonTextarea} autoCapitalize="off" autoCorrect="off" spellCheck={false} value={jsonTextarea} col="10" placeholder="{}"></textarea>
            <button type="button" onClick={handleButton}>Process</button>
            <div onClick={handleButton} ref={errorButton}></div>
            
            <pre ref={resultRefContainer} className="resultP">
            <pre></pre>
            </pre>

    </div>
    )
}
