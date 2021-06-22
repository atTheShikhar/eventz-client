import { 
    Card, 
    CardActionArea,
    CardActions, 
    CardContent, 
    CardMedia, 
    Chip, 
    Divider, 
    Typography,
    Grid
} from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';
import ScheduleIcon from '@material-ui/icons/Schedule';
import React,{useState,useEffect} from 'react'
import noImage from '../../assets/no-image.jpg'
import useStyles from './CardStyle'
import { useHistory } from 'react-router';
import ProgressBar from '../dataDisplay/ProgressBar';

function EventCard(props) {
    const { title,genre,dateAndTime,isFree,price } = props.eventData.eventDetails;
    const { stateName } = props.eventData.eventAddress;
    const { imageLocation,totalTickets,bookedTickets } = props.eventData;
    const { clickRoute } = props;
    const date = new Date(dateAndTime).toDateString();
    const time = new Date(dateAndTime).toLocaleTimeString();
    let heading = title;
    if(heading.length >= 20) {
        heading = heading.substring(0,19) + "...";
    }

    const classes = useStyles();
    const history = useHistory();
    const [image,setImage] = useState(noImage);    
    useEffect(() => {
        if(imageLocation !== undefined) {
            setImage(imageLocation);
        }
    },[])

    const cardClickHandler = (ev) => {
        history.push(clickRoute,{eventData: props.eventData, date: date, time: time, imgLink: image});
    }

    return (
        <Card 
            raised={false}
            variant="outlined"
            className={classes.card}
        >
            <CardActionArea onClick={cardClickHandler}> 
                <CardMedia
                    className={classes.image}
                    component="img"
                    src={image}
                    title="Event Poster"
                />
                <CardContent>
                    <div className={classes.flexRow} style={{marginBottom: "5px"}}>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                            className={classes.heading}
                        >
                            {heading}
                        </Typography>
                        <Chip label={`${genre}`} variant="outlined" color="secondary"/>
                    </div>

                    <Chip 
                        label={`${time}`} 
                        icon={<ScheduleIcon/>} 
                        color="primary"
                        className={classes.chip}
                    />
                    <Chip 
                        label={`${date}`}
                        icon={<EventIcon/>}
                        color="primary"
                        className={classes.chip}
                    />
                    <br/>
                    <Chip 
                        label={`${stateName}`} 
                        color="primary" 
                        icon={<LocationOnIcon/>} 
                        className={classes.chip}
                    />    

                </CardContent>

            </CardActionArea>

            <Divider variant="middle"/>

            <CardActions className={classes.flexRow}>
                    <div
                        style={{width: "80%", padding: "10px"}}
                    >
                        <Grid container direction="row" justify="space-between" >
                            <Grid item className={classes.subheading}>
                                Tickets Booked: 
                            </Grid>
                            <Grid item className={classes.subheading}>
                                {bookedTickets} of {totalTickets}
                            </Grid>
                        </Grid>

                        <ProgressBar
                            value={(bookedTickets/totalTickets) * 100}
                        />
                    </div>
                    <strong >
                        {
                            (isFree === "No") ?
                            (<span className={classes.priceTag}>
                                Rs: {price}
                            </span>) : 
                            (<span className={classes.priceFreeTag}>FREE</span>)
                        }
                    </strong>                   
            </CardActions>
        </Card>
    )
}

export default EventCard
