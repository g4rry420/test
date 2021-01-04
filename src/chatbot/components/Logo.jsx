import React from 'react'

import "./Logo.css"

export default function Logo() {
    return (
        <div className="logo-container">
            <img src={require("../assets/logo.png")} alt="Logo"/>
        </div>
    )
}
