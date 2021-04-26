import React,{useState} from 'react'
import { ComponentContext } from './Context'

function ComponentState(props) {
    //Controls snackbar feedback
    const [feedback, setFeedback] = useState({
        open: false,
        severity: "",
        message: ""
    });

    //Controls button feedback
    const [buttonDisabled,setButtonDisabled] = useState(false);
    const buttonFeedback = (ms) => {
        setButtonDisabled(true);
        const time = ms ?? 1500;
        setTimeout(() => {
            setButtonDisabled(false);
        }, time);
    }

    const value = {
        feedback,
        setFeedback,
        buttonDisabled,
        buttonFeedback
    }

    return (
        <ComponentContext.Provider value={value}>
            {props.children}
        </ComponentContext.Provider>
    )
}

export default ComponentState
