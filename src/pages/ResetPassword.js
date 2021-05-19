import { Box, Container, Paper, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react'
import { ValidatorForm } from 'react-material-ui-form-validator';
import jwt_decode from 'jwt-decode';
import Textbox from '../components/inputs/Textbox';
import useStyles from './FormStyle';
import { minSize, minSizeErr, reqErr,samePass,samePassErr } from '../helpers/validators';
import SubmitButton from '../components/buttons/SubmitButton';
import Copyright from '../components/Copyright';
import { ComponentContext } from '../context/Context';
import { resetPassword } from '../helpers/auth';

function ResetPassword({ match,history }) {
    try {
        jwt_decode(match.params.token);
    } catch (err) {
        history.replace('/')
    }

    //Hooks
    const { setFeedback,setButtonDisabled} = useContext(ComponentContext);
    const classes = useStyles();
    const [values,setValues] = useState({
        token: match.params.token,
        password: "",
        confirmPassword: ""
    })
    //Functions
    const handleChange = (e) => {
        setValues(values => ({
            ...values,
            [e.target.name]: e.target.value
        })
        );
    }
    const submitHandler = (e) => {
        e.preventDefault();

        //Handle Logic
        resetPassword(values,history,setFeedback,setButtonDisabled);
    }

    //Calling custom validation rule
    samePass(values.password);

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
                                Reset Password
                            </Typography>
                        </Container>

                        <Textbox
                            label="Enter New Password"
                            name="password"
                            autoFocus
                            value={values.password}
                            onChange={handleChange}
                            validators={['required', minSize(6)]}
                            errorMessages={[reqErr, minSizeErr("Password",6)]}
                        />
                        <Textbox
                            label="Re-Enter New Password"
                            name="confirmPassword"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            validators={['required','isSamePassword']}
                            errorMessages={[reqErr,samePassErr]}
                        />
                        <SubmitButton
                            className={classes.submit}
                            size="large"
                        >
                           Reset Password
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

export default ResetPassword
