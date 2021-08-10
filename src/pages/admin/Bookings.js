import { Card, Container, Divider, Grid } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import Attendants from '../../components/Attendants';
import UserCard from '../../components/cards/UserCard';
import { ComponentContext } from '../../context/Context';
import { fetchDataAuth } from '../../helpers/fetchData';
import useStyles from './Styles';
import {useHistory} from 'react-router';

function Bookings(props) {
    const classes = useStyles();
    const eventId = props?.match?.params?.id;
    const {userId,title,price,bookedTickets} = props?.location?.state;
    const history = useHistory();
    const {setFeedback} = useContext(ComponentContext);
    const [userdata,setUserdata] = useState(null)

    useEffect(() => {
        const getUser = async () =>{
            const url = '/api/admin/user';
            const postData = {userId};
            const data = await fetchDataAuth(url,setFeedback,history,postData);
            const {user} = data;
            await setUserdata({
                imageLocation: user?.imageLocation,
                name: user?.name?.fname+" "+user?.name?.lname,
                email: user?.email,
                joinedOn: user?.created_at?.split('T')[0],
                user_id: user?._id
            });
        }
        getUser();
    },[]);
    
    const revenue = price.length > 0 ? parseInt(price) * bookedTickets : 0

    const viewUser = () => {
        history.push(
            `/admin/user/${userdata.user_id}`,
        )                
    }

    const viewHandler =(item) => {
        console.log(item)
        history.push(
            `/admin/user/${item?._id}`,
        )                
    }

    return (
        <div className={`${classes.bgColor} ${classes.vpadding} ${classes.pageHeight}`}>
            <Container maxWidth="md">
                <h1 className={classes.headingText}>
                    Booking Information: <span className={classes.textBlue}>{title}</span>
                </h1>

                <Grid container direction="row" justify="center" spacing={1}>

                    <Grid item xs={12} sm={6} md={4}>

                        <Grid container direction="column" spacing={1}>

                            <Grid item>
                                <h2 
                                    className={`${classes.subHeadingText} 
                                        ${classes.underline} 
                                        ${classes.vmargin}`
                                    }
                                >
                                    Organiser
                                </h2>
                                <UserCard
                                    classes={classes}
                                    imageLocation={userdata?.imageLocation}
                                    name={userdata?.name}
                                    email={userdata?.email}
                                    joinedOn={userdata?.joinedOn}                        
                                    actions={[
                                        {
                                            name: "More Info",
                                            clickHandler: viewUser
                                        }
                                    ]}
                                />
                            </Grid>
                            <Grid item>
                                
                                <Card variant="outlined"
                                    style={{padding: "20px"}}
                                >
                                    <h3 className={classes.subHeadingText}>
                                        Ticket Price: <span className={classes.textBlue}>
                                            {price.length > 0? "₹ "+price: "FREE"}
                                        </span> 
                                    </h3>
                                    <h3 className={classes.subHeadingText}>
                                        Tickets Booked: <span className={classes.textBlue}>
                                            {bookedTickets}
                                        </span> 
                                    </h3>
                                    <Divider variant="middle" className={classes.vmargin}/>
                                    <h2 className={classes.subHeadingText}>
                                        Total Revenue: 
                                    </h2>
                                    <h2 className={classes.textRed}>
                                        ₹ {revenue}
                                    </h2>
                                </Card>
                                
                            </Grid>

                        </Grid>

                    </Grid>

                    <Grid item xs={12} sm={6} md={8}>

                        <Grid container direction="column" spacing={1}>

                            <Grid item>
                                <h2 
                                    className={`${classes.subHeadingText} 
                                        ${classes.underline} 
                                        ${classes.vmargin}`
                                    }
                                >
                                    Bookings Details
                                </h2>
                                <Attendants
                                    eventId={eventId}
                                    load={false}
                                    url="/api/admin/get-bookings"
                                    header="Total Bookings: "
                                    actions={[
                                        {
                                            name: "View",
                                            clickHandler: viewHandler
                                        }
                                    ]}
                                />
                            </Grid>

                            <Grid item>
                                <h2 
                                    className={`${classes.subHeadingText} 
                                        ${classes.underline}
                                        ${classes.vmargin}
                                    `}
                                >
                                    Attendance Details
                                </h2>
                                <Attendants
                                    eventId={eventId}
                                    load={false}
                                    url="/api/admin/get-attendance"
                                    header="Total Entries: "
                                    actions={[
                                        {
                                            name: "View",
                                            clickHandler: viewHandler
                                        }
                                    ]}
                                />
                            </Grid>
                            
                        </Grid>

                    </Grid>

                </Grid>
            </Container>
        </div>
    )
}

export default Bookings
