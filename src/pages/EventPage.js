import React from 'react'
import Header from '../components/eventpage/Header';
import Organiser from '../components/eventpage/Organiser';
import Description from '../components/eventpage/Description';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Address from '../components/eventpage/Address';

const useStyles = makeStyles(theme => ({
    container: {
        padding: "30px 8px"
    },
    bgGrey: {
        backgroundColor: "#fafafa"
    }
}))
function EventPage(props) {
    const classes = useStyles();
    const { eventData,date,time,imgLink }= props.location.state;

    const {
        title,
        description,
        noOfPeople,
        genre,
        price,
        isFree,
        dateAndTime
    } = eventData.eventDetails;

    const {
        eventOrganiser,
        eventAddress,
        createdBy,
        _id,
        totalTickets,bookedTickets
    } = eventData;

    return (
        <div className={classes.bgGrey}>
        <Container maxWidth="md" className={classes.container}>
            <Grid container spacing={2}>
                <Grid item md={12} xs={12}>
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
                </Grid>
                <Grid item md={6} sm={6} xs={12}>
                    <Organiser
                        organiserDetails={eventOrganiser}
                    />
                </Grid>
                <Grid item md={6} sm={6} xs={12}>
                    <Address
                        address={eventAddress}
                    />
                </Grid>
                <Grid item md={12} sm={12} xs={12}>
                    <Description
                        description={description}
                    />
                </Grid>
            </Grid>
        </Container>
        </div>
    )
}

export default EventPage
