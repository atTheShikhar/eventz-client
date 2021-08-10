import { Card, CardContent, Container, Grid, MenuItem} from '@material-ui/core'
import React, { useContext, useState } from 'react'
import { ValidatorForm } from 'react-material-ui-form-validator';
import contactUsImg from '../assets/contact_us.svg';
import SubmitButton from '../components/buttons/SubmitButton';
import Textbox from '../components/inputs/Textbox';
import { regexText,textErr,reqErr,emailErr } from '../helpers/validators';
import {submitFormdata} from '../helpers/submitFormdata';
import useStyles from './FormStyle';
import { ComponentContext } from '../context/Context';
import { useHistory } from 'react-router';

function ContactUs(props) { 
    const msgTypeOptions = ["Feedback","Question"];
    const {setFeedback,setButtonDisabled} = useContext(ComponentContext);
    const history = useHistory()
    const classes = useStyles();
    const [formData,setFormData] = useState({
        messageType: msgTypeOptions[0],
        name: "",
        email: "",
        subject: "",
        message: ""
    })

    const changeHandler = name => e => {
        setFormData({
            ...formData,
            [name]: e.target.value
        })        
    }

    const submitHandler = e => {
        submitFormdata(
            formData,
            history,
            setFeedback,
            setButtonDisabled,
            "/api/contact-us",
            "/"
        )
    }

    return (
        <div className={classes.page}>
            <Container maxWidth="md">
                <Grid container spacing={2} className={classes.parent}>

                    <Grid item xs={12} md={6}>
                        <img className={classes.image} src={contactUsImg} alt="Message Box"/>
                    </Grid>

                    <Grid item xs={12} md={6}>

                        <Card>
                            <CardContent>
                                <h2 style={{textAlign: "center"}}>
                                    Contact Us
                                </h2>
                                <ValidatorForm instantValidate={true} onSubmit={submitHandler}>
                                    
                                    <Textbox
                                        select
                                        label="Message Type"
                                        name="messageType"
                                        value={formData.messageType}
                                        onChange={changeHandler("messageType")}
                                    >
                                        {msgTypeOptions.map(item => (
                                            <MenuItem value={item} key={item}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                    </Textbox>                                    

                                    <Textbox
                                        label="Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={changeHandler("name")}
                                        validators={['required',regexText]}
                                        errorMessages={[reqErr,textErr]}
                                    />

                                    <Textbox
                                        label="Email"
                                        name="email"
                                        value={formData.email}
                                        onChange={changeHandler("email")}
                                        validators={['required','isEmail']}
                                        errorMessages={[reqErr,emailErr]}
                                    />

                                    <Textbox
                                        label="Subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={changeHandler("subject")}
                                        validators={['required']}
                                        errorMessages={[reqErr]}
                                    />

                                    <Textbox
                                        multiline
                                        rows={5}
                                        label="Message"
                                        name="message"
                                        value={formData.message}
                                        onChange={changeHandler("message")}
                                        validators={['required']}
                                        errorMessages={[reqErr]}
                                    />

                                    <Grid container 
                                        direction="row"
                                        justify="flex-end"
                                    >
                                        <SubmitButton
                                            fullWidth={false}
                                        >
                                            Send
                                        </SubmitButton>
                                    </Grid>
                                </ValidatorForm>  
                            </CardContent>
                        </Card>

                    </Grid>
                </Grid>
            </Container> 
        </div>
    )
}

export default ContactUs
