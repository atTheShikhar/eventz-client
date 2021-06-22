import { Container, Divider, Grid, makeStyles} from '@material-ui/core'
import { Pagination, PaginationItem } from '@material-ui/lab'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import EventCard from '../components/cards/EventCard'
import NotFound from '../components/NotFound'
import { ComponentContext, DataContext } from '../context/Context'
import { fetchData } from '../helpers/fetchData'

const useStyles = makeStyles((theme) => ({
    bgGrey: {
        backgroundColor: "#fafafa"
    },
    vpadding: {
        paddingTop: "30px",
        paddingBottom: "30px"
    },
    vmargin: {
        marginTop: "30px",
        marginBottom: "30px"
    },
    pagination: {
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

    //Gets query parameters from the link
    //This just gets the page num, 
    //actual search query comes from passed state with history.push() by search button
    const { search } = useLocation(); 

    const {setFeedback,load,setLoad} = useContext(ComponentContext);
    const history = useHistory();
    const {events,setEvents} = useContext(DataContext);
    const [pageData,setPageData] = useState({});

    useEffect(() => {
        const url = `/api/get-events${search}`;
        async function fetchEvents() {
            const data = await fetchData(url,setFeedback,history);
            // console.log(data);
            setEvents(data.events);
            setPageData({
                currentPage: data.currentPage,
                totalPages: data.totalPages,
                eventCount: data.eventCount
            })
        }
        fetchEvents();
        return function() {
            setEvents(null);
        }
    },[load])

    return (
        <div className={classes.bgGrey}>
        <Container maxWidth="lg" className={classes.vpadding}>
            {
                (events!==null && events?.length !== 0) ? 
                (
                    <>
                        <Grid container spacing={2} >
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
                                                eventData={item}
                                                clickRoute={`/event/${item._id}`}
                                            />
                                        </Grid>
                                    );
                                })
                            }
                        </Grid>

                        <Divider variant="middle" className={classes.vmargin}/>

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
                    </>
                ) :
                (
                    <NotFound/>
                )
            }
        </Container>
        </div>
    )
}

export default BrowseEvents
