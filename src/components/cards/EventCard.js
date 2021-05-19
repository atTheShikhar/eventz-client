import { 
    Button, 
    Card, 
    CardActionArea,
    CardActions, 
    CardContent, 
    CardMedia, 
    Typography 
} from '@material-ui/core'
import React from 'react'
import noImage from '../../assets/no-image.jpg'
import useStyles from './CardStyle'

function EventCard(props) {
    const classes = useStyles();
    const {
        heading,
        body
    } = props;
    return (
        <Card 
            raised={false}
            className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.image}
                    component="img"
                    src={noImage}
                    title="no image"
                />
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                    >
                        {heading}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {body}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button>
                    Ok
                </Button>
            </CardActions>
        </Card>
    )
}

export default EventCard
