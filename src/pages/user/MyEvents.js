import { Container, Divider, Grid } from '@material-ui/core'
import React, { useContext, useEffect } from 'react'
import CustomSelect from '../../components/inputs/CustomSelect'
import { DataContext } from '../../context/Context';
import EventCard from '../../components/cards/EventCard';
import useStyles from './Styles'
import { fetchDataAuth } from '../../helpers/fetchData';
import NotFound from '../../components/NotFound';

function MyEvents(props) {
    const classes = useStyles();
    const {events,setEvents} = useContext(DataContext);
    const selectData = ["upcoming","past","pending"]

    useEffect(() => {
        return function() {
            setEvents(null);
        }
    },[])
    const setEventData = (data) => {
        setEvents(data.events)
    }

    return (
        <div className={classes.bgColor}>
            <Container maxWidth="lg" className={`${classes.vpadding}`}>
                <Grid container direction="row" justify="space-between" alignItems="center">
                <h1>My Events</h1>
                <div className={`${classes.flex}`}>
                    <CustomSelect 
                        page={1}
                        url={"/api/get-events-auth"}
                        selectData={selectData} 
                        selectHandler={setEventData} 
                        label="Type"
                        dataHandler={fetchDataAuth}
                        />
                </div>
                </Grid>
            </Container>

            <Divider variant="middle" className={classes.vmargin} />

            <Container maxWidth="lg" className={classes.flex}>
                {
                    (events!==null && events?.length !== 0) ? 
                    (
                        <>
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
                                                eventData={item}
                                                clickRoute={`/user/myevent/${item._id}`}
                                            />
                                        </Grid>
                                    );
                                })
                            }
                            </Grid>
                        </>
                    ) :
                    (
                        <>
                            <NotFound/>
                        </>
                    )
                }
            </Container> 
        </div>
    )
}

export default MyEvents
