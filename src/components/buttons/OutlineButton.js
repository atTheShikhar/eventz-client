import React from 'react'
import classes from "./Button.module.css"

function OutlineButton(props) {
    const { onClick, name, type,className} = props;
    const {button,outline} = classes;
    return (
        <>
            <button type={type} onClick={onClick} className={`${button} ${outline} ${className}`}>
                {name}
            </button>
        </>
    )
}

export default OutlineButton
