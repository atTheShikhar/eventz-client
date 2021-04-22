import React, { useState } from 'react';
import { useHistory } from 'react-router';
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

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import SubmitButton from '../components/buttons/SubmitButton';
import Copyright from '../components/Copyright';
import useStyles from './FormStyle';
import Textbox from '../components/Inputs/Textbox'
// import GenericSnackbar from '../components/feedback/snackbar'
import { ValidatorForm } from 'react-material-ui-form-validator'
import {login} from '../helpers/auth';
import {reqErr,emailErr} from '../helpers/validators';

export default function Login() {

    //Hooks
    const classes = useStyles();
    const history = useHistory();
    const [values,setValues] = useState({
        email: "",
        password: ""
    });
    const [passwordState,setPasswordState] = useState("password")
    const [isDisabled, setIsDisabled] = useState(false);

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
        if(e.target.checked) {
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

        login(values.email,values.password)
            .then(res => {
                switch(res?.status) {
                    case 401: {
                        console.log(res.data.error);
                        break;
                    }
                    case 400: {
                        console.log(res.data.validationError);
                        break;
                    }
                    default: {
                        if(res === undefined ) {
                            console.log("Error Connecting to network!");
                        } else {
                            console.log(res.data.message);
                        }
                    }
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    //Render Logic
    return (
        <div className={classes.page}>
        <Container component="main" maxWidth="xs">
            <div className={classes.card}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log In
                </Typography>
                
                    <ValidatorForm 
                        className={classes.form} 
                        onSubmit={handleSubmit}
                        instantValidate={true}
                    >
                    <Textbox
                        label="Email Address"
                        name="email"
                        autoFocus
                        value={values.email}
                        onChange={handleChange}
                        validators={['required', 'isEmail']}
                        errorMessages={[reqErr,emailErr]}
                    />
                    <Textbox
                        name="password"
                        label="Password"
                        type={passwordState}
                        value={values.password}
                        onChange={handleChange}
                        validators={['required']}
                        errorMessages={[reqErr]}
                    />
                    
                    <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox color="primary" onChange={handleShowPassword} 
                                />
                            }
                            label="Show / Hide"
                            style={{color: "grey"}}
                        />
                    </Grid>

                    <Link href="#" variant="body2">
                        Forgot password?
                    </Link>
                    
                    <SubmitButton
                        className={classes.submit}   
                        disabled={isDisabled} 
                    >
                        Log In
                    </SubmitButton>

                    <Grid container direction="column">
                        
                        <Grid item>
                            <span style={{
                                color: "grey",
                                paddingRight: "8px"
                            }}>
                                Don't have an account?
                            </span>

                            <Link 
                                href="" 
                                variant="body2"
                                onClick={() => {
                                    history.push('/Register')
                                }}
                            >
                                Sign Up
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