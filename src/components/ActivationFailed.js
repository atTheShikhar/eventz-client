import React from 'react'
import {Container,Typography,Card} from '@material-ui/core';
import useStyles from '../pages/FormStyle';

function ActivationFailed() {
    const classes = useStyles();
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
                            Activation <span style={{ color: "red" }}>Failed</span>,
                        </Typography>
                    </Container>
                    <Container className={classes.container}>
                        <Typography
                            align="center"
                            color="textSecondary"
                        >
                            An Error Occured, Please try again!
                        </Typography>
                    </Container>
                </Card>
            </Container>
        </div >
    )
}

export default ActivationFailed
