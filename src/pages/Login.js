import React, { useContext, useState } from 'react';
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

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import SubmitButton from '../components/buttons/SubmitButton';
import Copyright from '../components/Copyright';
import useStyles from './FormStyle';
import Textbox from '../components/Inputs/Textbox'
import { ValidatorForm } from 'react-material-ui-form-validator'
import {login} from '../helpers/auth';
import {reqErr,emailErr, minSize,minSizeErr} from '../helpers/validators';
import { useHistory } from 'react-router';
import GenericSnackbar from '../components/feedback/snackbar';
import { UserContext } from '../UserContext';

export default function Login() {
    //Hooks
    const {setUser} = useContext(UserContext); 
    const classes = useStyles();
    const history = useHistory();
    const [values,setValues] = useState({
        email: "",
        password: ""
    });
    const [passwordState,setPasswordState] = useState("password")
    const [isDisabled, setIsDisabled] = useState(false);
    const [feedback,setFeedback] = useState({
        open: false,
        severity: "",
        message: ""
    });

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

        const timeout = setTimeout(() => {
            setIsDisabled(false);
        }, 1500);
        
        login(values,history,setUser,setFeedback,timeout);
    }
    //Wrapper function to set the open value from the snackbar component
    const setOpen = (isOpen) => {
        setFeedback(feedback => ({
            ...feedback,
            open: isOpen
        }))
    }

    //Render Logic
    return (
        <div className={classes.page}>

        {/*This component is for feedback*/}
        <GenericSnackbar 
            message={feedback.message}
            severity={feedback.severity}
            open={feedback.open}
            setOpen={setOpen}
        />

        <Container component="main" maxWidth="xs">
            <Paper className={classes.card}>
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
                        validators={['required',minSize(6)]}
                        errorMessages={[reqErr,minSizeErr("Password",6)]}
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

                    <Link href="" variant="body2" onClick={() => {
                        history.push('/user/forgetpassword');
                    }}>
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
            </Paper>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
        </div>
    );
}