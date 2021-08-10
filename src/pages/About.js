import React from 'react'
import {Divider, Container, Grid,Box} from '@material-ui/core';
import aboutUsImg from '../assets/about_us.svg'
import Copyright from '../components/Copyright'
import useStyles from './FormStyle';

function About() {
    const classes = useStyles();
    return (
        <div className={`${classes.page}`}>
            <Container maxWidth="md">
                <Grid container spacing={4} className={classes.parent}>
                    <Grid item xs={12} md={6}>
                        <img className={classes.image} src={aboutUsImg} alt="Man reading texts"/>
                    </Grid>

                    <Grid item xs={12} md={6} className={classes.content}>
                        <h1 className={classes.heading}>
                            About Us<span style={{ color: "#2e4390"}}>.</span>
                        </h1>

                        <Divider className={classes.vmargin} variant="middle"/>

                        <p className={classes.para}>
                            <strong style={{ color: "#2e4390"}}>Eventz</strong> is an event management webapp built specifically
                           for creating and booking professional events 
                           like Seminars, Conferences, Workshops etc.
                           <br/>
                           <br/>
                           Organisers can give us their event details and we handle the 
                           tickets generation/verification, attendant information, revenue, etc. for them. 
                           We believe that organisers should not be charged for 
                           events that they are organising for free. Our service only charges you 
                           for the events that are paid, free events are managed for free.
                           <br/>
                           <br/>
                           People can search events based on their interests and book tickets without any hassle.
                           Tickets are in the form of QR code that can be scanned at the event venue entry.
                        </p>
                    </Grid>
                </Grid>
                <Box mt={7}>
                    <Copyright />
                </Box>
            </Container>
        </div>
    )
}

export default About
