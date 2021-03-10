import React from 'react'
import classes from "./Button.module.css"

function WarningButton(props) {
    const { onClick, name, type, className} = props;
    const {button,warn} = classes;
    return (
        <>
            <button type={type} onClick={onClick} className={`${button} ${warn} ${className}`}>
                {name}
            </button>
        </>
    )
}

export default WarningButton
