import { Button, 
    ButtonGroup, 
    Card, 
    CardContent, 
    CardMedia, 
    Chip, 
    Container,
    Divider, 
} from '@material-ui/core'
import {useHistory} from 'react-router'
import React, { useContext } from 'react'
import useStyles from './Styles';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import EventIcon from '@material-ui/icons/Event';
import PeopleIcon from '@material-ui/icons/People';
import { UserContext } from '../../context/Context';
import ProgressBar from '../dataDisplay/ProgressBar';

function Header(props) {
    const classes = useStyles();
    const history = useHistory();
    const { user } = useContext(UserContext);

    const { imgLink,title,genre,
        noOfPeople,duration,date,
        time,isFree,price,createdBy,eventId,
        bookedTickets,totalTickets,dateAndTime
    } = props;

    const expired = new Date(dateAndTime) < new Date() 

    return (
        <Container className={classes.container}>
            <Card
                variant="outlined"
                raised={false}
            >
                <CardMedia
                    title={"Event Poster"}
                    component="img"
                    className={classes.cardMedia}
                    src={imgLink}
                />

                <CardContent>
                    <div className={classes.titleRow}>
                        <div>
                            <h2>{title}</h2>     
                            <div>
                              <span>{genre}</span>  
                              <span className={classes.hmargin}>|</span>
                              <span>{duration}</span>
                            </div>
                        </div>
                        <div>
                            {
                                (user?.id === createdBy) ?
                                (
                                    (!expired) ?
                                    (<ButtonGroup>
                                        <Button 
                                            variant="contained"
                                            color="secondary"
                                            className={classes.button}
                                            onClick={() => history.push('/contactus')}
                                        >
                                            Request Update
                                        </Button>
                                        <Button
                                            onClick={() => history.push(`/user/myevents/uploadposter/${eventId}`)}
                                        >
                                            Update Poster
                                        </Button>
                                    </ButtonGroup>) :
                                    (<>
                                        <Chip
                                            label="Expired"
                                            color="secondary"
                                        />
                                    </>)
                                ) :
                                (<>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        className={classes.button}
                                        onClick={() => history.push(
                                            `/book/${eventId}`,
                                            {isFree, price, title, timing: `${date} at ${time}` }
                                            )
                                        }
                                    >
                                        Book
                                    </Button>                            
                                </>)
                            }
                        </div> 
                    </div>

                    <Divider variant="middle" className={classes.vmargin}/>

                    <div className={`${classes.flexRow} ${classes.spaceBetween}`}>
                        <div>Tickets Booked: {bookedTickets} of {totalTickets}</div>
                        <div style={{width: '50%'}}>
                            <ProgressBar value={(bookedTickets/totalTickets) * 100}/>
                        </div>
                    </div>
                    
                    <Divider variant="middle" className={classes.vmargin}/>

                    <div className={classes.flexRow}>
                        <span className={classes.flexRow}>
                            <EventIcon color="primary" className={classes.hmargin}/>
                            <span> 
                                {date} at {time}
                            </span>
                        </span>
                        <span className={classes.hmargin}>|</span>
                        <span className={classes.flexRow}>
                            <PeopleIcon color="primary" className={classes.hmargin}/>
                            <span>
                                {noOfPeople}
                            </span>
                        </span>
                        <span className={classes.hmargin}>|</span>
                        <span className={classes.flexRow}>
                            <AttachMoneyIcon color="secondary" className={classes.hmargin}/> 
                            <strong>
                                {
                                    (isFree === "No")?
                                    (
                                        <>Rs: {price}</>
                                    ) :
                                    (
                                        <>FREE</>
                                    )
                                }
                            </strong>
                        </span>
                        <span>
                        </span>
                    </div>

                </CardContent>
            </Card>
        </Container>
    )
}

export default Header
