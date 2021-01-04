import React,{ useState, useContext } from 'react'

import "./with-ring.css"
import { MainContext } from '../../../context/mainContext'

const WithRing = (WrappedComponent) => {
    const WithRing = (props) => {
        
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
            <WrappedComponent optionsMarkup={optionsMarkup} {...props} />
        )
    }

    return WithRing;
}

export default WithRing;