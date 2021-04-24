import { Box, Container, Paper, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { ValidatorForm } from 'react-material-ui-form-validator';
import Textbox from '../components/Inputs/Textbox';
import useStyles from './FormStyle';
import {reqErr,emailErr} from '../helpers/validators';
import SubmitButton from '../components/buttons/SubmitButton';
import Copyright from '../components/Copyright';

function ForgetPassword() {
    const classes = useStyles();
    const [email,setEmail] = useState("");
    const [isDisabled,setIsDisabled] = useState(false);

    const handleChange = (e) => {
        setEmail(e.target.value);
    }
    const submitHandler = (e) => {
        e.preventDefault();

        setIsDisabled(true);
        setTimeout(() => {
            setIsDisabled(false);
        }, 1500);

        //Handle Logic
        console.log(email);
    } 

    return (
        <div className={classes.page}>
            <Container maxWidth="xs" className={classes.container}>
                <Paper className={classes.card}>
                    <ValidatorForm 
                        onSubmit={submitHandler}
                        instantValidate
                        className={classes.form}
                    >
                        <Container className={classes.container}>
                            <Typography
                                align="center"
                                color="primary"
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
                            disabled={isDisabled}
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
