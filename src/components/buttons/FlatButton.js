import React from 'react'
import classes from "./Button.module.css"

function FlatButton(props) {
    const {onClick, name, type,className} = props;
    const {button,flat} = classes;
    return (
        <>
            <button type={type} onClick={onClick} className={`${button} ${flat} ${className}`}>
                {name}
            </button>
        </>
    )
}

export default FlatButton
