import React, { useEffect, useState } from 'react'
import { Container, Typography, Card } from '@material-ui/core';
import useStyles from '../pages/FormStyle';
import { useHistory } from 'react-router-dom';
function ActivationFailed() {
    const classes = useStyles();
    const history = useHistory();

    const [seconds,setSeconds] = useState(5);
    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((seconds) => seconds - 1)
        }, 1000);

        setTimeout(() => {
            clearInterval(interval);
            history.push('/');
        },5000);
    },[])

    return (
        <div className={classes.page}>
            <Container maxWidth="sm">
                <Card className={classes.card}>
                    <Container className={classes.container}>
                        <Typography
                            variant="h4"
                            align="center"
                            color="textSecondary"
                        >
                            Activation <span style={{ color: "green" }}>Successful</span>,
                        </Typography>
                    </Container>
                    <Container className={classes.container}>
                        <Typography
                            align="center"
                            color="textSecondary"
                        >
                            Redirecting to Homepage in {seconds} seconds...
                        </Typography>
                    </Container>
                </Card>
            </Container>
        </div >
    )
}

export default ActivationFailed
