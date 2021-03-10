import React from 'react'
import classes from './Button.module.css'

function FilledButton(props) {
    const {onClick, name, type,className} = props;
    const {button,fill} = classes;
    return (
        <>
            <button type={type} onClick={onClick} className={`${button} ${fill} ${className}`}>
                {name}
            </button>  
        </>
    )
}

export default FilledButton
