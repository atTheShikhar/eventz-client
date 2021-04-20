import React, { useState,useEffect } from 'react';
import {
    Avatar,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Box,
    Typography,
    Container
} from '@material-ui/core';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Copyright from '../components/Copyright';
import Textbox from '../components/Inputs/Textbox';
import SubmitButton from '../components/buttons/SubmitButton'
import useStyles from './FormStyle';
import { ValidatorForm } from 'react-material-ui-form-validator';
import {register} from '../helpers/auth';
import { useHistory } from 'react-router-dom';

export default function Register() {
    const reqMsg = "This field is required!";
    const nameMsg = "Invalid Name!";
    const emailMsg = "Invalid Email!";

    //Custom validation rule to rematch password 
    ValidatorForm.addValidationRule('isSamePassword', confirmPass => {
        if (confirmPass !== values.password) {
            return false;
        }
        return true;
    });

    //Hooks
    const history = useHistory();
    const classes = useStyles();
    const [values, setValues] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [passwordState, setPasswordState] = useState("password")
    const [isDisabled, setIsDisabled] = useState(false);
    useEffect(() => {
        return () => {
            ValidatorForm.removeValidationRule('isSamePassword');
        }
    },[]) 


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
    const handleSubmit = (e) => {
        e.preventDefault();
        
        setIsDisabled(true);
        setTimeout(() => {
            setIsDisabled(false);
        }, 1500);

        //TODO: Handle registration Logic
        register(values.fname,values.lname,values.email,values.password)
            .then(res => {
                switch(res?.status) {
                    default: {
                        if (res === undefined) {
                            console.log("Error Connecting to network!");
                        } else {
                            console.log(res.data.message);
                        }
                    }
                }
            })
            .catch(err => console.log(err))
    }

    //View Logic
    return (
        <div className={classes.page}>
            <Container component="main" maxWidth="xs">
                <div className={classes.card}>
                    <Avatar className={classes.avatar}>
                        <AccountCircleIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <ValidatorForm className={classes.form} onSubmit={handleSubmit}>
                        <Textbox 
                            label="First Name"
                            name="fname"
                            autoFocus
                            value={values.fname}
                            onChange={handleChange}
                            validators={['required', 'matchRegexp:^[a-zA-Z. ]+$']}
                            errorMessages={[reqMsg,nameMsg]}
                        />
                        <Textbox
                            label="Last Name"
                            name="lname"
                            required={false}
                            value={values.lname}
                            onChange={handleChange}
                            validators={['matchRegexp:^[a-zA-Z. ]+$']}
                            errorMessages={[nameMsg]}
                        />
                        <Textbox
                            label="Email Address"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            validators={['required','isEmail']}
                            errorMessages={[reqMsg,emailMsg]}
                        />
                        <Textbox
                            label="Password"
                            name="password"
                            type={passwordState}
                            value={values.password}
                            onChange={handleChange}
                            validators={['required']}
                            errorMessages={[reqMsg]}
                        />
                        <Textbox
                            label="Confirm Password"
                            name="confirmPassword"
                            type={passwordState}
                            value={values.confirmPassword}
                            onChange={handleChange}
                            validators={['required','isSamePassword']}
                            errorMessages={[reqMsg,'password mismatch']}
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
                </div>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
        </div>
    );
}