import React from 'react'
import classes from "./Button.module.css"

function ErrorButton(props) {
    const {onClick,name,type,className} = props;
    const {button,error} = classes;
    return (
        <>
            <button type={type} onClick={onClick} className={`${button} ${error} ${className}`}>
                {name}
            </button>
        </>
    )
}

export default ErrorButton
