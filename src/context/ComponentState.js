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
    

    const value = {
        feedback,
        setFeedback,
        buttonDisabled,
        setButtonDisabled
    }

    return (
        <ComponentContext.Provider value={value}>
            {props.children}
        </ComponentContext.Provider>
    )
}

export default ComponentState
