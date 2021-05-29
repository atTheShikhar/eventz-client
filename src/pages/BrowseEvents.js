import { Container, Grid} from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EventCard from '../components/cards/EventCard'

function BrowseEvents(props) {

    const [events,setEvents] = useState([]);
    const [pageData,setPageData] = useState({});
    useEffect(() => {
        async function fetchEvents() {
            try {
                const res = await axios.get('/api/get-events');
                setEvents(res.data.events);
                setPageData({
                    currentPage: res.data.currentPage,
                    totalPages: res.data.totalPages,
                    eventCount: res.data.eventCount
            })
            } catch(e) {
                console.log(e);
            }
        }
        fetchEvents();
    },[])

    return (
        <Container maxWidth="lg" style={{margin: "50px auto"}}>
            <Grid container spacing={2}>
                {
                    events.map((item) => {
                        return (
                            <Grid 
                                key={item._id} 
                                item 
                                xs={12} 
                                sm={6} 
                                md={4} 
                            >
                                <EventCard
                                    heading={item.eventDetails.title}
                                    genre={item.eventDetails.genre}
                                    date={new Date(item.eventDetails.dateAndTime).toDateString()}
                                    time={new Date(item.eventDetails.dateAndTime).toLocaleTimeString()}
                                    address={item.eventAddress.stateName}
                                />
                            </Grid>
                        );
                    })
                }
            </Grid>
        </Container>
    )
}

export default BrowseEvents
