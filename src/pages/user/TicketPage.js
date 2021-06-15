import { Button, Box, Card, CardContent, Container, Grid, makeStyles } from '@material-ui/core';
import React,{useContext, useState} from 'react'
import QRCode from 'react-qr-code'
import { useParams } from 'react-router';
import Address from '../../components/eventpage/Address';
import Organiser from '../../components/eventpage/Organiser';
import NotFound from '../../components/NotFound';
import { DataContext } from '../../context/Context';
import html2canvas from 'html2canvas';

const useStyles = makeStyles(theme => ({
    bgGrey: {
        backgroundColor: "#fafafa",
        minHeight: "90vh"
    },
    vpadding: {
        paddingTop: "30px",
        paddingBottom: "30px"
    },
    vmargin: {
        marginTop: "20px",
        marginBottom: "20px"
    },
    flex: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    textGrey: {
        color: theme.palette.grey[600]
    },
    textBlue: {
        color: theme.palette.primary.dark
    },
    button: {
        backgroundColor: theme.palette.success.main,//"#20232a",
        color: "white",
        "&:hover": {
            backgroundColor: theme.palette.success.dark,
            color: "white",
        }
    }
}));

function TicketPage(props) {
    const classes = useStyles()
    const {id} = useParams();
    const {ticketData} = useContext(DataContext);

    let tickets = null;
    let eventInfo=null;
    let date,time;

    if(ticketData!==null) {
        const data = ticketData.filter(item => (item.eventInfo._id === id))[0]
        tickets=data.tickets;
        eventInfo=data.eventInfo;
        date = new Date(eventInfo.eventDetails.dateAndTime).toDateString()
        time = new Date(eventInfo.eventDetails.dateAndTime)
            .toLocaleTimeString('en-US',{hour: 'numeric', hour12: true})
    }

    const downloadTicket = (ticketId) => e => {
        //TODO: make ticket downloadable
        console.log(ticketId)
        // html2canvas(document.querySelector(ticketId)).then(canvas => {
        //     document.body.appendChild(canvas);
        // })
    }

    return (
        <div className={`${classes.bgGrey} ${classes.vpadding}`}>
            <Container maxWidth="lg" >
                {
                   (tickets!==null && eventInfo!==null) ?
                   (<>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <Grid container spacing={2} direction="column">

                                    <Grid item >
                                        <Address address={eventInfo.eventAddress}/>
                                    </Grid>
                                    <Grid item>
                                        <Organiser organiserDetails={eventInfo.eventOrganiser}/>
                                    </Grid>                                    

                                </Grid>
                            </Grid> 

                            <Grid item xs={9}>
                                <h1>
                                    <span className={classes.textGrey}>Title: </span> 
                                    <span className={classes.textBlue}>
                                        {eventInfo.eventDetails.title}
                                    </span>
                                </h1>
                                <div>
                                    <span className={classes.textGrey}>Timing: </span>
                                    {date} at {time}  
                                </div>

                                <Grid container spacing={1} className={classes.vmargin}>
                                    {
                                        tickets.map((item) => {
                                            return (
                                                <Grid item key={item._id} xs={4}>
                                                    <Card variant="outlined" raised={false}>
                                                        <CardContent
                                                            className={classes.flex}
                                                        >
                                                            <Box id={"item_"+item._id} maxWidth="100%">
                                                                <QRCode value={item._id}/>
                                                                <h2 className={classes.textGrey}>
                                                                    Ticket ID:
                                                                </h2>
                                                                <div>
                                                                    {item._id}
                                                                </div>
                                                            </Box>
                                                            <br/>
                                                            <Button 
                                                                variant="contained"
                                                                onClick={downloadTicket("item_"+item._id)}
                                                                fullWidth
                                                                className={classes.button}
                                                            >
                                                                Download
                                                            </Button>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            )            
                                        })
                                    }
                                </Grid>
                            </Grid> 
                        </Grid>
                   </>):
                   (<>
                        <NotFound/>
                   </>)
                }
            </Container>
        </div>
    )
}

export default TicketPage
