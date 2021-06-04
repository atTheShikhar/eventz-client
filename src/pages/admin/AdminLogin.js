import React,{useState,useContext} from 'react'
import {
    Avatar,
    FormControlLabel,
    Checkbox,
    Grid,
    Box,
    Typography,
    Container,
    Paper
} from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import SubmitButton from '../../components/buttons/SubmitButton';
import Copyright from '../../components/Copyright';
import useStyles from '../FormStyle';
import Textbox from '../../components/inputs/Textbox'
import { ValidatorForm } from 'react-material-ui-form-validator'
import {login} from '../../helpers/auth';
import {reqErr} from '../../helpers/validators';
import { useHistory } from 'react-router';
import { ComponentContext, UserContext } from '../../context/Context';

function AdminLogin(props) {
    //Hooks
    const {setUser} = useContext(UserContext); 
    const {setFeedback} = useContext(ComponentContext);
    const classes = useStyles();
    const history = useHistory();
    const [values,setValues] = useState({
        username: "",
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
        login(values,history,setUser,setFeedback,{hit: '/api/admin/login', redirect: "/admin/events"});
    }
    return (
        <div>
            <Container component="main" maxWidth="xs">
            <Paper className={classes.card}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Admin Log In
                </Typography>
                
                    <ValidatorForm 
                        className={classes.form} 
                        onSubmit={handleSubmit}
                        instantValidate={true}
                    >
                    <Textbox
                        label="Username"
                        name="username"
                        autoFocus
                        value={values.username}
                        onChange={handleChange}
                        validators={['required']}
                        errorMessages={[reqErr]}
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

                    <SubmitButton
                        className={classes.submit}   
                    >
                        Log In
                    </SubmitButton>
                </ValidatorForm>
            </Paper>
            <Box mt={5}>
                <Copyright />
            </Box>
            </Container>
        </div>
    )
}

export default AdminLogin
