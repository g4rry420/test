import React,{ useState, useContext } from 'react'
import { MainContext } from '../../context/mainContext'

import "./Starting.css"

export default function Starting(props) {
    const { visitorId } = useContext(MainContext)
    const [options, setOptions] = useState([...props.state])

    const optionsMarkup = options && options.map((option) => (
        <button id={option.id} className="learning-option-button" key={option.id} onClick={(e) => {
            setOptions([]);
            return option.handler(e.target, visitorId);
        }}>
            {option.text}
        </button>
    ));

    return (
        <div className="learning-options-container">{optionsMarkup}</div>
    )
}
