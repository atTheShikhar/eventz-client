import { Container, Divider, Grid } from '@material-ui/core'
import React, { useContext } from 'react'
import CustomSelect from '../../components/inputs/CustomSelect'
import { EventDataContext } from '../../context/Context';
import EventCard from '../../components/cards/EventCard';
import useStyles from './Styles'

function MyEvents(props) {
    const classes = useStyles();
    const {eventData,setEventData} = useContext(EventDataContext);
    const selectData = ["Upcoming","Past"]
    const events = eventData?.events;

    return (
        <div className={classes.bgColor}>
            <Container maxWidth="lg" className={`${classes.vpadding}`}>
                <h1>My Events</h1>
                <div className={`${classes.flex}`}>
                    <CustomSelect selectData={selectData} selectHandler={setEventData} label="Type"/>
                </div>
            </Container>

            <Divider variant="middle" className={classes.vmargin} />

            <Container maxWidth="lg" className={classes.flex}>
                {
                    events ? 
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
                                                clickRoute={`/event/${item._id}`}
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
                            <div>No Events</div>
                        </>
                    )
                }
            </Container> 
        </div>
    )
}

export default MyEvents
