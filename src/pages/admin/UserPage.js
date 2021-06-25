import React, { useContext, useEffect,useState } from 'react'
import {  Card, CardContent, Collapse, 
    Container,Grid   
} from '@material-ui/core'
import { useHistory, useParams } from 'react-router'
import { ComponentContext } from '../../context/Context';
import { fetchDataAuth } from '../../helpers/fetchData';
import useStyles from './Styles';
import CustomTable from '../../components/dataDisplay/CustomTable';
import UserCard from '../../components/cards/UserCard';


const createdHeaderArray = [
    { id: 'title', label: 'Title' },
    { id: 'organiserContact', label: 'Contact' },
    { id: 'createdAt', label: 'Created At'},
    { id: 'price', label: 'Price'},
    { id: 'actions', label: 'Actions' },
];
const dataNameArray = createdHeaderArray
    .map(header => (header.id))
    .filter(header => (header !== 'actions'));

const bookedHeaderArray = [{ id: 'organiserName', label: 'Organiser' },...createdHeaderArray];
const dataNameArray1 = bookedHeaderArray
    .map(header => (header.id))
    .filter(header => (header !== 'actions'));

function UserPage(props) {
    const classes = useStyles();
    const history = useHistory();
    const {setFeedback} = useContext(ComponentContext);

    const {id} = useParams();
    
    const {
        name,email,createdAt,
        bookedEvents,imageLocation
    } = props.location.state;

    // const profileImage = imageLocation ?? personImage;
    const [createdEventsData,setCreatedEventsData] = useState(null);
    const [bookedEventsData,setBookedEventsData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const url = "/api/admin/events";
            const userInfo = { userId: `${id}` }

            const eventsByUser = await fetchDataAuth(url,setFeedback,history,userInfo);

            let bookedEventsByUser = [];
            if(bookedEvents.length > 0) {
                for(let i=0;i<bookedEvents.length;i++) {
                    const eventInfo = {eventId: bookedEvents[i]};
                    const bookedEvent = await fetchDataAuth(
                        url,setFeedback,
                        history,eventInfo
                    ) 
                    //get the first element of the array since events can't have same ids
                    bookedEventsByUser.push(bookedEvent.events[0]); 
                }
            }
            if(bookedEventsByUser.length > 0)
                setBookedEventsData(bookedEventsByUser)

            setCreatedEventsData(eventsByUser.events);
        }
        getData();
    },[])

    const showEventdataHandler = (item) => {
        history.push(`/admin/event/${item._id}`)
    }

    return (
        <div className={`${classes.bgColor} ${classes.vpadding} ${classes.pageHeight}`}>
            
            <Container maxWidth="xl">
            <Grid container direction="row" spacing={2}>

                <Grid item xs={3}>
                    <UserCard
                        classes={classes}
                        imageLocation={imageLocation}
                        name={name}
                        email={email}
                        joinedOn={createdAt.split(',')[0]}                        
                    />
                </Grid>

                <Grid item xs={9}>
                    <Grid container direction="column" spacing={2}>
                            <Grid item>
                            <h2>Events created by {name}</h2>
                            {
                                createdEventsData!==null && createdEventsData.length!==0 ?
                                <>
                                    <CustomTable
                                        headerArray={createdHeaderArray}
                                        dataNameArray={dataNameArray}
                                        dataArray={createdEventsData}
                                        actions={[
                                            {
                                                name: "Show",
                                                //TODO: Push to the events page
                                                clickHandler: showEventdataHandler
                                            }
                                        ]}
                                        />
                                </> : 
                                <>
                                    <Card>
                                        <CardContent className={classes.flex}>
                                            <div className={classes.subHeadingText}>No Events</div>
                                        </CardContent>
                                    </Card>
                                </>
                            }
                            </Grid>

                            <Grid item>
                            <h2>Events booked by {name}</h2>
                            {
                                bookedEventsData!==null && bookedEventsData.length!==0 ?
                                <>
                                    <CustomTable
                                        headerArray={bookedHeaderArray}
                                        dataNameArray={dataNameArray1}
                                        dataArray={bookedEventsData}
                                        actions={[
                                            {
                                                name: "Show",
                                                //TODO: Push to the events page
                                                clickHandler: showEventdataHandler
                                            }
                                        ]}
                                    />
                                </> : 
                                <>
                                    <Card>
                                        <CardContent className={classes.flex}>
                                            <div className={classes.subHeadingText}>No Events</div>
                                        </CardContent>
                                    </Card>
                                </>
                            }
                            </Grid>
                    </Grid>
                </Grid>

            </Grid>
            </Container>
        </div>
    )
}

export default UserPage
