import { Card, CardContent, Container, Grid } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import { ValidatorForm } from 'react-material-ui-form-validator';
import SubmitButton from '../../components/buttons/SubmitButton';
import Textbox from '../../components/inputs/Textbox';
import { reqErr,emailErr } from '../../helpers/validators';
import {submitFormdata} from '../../helpers/submitFormdata';
import useStyles from './Styles';
import { ComponentContext } from '../../context/Context';
import { useHistory } from 'react-router';

function SendEmail(props) {
    const {setFeedback,setButtonDisabled} = useContext(ComponentContext);
    const history = useHistory()
    const classes = useStyles();
    const [formData,setFormData] = useState({
        email: "",
        subject: "",
        message: ""
    })

    const changeHandler = name => async e => {
        await setFormData(formData => ({
            ...formData,
            [name]: e.target.value
        }));
    }   

    const submitHandler = e => {
        submitFormdata(
            formData,
            history,
            setFeedback,
            setButtonDisabled,
            "/api/admin/send-email",
            null
        )
    }

    return (
        <div className={`${classes.bgColor} ${classes.pageHeight} ${classes.flex}`}>
            <Container maxWidth="sm">
                <Card>
                    <CardContent>
                        <h2 style={{textAlign: "center"}}>
                            Send Emails
                        </h2>
                        <ValidatorForm instantValidate={true} onSubmit={submitHandler}>
                            
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
                                rows={10}
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
                                    fullWidth={true}
                                    >
                                    Send Email
                                </SubmitButton>
                            </Grid>
                        </ValidatorForm>  
                    </CardContent>
                </Card>
            </Container>
        </div>
    )
}

export default SendEmail
