import { Container, Divider, Grid, makeStyles} from '@material-ui/core'
import { Pagination, PaginationItem } from '@material-ui/lab'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import EventCard from '../components/cards/EventCard'

const useStyles = makeStyles((theme) => ({
    grid: {
        margin: "35px auto"
    },
    pagination: {
        margin: "35px auto",
        "&.MuiPagination-root .Mui-selected": {
            color: "white",
            backgroundColor: "#20232a"
        }
    },
    divContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    }
}))

function BrowseEvents(props) {
    const classes = useStyles();
    const { search } = useLocation(); //Gets query parameters from the link
    // const history = useHistory();
    const [events,setEvents] = useState([]);
    const [pageData,setPageData] = useState({});
    const [load,setLoad] = useState(false);

    useEffect(() => {
        const endpoint = `/api/get-events${search}`;
        async function fetchEvents() {
            try {
                const res = await axios.get(endpoint);
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
    },[load])
    

    return (
        <Container maxWidth="lg" >
            <Grid container spacing={2} className={classes.grid}>
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

            <Divider variant="middle"/>

            <div className={classes.divContainer}>
                <Pagination 
                    className={classes.pagination}
                    count={pageData.totalPages}      
                    onChange={(e,page) => {
                        setLoad(load => !load);
                    }}
                    renderItem={(item) => (
                        <PaginationItem
                            component={Link}
                            to={`/browse?page=${item.page}`}
                            {...item}
                        />
                    )}
                    shape="rounded"
                    size="large"
                />
            </div>
        </Container>
    )
}

export default BrowseEvents
