import React from 'react'
import { Button, Container, Grid } from '@material-ui/core';
import useStyles from './Styles';
import Header from '../../components/eventpage/Header';
import Address from '../../components/eventpage/Address';
import Description from '../../components/eventpage/Description';
import { useHistory } from 'react-router';
import Attendants from '../../components/Attendants';


function EventInfoPage(props) {
    const {eventData,date,time,imgLink} = props.location.state;
    const {
        title,description,noOfPeople,
        genre,price,isFree,
        dateAndTime
    } = eventData.eventDetails;
    const {
        // eventOrganiser,
        eventAddress,
        createdBy,
        _id,
        totalTickets,bookedTickets
    } = eventData;

    const classes = useStyles();
    const history = useHistory();

    return (
        <div className={`${classes.bgColor} ${classes.pageHeight} ${classes.vpadding}`}>
            <Container maxWidth="lg" >

                <Grid container spacing={1}>

                    <Grid item xs={4}>
                        <Grid container direction="column" spacing={1}>
                            
                            <Grid item>
                               <Address 
                                    address={eventAddress}
                               /> 
                            </Grid>
                            <Grid item>
                                <Description description={description}/>
                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid item xs={8}>
                        <Header
                            title={title}
                            genre={genre}
                            duration="1 Hour"
                            date={date} 
                            time={time}
                            imgLink={imgLink}
                            noOfPeople={noOfPeople}
                            isFree={isFree}
                            price={price}
                            createdBy={createdBy}
                            eventId={_id}
                            totalTickets={totalTickets}
                            bookedTickets={bookedTickets}
                            dateAndTime={dateAndTime}
                        />            
                        <br/>
                        <Grid container direction="row" 
                            justify="space-between" alignItems="center"
                            className={classes.vmargin}
                        >
                            <Grid item>
                                <h2>All Bookings</h2>
                            </Grid>

                            <Grid item>
                                <Button 
                                    onClick={() => { 
                                        history.push(`/user/verifytickets/${_id}`) 
                                    }}
                                    variant="contained"
                                    className={classes.button}
                                >
                                    Entries
                                </Button>
                            </Grid>
                        </Grid>
                        <Attendants
                            load={true}
                            eventId={_id}
                            url={'/api/get-bookings'}
                            header={"Total Bookings: "}
                            actions={[]}
                        />
                    </Grid>
                </Grid>

            </Container>
        </div>
    )
}

export default EventInfoPage
