import React,{useContext, useEffect} from 'react';
import { Container, Divider, Grid } from '@material-ui/core';
import useStyles from './Styles';
import { fetchDataAuth } from '../../helpers/fetchData';
import { ComponentContext, DataContext } from '../../context/Context';
import { useHistory } from 'react-router';
import TicketCard from '../../components/cards/TicketCard';
import NotFound from '../../components/NotFound';

export default function MyTickets(props) {
    const classes = useStyles();
    const {setFeedback} = useContext(ComponentContext);
    const {ticketData,setTicketData} = useContext(DataContext);
    const history = useHistory();

    useEffect(() => {
        const getTickets = async () => {
            const url = "/api/my-tickets"
            const data = await fetchDataAuth(url,setFeedback,history,null);
            //Format: [0: {tickets: [],eventInfo: {}}, 1: {tickets: [],eventInfo: {}}, 2 ...]
            setTicketData(data.ticketData); 
        }
        getTickets();
    },[]);
    
    return (
        <>
        <div className={`${classes.bgColor} ${classes.vpadding} ${classes.pageHeight}`}>
            <Container maxWidth="lg">
                <h1>My Bookings</h1>
            </Container>

            <Divider variant="middle" className={classes.vmargin}/>

            <Container maxWidth="md">

            <Grid container spacing={2}>
                {
                    (ticketData !== null && ticketData?.length !==0) ?
                    (<>
                        {
                            ticketData.map(ticketItem => {
                                const {_id,imageLocation,eventDetails } = ticketItem.eventInfo;
                                const noOfTickets = ticketItem.tickets.length;
                                return (
                                    <Grid item key={_id} xs={4}>
                                        <TicketCard 
                                            imageLocation={imageLocation}
                                            noOfTickets={noOfTickets} 
                                            title={eventDetails.title}
                                            isFree={eventDetails.isFree}
                                            price={parseInt(eventDetails.price)}
                                            dateAndTime={eventDetails.dateAndTime}
                                            eventId={_id}
                                        />
                                    </Grid>
                                )
                            })
                        }
                    </>) :
                    (<>
                        <NotFound/>
                    </>)
                }
            </Grid>

            </Container>
        </div>
        </>
    );
}
