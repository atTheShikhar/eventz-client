import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { Button, Card, Container, Divider, Typography } from '@material-ui/core';
import useStyles from './FormStyle';
import ActivationFailed from '../components/ActivationFailed';
import ActivationSuccess from '../components/ActivationSuccess';

const baseUrl = process.env.REACT_APP_BASE_URL;

function Activate({match}) {
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
        axios.post(`${baseUrl}/api/activate`,{token:formData.token})
            .then((res) => {
                console.log(res);
                if(res.status === 200) {
                    setFormData({
                        ...formData,
                        show: "success"
                    })
                }
            })
            .catch((err) => {
                console.log(err);
                setFormData({
                    ...formData,
                    show: "failed"
                })
            });
    }

    //Render Logic
    switch(formData.show) {
        case "activate": return (
            <div className={classes.page}>
                <Container maxWidth="sm">
                    <Card className={classes.card}>
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
                                color="primary"
                                variant="contained"
                                onClick={confirmAccount}
                                size="large"
                                className={classes.submit}
                            >
                                Confirm Account
                            </Button>
                        </Container>
                    </Card>
                </Container>
            </div>
        )
        case "failed": return (<ActivationFailed />)
        case "success": return (<ActivationSuccess />)
        default: return (<div></div>)
    }
}

export default Activate
