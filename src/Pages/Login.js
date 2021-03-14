import React, { useState } from 'react';
import {
    Avatar,
    Button,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Box,
    Typography,
    Container
} from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Copyright from '../components/Copyright';
import useStyles from './FormStyle';
import Textbox from '../components/Inputs/Textbox'
// import GenericSnackbar from '../components/feedback/snackbar'
import { ValidatorForm } from 'react-material-ui-form-validator'
import {login} from '../helpers/auth';


export default function Login() {
    const classes = useStyles();

    const [values,setValues] = useState({
        email: "",
        password: ""
    });
    const [passwordState,setPasswordState] = useState("password")

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

        login(values.email,values.password)
            .then(res => {
                switch(res.status) {
                    case 401: {
                        console.log(res.data.error);
                        break;
                    }
                    case 400: {
                        console.log(res.data.validationError);
                        break;
                    }
                    default: {
                        console.log(res.data.message);
                        
                    }
                }
            })
    }

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
                <ValidatorForm className={classes.form} onSubmit={handleSubmit}>
                    <Textbox
                        label="Email Address"
                        name="email"
                        autoFocus
                        value={values.email}
                        onChange={handleChange}
                        validators={['required', 'isEmail']}
                        errorMessages={['this field is required', 'email is not valid']}
                    />
                    <Textbox
                        name="password"
                        label="Password"
                        type={passwordState}
                        value={values.password}
                        onChange={handleChange}
                        validators={['required']}
                        errorMessages={['this field is required']}
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
                    
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}    
                    >
                        Log In
                    </Button>

                    <Grid container direction="column">
                        
                        <Grid item>
                            <span style={{
                                color: "grey",
                                paddingRight: "8px"
                            }}>
                                Don't have an account?
                            </span>

                            <Link href="#" variant="body2">
                                {"Sign Up"}
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