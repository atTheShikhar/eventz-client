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
import { ComponentContext, UserContext } from '../context/Context';

export default function Login() {
    //Hooks
    const {setUser} = useContext(UserContext); 
    const {setFeedback,buttonFeedback} = useContext(ComponentContext);
    const classes = useStyles();
    const history = useHistory();
    const [values,setValues] = useState({
        email: "",
        password: ""
    });
    const [passwordState,setPasswordState] = useState("password")

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
        buttonFeedback();
        
        login(values,history,setUser,setFeedback);
    }

    //Render Logic
    return (
        <div className={classes.page}>
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

                    <Link 
                        variant="body2" 
                        onClick={() => {
                            history.push('/user/forgetpassword');
                        }}
                        className={classes.link}
                    >
                        Forgot password?
                    </Link>
                    
                    <SubmitButton
                        className={classes.submit}   
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
                                variant="body2"
                                onClick={() => {
                                    history.push('/Register')
                                }}
                                    className={classes.link}
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