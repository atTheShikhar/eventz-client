import { 
    Card, 
    CardActionArea,
    CardActions, 
    CardContent, 
    CardMedia, 
    Chip, 
    Divider, 
    IconButton, 
    Typography 
} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';
import ScheduleIcon from '@material-ui/icons/Schedule';
import React from 'react'
import noImage from '../../assets/no-image.jpg'
import useStyles from './CardStyle'

function EventCard(props) {
    const classes = useStyles();
    const {
        genre,
        address,
        date,
        time
    } = props;

    let { heading } = props;
    if(heading.length >= 20) {
        heading = heading.substring(0,19) + "...";
    }

    return (
        <Card 
            raised={false}
            variant="outlined"
            className={classes.card}
        >
            <CardActionArea>
                <CardMedia
                    className={classes.image}
                    component="img"
                    src={noImage}
                    title="no image"
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
                        label={`${address}`} 
                        color="primary" 
                        icon={<LocationOnIcon/>} 
                        className={classes.chip}
                    />    

                </CardContent>

            </CardActionArea>

            <Divider variant="middle"/>

            <CardActions className={classes.flexRow}>
                    <div>
                        <IconButton aria-label="add to favorites" className={classes.favButton}>
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share" className={classes.shareButton}>
                            <ShareIcon />
                        </IconButton>
                    </div>
                    <strong className={classes.priceTag}>
                        FREE
                    </strong>                   
            </CardActions>
        </Card>
    )
}

export default EventCard
