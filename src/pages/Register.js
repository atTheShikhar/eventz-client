import React, { useState } from 'react';
import {
    Avatar,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Box,
    Typography,
    Container,
    Paper
} from '@material-ui/core';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GenericSnackbar from '../components/feedback/snackbar';
import Copyright from '../components/Copyright';
import Textbox from '../components/Inputs/Textbox';
import SubmitButton from '../components/buttons/SubmitButton'
import useStyles from './FormStyle';
import { ValidatorForm } from 'react-material-ui-form-validator';
import {register} from '../helpers/auth';
import { reqErr, emailErr, 
    regexText, textErr,
    minSize, minSizeErr,
    samePass, samePassErr } from '../helpers/validators';
import { useHistory } from 'react-router';

export default function Register(props) {
    
    //Hooks
    const classes = useStyles();
    const history = useHistory();
    const [values, setValues] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [passwordState, setPasswordState] = useState("password")
    const [isDisabled, setIsDisabled] = useState(false);
    const [feedback, setFeedback] = useState({
        open: false,
        severity: "",
        message: ""
    });

    //Functions
    const handleChange = (e) => {
        setValues(
            values => ({
                ...values,
                [e.target.name]: e.target.value
            })
        )
    }
    const handleShowPassword = e => {
        if (e.target.checked) {
            setPasswordState("text");
        } else {
            setPasswordState("password")
        }
    }
    //Wrapper function to set the open value from the snackbar component
    const setOpen = (isOpen) => {
        setFeedback(feedback => ({
            ...feedback,
            open: isOpen
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        
        setIsDisabled(true);
        setTimeout(() => {
            setIsDisabled(false);
        }, 1500);

        register(values,history,setFeedback);
    }

    //Calling custom validation rule
    samePass(values.password);

    //Render Logic
    return (
        <div className={classes.page}>
            <GenericSnackbar
                message={feedback.message}
                severity={feedback.severity}
                open={feedback.open}
                setOpen={setOpen}
            />
            <Container component="main" maxWidth="xs">
                <Paper className={classes.card}>
                    <Avatar className={classes.avatar}>
                        <AccountCircleIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <ValidatorForm 
                        className={classes.form} 
                        onSubmit={handleSubmit} 
                        instantValidate={true}
                    >
                        <Textbox 
                            label="First Name"
                            name="fname"
                            autoFocus
                            value={values.fname}
                            onChange={handleChange}
                            validators={['required', regexText]}
                            errorMessages={[reqErr,textErr]}
                        />
                        <Textbox
                            label="Last Name"
                            name="lname"
                            required={false}
                            value={values.lname}
                            onChange={handleChange}
                            validators={[regexText]}
                            errorMessages={[textErr]}
                        />
                        <Textbox
                            label="Email Address"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            validators={['required','isEmail']}
                            errorMessages={[reqErr,emailErr]}
                        />
                        <Textbox
                            label="Password"
                            name="password"
                            type={passwordState}
                            value={values.password}
                            onChange={handleChange}
                            validators={['required',minSize(6)]}
                            errorMessages={[reqErr,minSizeErr("Password",6)]}
                        />
                        <Textbox
                            label="Confirm Password"
                            name="confirmPassword"
                            type={passwordState}
                            value={values.confirmPassword}
                            onChange={handleChange}
                            validators={['required','isSamePassword']}
                            errorMessages={[reqErr,samePassErr]}
                        />

                        <Grid item>
                            <FormControlLabel
                                control={
                                    <Checkbox color="primary" onChange={handleShowPassword}
                                    />
                                }
                                label="Show / Hide"
                                style={{ color: "grey" }}
                            />
                        </Grid>

                        <SubmitButton
                            className={classes.submit}
                            disabled={isDisabled}
                        >
                            Sign Up
                        </SubmitButton>

                        <Grid container direction="column">

                            <Grid item>
                                <span style={{
                                    color: "grey",
                                    paddingRight: "8px"
                                }}>
                                    Already have an account?
                                </span>

                                <Link 
                                    href="" 
                                    onClick={() => {
                                        history.push('/Login')
                                    }} 
                                    variant="body2"
                                >
                                    Log In
                                </Link>
                            </Grid>
                        </Grid>
                    </ValidatorForm>
                </Paper>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
        </div>
    );
}