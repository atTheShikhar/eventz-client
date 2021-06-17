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

    //Controls dialog box 
    const [dialog,setDialog] = useState({
        open: false,
        title: "",
        message: "",
        actionYes: () => {},
        actionNo: () => {}  
    });

    const [load,setLoad] = useState(false);

    const value = {
        feedback,setFeedback,
        buttonDisabled,setButtonDisabled,
        load,setLoad,
        dialog,setDialog
    }

    return (
        <ComponentContext.Provider value={value}>
            {props.children}
        </ComponentContext.Provider>
    )
}

export default ComponentState
