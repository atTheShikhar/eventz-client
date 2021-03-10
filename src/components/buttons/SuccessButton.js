import React from 'react'
import classes from "./Button.module.css"

function SuccessButton(props) {
    const { onClick, name, type, className} = props;
    const {button,success} = classes;
    return (
        <>
            <button type={type} onClick={onClick} className={`${button} ${success} ${className}`}>
                {name}
            </button>
        </>
    )
}

export default SuccessButton
