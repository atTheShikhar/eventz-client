import { Button, Box, Card, CardContent, Container, Grid, makeStyles, Chip } from '@material-ui/core';
import React,{useContext} from 'react'
import { useParams } from 'react-router';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';
import Address from '../../components/eventpage/Address';
import Organiser from '../../components/eventpage/Organiser';
import NotFound from '../../components/NotFound';
import { DataContext } from '../../context/Context';

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
    let date,time,expired;

    if(ticketData!==null) {
        const data = ticketData.filter(item => (item.eventInfo._id === id))[0]
        tickets=data.tickets;
        eventInfo=data.eventInfo;
        expired= new Date(eventInfo.eventDetails.dateAndTime) < new Date()
        date = new Date(eventInfo.eventDetails.dateAndTime).toDateString()
        time = new Date(eventInfo.eventDetails.dateAndTime)
            .toLocaleTimeString('en-US',{hour: 'numeric', hour12: true})
    }

    const downloadTicket = (ticketId) => async (e) => {
        try {

            const canvas = await html2canvas(document.querySelector(`#${ticketId}`))
            const pngUrl = canvas
                .toDataURL("image/png")
                .replace("image/png", "image/octet-stream");
            let downloadLink = document.createElement("a");
            downloadLink.href = pngUrl;
            downloadLink.download = `${ticketId}.png`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        } catch(e) {
            console.log(e);
        }
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
                                <Grid container direction="row" justify="space-between" alignItems="center">

                                    <Grid item>
                                        <h1>
                                        <span className={classes.textGrey}>Title: </span>
                                        <span className={classes.textBlue}>
                                            {eventInfo.eventDetails.title}
                                        </span>
                                        </h1>
                                    </Grid>

                                    <Grid item>
                                        <Chip
                                            label={
                                                (!expired) ?
                                                "Upcoming":
                                                "Expired"
                                            }
                                            color={
                                                (!expired) ?
                                                "primary":
                                                "secondary"
                                            }
                                        />
                                    </Grid>

                                </Grid>
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
                                                            <Box
                                                                id={"ticket_"+item.ticketId} 
                                                                style={{padding: "10px"}}
                                                                className={classes.flex}
                                                            >
                                                                <QRCode 
                                                                    value={item.ticketId}
                                                                    size={256}
                                                                    level={'H'}
                                                                    style={{padding: "10px"}}
                                                                />
                                                                <h2 className={classes.textGrey}>
                                                                    Ticket ID:{" "}
                                                                    <span style={{
                                                                        fontWeight: "normal"
                                                                    }}>
                                                                        {item.ticketId}
                                                                    </span>
                                                                </h2>

                                                                <Chip
                                                                    label={
                                                                        item.availed === "No"? 
                                                                        "Not availed":
                                                                        "Availed"
                                                                    }
                                                                    color={
                                                                        item.availed === "No"?
                                                                        "primary": "secondary"
                                                                    } 
                                                                    size="small"
                                                                />
                                                            </Box>

                                                            <Button 
                                                                variant="contained"
                                                                onClick={downloadTicket("ticket_"+item.ticketId)}
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
