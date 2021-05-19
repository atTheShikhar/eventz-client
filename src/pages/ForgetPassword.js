import { Box, Container, Paper, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react'
import { ValidatorForm } from 'react-material-ui-form-validator';
import Textbox from '../components/inputs/Textbox';
import useStyles from './FormStyle';
import {reqErr,emailErr} from '../helpers/validators';
import SubmitButton from '../components/buttons/SubmitButton';
import Copyright from '../components/Copyright';
import { ComponentContext } from '../context/Context';
import { forgetPassword } from '../helpers/auth';

function ForgetPassword({ history }) {
    const { setFeedback,setButtonDisabled } = useContext(ComponentContext);
    const classes = useStyles();
    const [email,setEmail] = useState("");

    const handleChange = (e) => {
        setEmail(e.target.value);
    }
    const submitHandler = (e) => {
        e.preventDefault();

        //Handle Logic
        forgetPassword(email,history,setFeedback,setButtonDisabled);
    } 

    return (
        <div className={classes.page}>
            <Container maxWidth="xs">
                <Paper className={classes.card}>
                    <ValidatorForm 
                        onSubmit={submitHandler}
                        instantValidate
                        className={classes.form}
                    >
                        <Container className={classes.container}>
                            <Typography
                                align="center"
                                color="textPrimary"
                                variant="h5"
                            >
                                Forget Password
                            </Typography>
                        </Container>

                        <Textbox
                            label="Email Address"
                            name="email"
                            autoFocus
                            value={email}
                            onChange={handleChange}
                            validators={['required', 'isEmail']}
                            errorMessages={[reqErr, emailErr]}
                        />
                        <SubmitButton
                            className={classes.submit}
                            size="large"
                        >
                            Send Reset Link
                        </SubmitButton>
                    </ValidatorForm>
                </Paper>
                <Box mt={2}>
                    <Copyright />
                </Box>
            </Container>
        </div>
    )
}

export default ForgetPassword
