import React, { useContext, useEffect,useState } from 'react'
import {  Card, CardContent, 
    Container,Grid   
} from '@material-ui/core'
import { useHistory, useParams } from 'react-router'
import { ComponentContext } from '../../context/Context';
import { fetchData, fetchDataAuth } from '../../helpers/fetchData';
import useStyles from './Styles';
import CustomTable from '../../components/dataDisplay/CustomTable';
import UserCard from '../../components/cards/UserCard';


const headerArray = [
    { id: 'title', label: 'Title' },
    { id: 'createdAt', label: 'Created At'},
    { id: 'price', label: 'Price'},
    { id: 'actions', label: 'Actions' },
];
const createdHeaderArray = [
    ...headerArray      
]
const dataNameArray = createdHeaderArray
    .map(header => (header.id))
    .filter(header => (header !== 'actions'));

const bookedHeaderArray = [
    { id: 'organiserName', label: 'Organiser' },
    { id: 'ticketsBooked', label: 'Tickets'},
    ...headerArray,
];
const dataNameArray1 = bookedHeaderArray
    .map(header => (header.id))
    .filter(header => (header !== 'actions'))

const transactionHeaderArray = [
    { id: 'updated_at', label: 'Date'},
    { id: 'amount_paid', label: 'Paid (INR)' },
    { id: 'amount_due', label: 'Due (INR)' },
    { id: 'ticket_count', label: "Tickets"},
    { id: 'title', label: 'Event'},
    { id: 'payment_status', label: "Status"},
    { id: 'actions', label: 'Actions' },
]
const dataNameArray2 = transactionHeaderArray
    .map(header => (header.id))
    .filter(header => (header !== 'actions'))


function UserPage(props) {
    const classes = useStyles();
    const history = useHistory();
    const {setFeedback} = useContext(ComponentContext);

    const {id} = useParams();

    const [createdEventsData,setCreatedEventsData] = useState(null);
    const [bookedEventsData,setBookedEventsData] = useState(null);
    const [transactionData,setTransactionData] = useState(null);
    const [userdata,setUserdata] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const userInfo = { userId: `${id}` }
            //Fetch Userdata
            const userUrl = "/api/admin/user"
            const data = await fetchDataAuth(userUrl,setFeedback,history,userInfo);
            const {user} = data;
            await setUserdata({
                imageLocation: user?.imageLocation,
                name: user?.name?.fname+" "+user?.name?.lname,
                email: user?.email,
                joinedOn: user?.created_at?.split('T')[0],
                user_id: user?._id
            });

            //Logic to get events created by the user
            const url = "/api/admin/events";
            const eventsByUser = await fetchDataAuth(url,setFeedback,history,userInfo);
            await setCreatedEventsData(eventsByUser.events);

            //Logic to get events booked by the user
            const bookedEventsUrl = "/api/admin/users/bookings";
            const eventsBookedByUser = await fetchDataAuth(
                bookedEventsUrl,
                setFeedback,history,
                {
                    requestedBy: id
                }
            )
            const ticketData = eventsBookedByUser?.ticketData
            if(ticketData?.length > 0) 
            {
                const eventData = ticketData.map((ticket) => {
                    const {eventInfo,tickets} = ticket;
                    const price = (eventInfo?.eventDetails?.isFree === "No") ?
                        eventInfo?.eventDetails?.price :
                        "FREE"
                    return {
                        title: eventInfo?.eventDetails?.title,
                        createdAt: new Date(eventInfo?.created_at).toLocaleString(),
                        price: price, 
                        organiserName: eventInfo?.eventOrganiser?.organiserName,
                        ticketsBooked: tickets?.length,
                        _id: eventInfo?._id
                    }
                })
                await setBookedEventsData(eventData)
            }

            //Get transaction details
            const transactionUrl = `/api/admin/payments?userId=${id}`;
            const transactions = await fetchData(transactionUrl,setFeedback,history);
            if(transactions?.length > 0) {
                const parsedTransactions = transactions?.map(item => ({
                    ...item,
                    updated_at: new Date(item.updated_at).toLocaleString(),
                    created_at: new Date(item.created_at).toLocaleString(),
                    joinedOn: new Date(item.joinedOn).toLocaleString()
                }))
                await setTransactionData(parsedTransactions);
            }
        }
        getData();
    },[])

    const showEventdataHandler = (item) => {
        history.push(`/admin/event/${item._id}`)
    }
    const showTransactionHandler = (item) => {
        history.push('/admin/payment/details',item);
    }

    return (
        <div className={`${classes.bgColor} ${classes.vpadding} ${classes.pageHeight}`}>
            
            <Container maxWidth="md">
            <Grid container direction="row" spacing={1}>

                <Grid item xs={4}>
                    <UserCard
                        classes={classes}
                        imageLocation={userdata?.imageLocation}
                        name={userdata?.name}
                        email={userdata?.email}
                        joinedOn={userdata?.joinedOn}                        
                    />
                </Grid>

                <Grid item xs={8}>
                    <h2 className={classes.subHeadingText}>
                        Events created by {userdata?.name}
                    </h2>
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
                <Grid item xs={12}>
                    <h2 className={classes.subHeadingText}>
                        Events booked by {userdata?.name}
                    </h2>
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

                {/*TODO: Fetch transactions and show in table*/}
                <Grid item xs={12}>
                    <h2 className={classes.subHeadingText}>
                        Transactions initiated By {userdata?.name}
                    </h2>
                    {
                        transactionData!=null && transactionData.length!==0 ?
                        <>
                            <CustomTable
                                headerArray={transactionHeaderArray}
                                dataNameArray={dataNameArray2}
                                dataArray={transactionData}
                                actions={[
                                    {
                                        name: "Show",
                                        clickHandler: showTransactionHandler
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
            </Container>
        </div>
    )
}

export default UserPage
