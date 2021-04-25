import { Box, Container, Paper, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { ValidatorForm } from 'react-material-ui-form-validator';
import Textbox from '../components/Inputs/Textbox';
import useStyles from './FormStyle';
import { minSize, minSizeErr, reqErr,samePass,samePassErr } from '../helpers/validators';
import SubmitButton from '../components/buttons/SubmitButton';
import Copyright from '../components/Copyright';

function ResetPassword() {

    //Hooks
    const classes = useStyles();
    const [values,setValues] = useState({
        password: "",
        confirmPassword: ""
    });
    const [isDisabled, setIsDisabled] = useState(false);

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

        setIsDisabled(true);
        setTimeout(() => {
            setIsDisabled(false);
        }, 1500);

        //Handle Logic
        console.log(values);
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
                                color="primary"
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
                            disabled={isDisabled}
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
