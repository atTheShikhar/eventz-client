import React from 'react'
import useStyles from './Styles';
import {Card, CardContent, Container, Grid} from '@material-ui/core';
import UserCard from '../../components/cards/UserCard';

function PaymentDetailsPage(props) {
    const classes = useStyles();
    const data = props?.location?.state;
    console.log(data);

    return (
        <div className={`${classes.bgColor} ${classes.pageHeight} ${classes.vpadding}`}>
            <Container maxWidth="md">

                <Grid container direction="row" spacing={1}>
                    <Grid item xs={4}>
                        <Grid container direction="column">
                            <Grid item>
                                <UserCard
                                    classes={classes}
                                    imageLocation={data?.imageLocation}
                                    name={data?.name}
                                    email={data?.email}
                                    joinedOn={data?.joinedOn?.split(',')[0]}
                                />
                            </Grid>

                            <Grid item>

                            </Grid>
                        </Grid> 
                    </Grid>

                    <Grid item xs={8}>

                        <Card variant="outlined">

                            <CardContent>
                                <h1 className={classes.subHeadingText}>Payment Details</h1>

                                <div>
                                    
                                </div>
                            </CardContent>

                        </Card>

                    </Grid>
                </Grid>

            </Container>
        </div>
    )
}

export default PaymentDetailsPage
