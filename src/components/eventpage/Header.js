import { Button, 
    Card, 
    CardContent, 
    CardMedia, 
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

function Header(props) {
    const classes = useStyles();
    const history = useHistory();
    const { user } = useContext(UserContext);

    const { imgLink,title,genre,
        noOfPeople,duration,date,
        time,price,createdBy,eventId 
    } = props;

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
                                (<>
                                    <Button 
                                        variant="contained"
                                        color="secondary"
                                        size="large"
                                        className={classes.button}
                                    >
                                        Edit Details
                                    </Button>
                                </>) :
                                (<>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        className={classes.button}
                                        onClick={() => history.push(`/book/${eventId}`)}
                                    >
                                        Book
                                    </Button>                            
                                </>)
                            }
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
                                {price}
                            </strong>
                        </span>
                    </div>
                </CardContent>
            </Card>
        </Container>
    )
}

export default Header
