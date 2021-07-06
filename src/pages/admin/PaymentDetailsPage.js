import React from 'react'
import useStyles from './Styles';
import {Button, Card, CardActions, CardContent, Chip, Container, Divider, Grid} from '@material-ui/core';
import UserCard from '../../components/cards/UserCard';
import { useHistory } from 'react-router';

function PaymentDetailsPage(props) {
    const classes = useStyles();
    const history = useHistory();    
    const data = props?.location?.state;
    console.log(data);

    const viewUser = () => {
        history.push(
            `/admin/user/${data.user_id}`,
        )                
    }

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
                                    actions={[
                                        {
                                            name: "More Info",
                                            clickHandler: viewUser
                                        }
                                    ]}
                                />
                            </Grid>

                            <Grid item>

                            </Grid>
                        </Grid> 
                    </Grid>

                    <Grid item xs={8}>

                        <Card variant="outlined">

                            <CardContent>
                                <Grid container direction="row" justify="space-between" alignItems="center">
                                    <h1 className={classes.subHeadingText}>Payment Details</h1>
                                    <Chip
                                        variant="outlined"
                                        color={data?.payment_status === "captured"? 
                                            "primary":
                                            "secondary"
                                        }
                                        label={data?.payment_status}        
                                    />
                                </Grid>
                                <Divider variant="middle" className={classes.vmargin}/>
                                
                                <Container className={
                                        `${classes.bgColor} ${classes.bodyText}`
                                    } 
                                    style={{
                                        borderRadius: "10px",
                                        padding: "15px"
                                    }}
                                >
                                    <div>
                                        <strong>Date and Time: </strong>
                                        <span>{data?.updated_at}</span>
                                    </div>
                                    <div>
                                        <strong>Event Title: </strong>
                                        <span>{data?.title}</span>
                                    </div>
                                    <div>
                                        <strong>Desciption: </strong>
                                        <span>{data?.description}</span>
                                    </div>
                                    <div>
                                        <strong>Receipt: </strong>
                                        <span>{data?.receipt}</span>
                                    </div>
                                    <div>
                                        <strong>Order Id: </strong>
                                        <span>{data?.order_id}</span>
                                    </div>
                                    <div>
                                        <strong>Payment Id: </strong>
                                        <span>{data?.payment_id}</span>
                                    </div>
                                    <div>
                                        <strong>Ticket Count: </strong>
                                        <span>{data?.ticket_count}</span>
                                    </div>
                                    <div>
                                        <strong>Currency: </strong>
                                        <span>{data?.currency}</span>
                                    </div>
                                    <div>
                                        <strong>Total Amount: </strong>
                                        <span>₹{data?.amount}</span>
                                    </div>
                                    <div>
                                        <strong>Amount Paid: </strong>
                                        <span>₹{data?.amount_paid}</span>
                                    </div>
                                    <div>
                                        <strong>Amount Due: </strong>
                                        <span>₹{data?.amount_due}</span>
                                    </div>
                                </Container>
                            </CardContent>
                            <Divider variant="middle"/>
                            <CardActions className={classes.flex}>
                                <Button 
                                    variant="contained"
                                    color="primary"
                                    disableElevation
                                    onClick={() => {
                                        history.push(`/admin/event/${data.event_id}`);
                                    }}
                                >
                                    View Event
                                </Button>
                            </CardActions>
                        </Card>

                    </Grid>
                </Grid>

            </Container>
        </div>
    )
}

export default PaymentDetailsPage
