import React, { useEffect, useState } from 'react'
import { Container, Typography, Card } from '@material-ui/core';
import useStyles from '../pages/FormStyle';
import { useHistory } from 'react-router-dom';

function StatusAndRedirect(props) {
    //Hooks
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

    //Attributes
    const { header, message, type } = props;
    let headerColor, bgColor;
    if (type === "failed") {
        headerColor = classes.errorColor;
        bgColor = classes.errorBg;
    } else if(type === "success") {
        headerColor = classes.successColor;
        bgColor = classes.successBg;
    } else {
        headerColor = "";
        bgColor = "";
    }

    //Render Logic
    return (
        <div className={classes.page}>
            <Container maxWidth="sm">
                <Card className={`${classes.card} ${bgColor}`}>
                    <Container className={classes.container}>
                        <Typography
                            variant="h4"
                            align="center"
                            className={headerColor}
                        >
                            {header}
                        </Typography>
                    </Container>
                    <Container className={classes.container}>
                        <Typography
                            align="center"
                            color="textPrimary"
                        >
                            {message}
                        </Typography>
                        <br/>
                        <Typography
                            align="center"
                            color="textPrimary"
                            variant="subtitle2"
                        >
                            Redirecting to Homepage in {seconds} seconds...
                        </Typography>
                    </Container>
                </Card>
            </Container>
        </div >
    )
}

export default StatusAndRedirect;
