import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode';
import { Button, Paper, Container, Divider, Typography } from '@material-ui/core';
import useStyles from './FormStyle';
import StatusAndRedirect from '../components/StatusAndRedirect';
import { activateAccount } from '../helpers/auth';


function Activate({match,history}) {
    //Hooks
    const classes = useStyles();
    const [formData,setFormData] = useState({
        name:"",
        token: "",
        show: "activate"
    });
    useEffect(() => {
        const token =  match.params.token;
        try {
            const decoded = jwt_decode(token);
            setFormData({
                ...formData,
                name: decoded.fname,
                token
            })
        } catch(err) {
            setFormData({
                ...formData,
                show: "failed"
            })
        }
    },[])
    //Functions 
    const confirmAccount = (e) => {
        e.preventDefault();
        //post handler
        activateAccount(formData,setFormData,history);
    }


    //Render Logic
    switch(formData.show) {
        case "activate": return (
            <div className={classes.page}>
                <Container maxWidth="sm">
                    <Paper className={classes.card}>
                        <Container className={classes.container}>
                            <Typography
                                variant="h4"
                                align="left"
                                color="textSecondary"
                            >
                                Welcome <span className={classes.primaryColor}>
                                    {formData.name}
                                </span>,
                            </Typography>
                        </Container>
                        <Container>
                            <Typography
                                align="left"
                                color="textSecondary"
                            >
                                Please click the button below to confirm your account.
                            </Typography>
                            <Divider variant="middle" />
                        </Container>
                        <Container className={classes.container}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="inherit"
                                onClick={confirmAccount}
                                size="large"
                                className={classes.submit}
                                style={{
                                    backgroundColor: "#20232a",
                                    color: "white"
                                }}
                            >
                                Confirm Account
                            </Button>
                        </Container>
                    </Paper>
                </Container>
            </div>
        )
        case "failed": return (
            <StatusAndRedirect 
                header="Activation Failed"
                message="Link expired or invalid link!"
                type="failed"
            />
        )
        case "success": return (
            <StatusAndRedirect 
                header="Activation Successful"
                message="Now you can login with your account!"
                type="success"
            />
        )
        case "already exists": return (
            <StatusAndRedirect
                header="Confirmed Already"
                message="Email already confirmed!"
                type="failed"
            />
        )
        default: return (<div></div>)
    }
}

export default Activate
