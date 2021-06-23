import React, { useContext, useEffect, useState } from 'react'
import { Container, Grid } from '@material-ui/core';
import useStyles from './Styles';
import Header from '../../components/eventpage/Header';
import Address from '../../components/eventpage/Address';
import Description from '../../components/eventpage/Description';
import { fetchDataAuth } from '../../helpers/fetchData';
import { ComponentContext } from '../../context/Context';
import { useHistory } from 'react-router';
import CustomTable from '../../components/dataDisplay/CustomTable';
import NotFound from '../../components/NotFound';


const headerArray = [
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'joinedOn', label: 'Joined On' },
    { id: 'ticketCount', label: 'Tickets Booked'},
    { id: 'actions', lable: 'Actions'}
];
const dataNameArray = headerArray
    .map(header => (header.id))
    .filter(header => (header !== 'actions'));

function EventInfoPage(props) {
    const {eventData,date,time,imgLink} = props.location.state;
    const {
        title,
        description,
        noOfPeople,
        genre,
        price,
        isFree,
    } = eventData.eventDetails;
    const {
        // eventOrganiser,
        eventAddress,
        createdBy,
        _id,
        totalTickets,bookedTickets
    } = eventData;

    const classes = useStyles();
    const {setFeedback} = useContext(ComponentContext);
    const [userdata,setUserdata] = useState(null);
    const history = useHistory();

    useEffect(() => {
        const getBookingsData = async () => {
            const url = "/api/get-bookings";
            const postData = { eventId: _id };
            const data = await fetchDataAuth(url,setFeedback,history,postData);
            console.log(data);
            await setUserdata(data);
        } 
        getBookingsData();
    },[])

    return (
        <div className={`${classes.bgColor} ${classes.pageHeight} ${classes.vmargin}`}>
            <Container maxWidth="lg" >

                <Grid container spacing={1}>

                    <Grid item xs={4}>
                        <Grid container direction="column" spacing={1}>
                            
                            <Grid item>
                               <Address 
                                    address={eventAddress}
                               /> 
                            </Grid>
                            <Grid item>
                                <Description description={description}/>
                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid item xs={8}>
                        <Header
                            title={title}
                            genre={genre}
                            duration="1 Hour"
                            date={date} 
                            time={time}
                            imgLink={imgLink}
                            noOfPeople={noOfPeople}
                            isFree={isFree}
                            price={price}
                            createdBy={createdBy}
                            eventId={_id}
                            totalTickets={totalTickets}
                            bookedTickets={bookedTickets}
                        />            
                        <br/>
                        <h3>All Bookings</h3>
                        {
                            (userdata !== null && userdata?.length !== 0) ?
                                (<CustomTable
                                    headerArray={headerArray}
                                    dataNameArray={dataNameArray}
                                    dataArray={userdata}
                                    actions={[
                                    ]}
                                />) :
                                (
                                    <NotFound/>
                                )
                        }
                    </Grid>
                </Grid>

            </Container>
        </div>
    )
}

export default EventInfoPage
