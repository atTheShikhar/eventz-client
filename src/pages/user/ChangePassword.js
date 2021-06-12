import { Box, Container, Paper, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react'
import { ValidatorForm } from 'react-material-ui-form-validator';
import Textbox from '../../components/inputs/Textbox';
import useStyles from '../FormStyle';
import { minSize, minSizeErr, reqErr,samePass,samePassErr } from '../../helpers/validators';
import SubmitButton from '../../components/buttons/SubmitButton';
import Copyright from '../../components/Copyright';
import { ComponentContext } from '../../context/Context';
import { changePassword } from '../../helpers/auth';

function ChangePassword({ history }) {

    //Hooks
    const { setFeedback,setButtonDisabled} = useContext(ComponentContext);
    const classes = useStyles();
    const [values,setValues] = useState({
	oldPassword: "",
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
        changePassword(values,history,setFeedback,setButtonDisabled);
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
                                Change Password
                            </Typography>
                        </Container>

                        <Textbox
                            label="Enter Old Password"
                            name="oldPassword"
							autoFocus
                            value={values.oldPassword}
                            onChange={handleChange}
                            validators={['required', minSize(6)]}
                            errorMessages={[reqErr, minSizeErr("Password",6)]}
                        />

                        <Textbox
                            label="Enter New Password"
                            name="password"
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

export default ChangePassword;
