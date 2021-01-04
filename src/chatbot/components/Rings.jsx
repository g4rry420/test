import React from 'react'

import "./Rings.css"
import WithRing from "./reusable/with-ring"

function Rings(props) {
    return (
        <div className="learning-options-container">{props.optionsMarkup}</div>
    )
}

export default WithRing(Rings)