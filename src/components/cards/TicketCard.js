import { 
    Card, 
    CardActionArea,
    CardContent, 
    CardMedia, 
    Divider, 
} from '@material-ui/core'
import React,{useState,useEffect,} from 'react'
import noImage from '../../assets/no-image.jpg'
import useStyles from './CardStyle'
import { useHistory } from 'react-router';

function TicketCard(props) {
    const {eventId,imageLocation,noOfTickets,title,isFree,price} = props;
    const classes = useStyles()
    const history = useHistory();
    const [image,setImage] = useState(noImage);    
    useEffect(() => {
        if(imageLocation !== undefined) {
            setImage(imageLocation);
        }
    },[])

    const cardClickHandler = (e) => {
        history.push(`/user/tickets/${eventId}`);
    }
    return (
        <Card 
            // raised={false}
            // variant="outlined"
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
                    <div className={classes.flexRow}>
                        <h1 className={classes.heading}>
                            {title}
                        </h1>
                    </div>

                    <Divider variant="middle" className={classes.vmargin}/>

                    <h3 className={classes.subheading}>
                        Total Tickets: <span style={{ color: "#3f51b5"}}>{noOfTickets}</span>

                    </h3>
                    <h2 className={classes.subheading}>
                        <span>Price: </span>
                        <strong>
                            {
                                (isFree === "No") ?
                                (<>
                                    {noOfTickets} * {price} = <span className={classes.priceTag}>₹{noOfTickets * price}</span>
                                </>) : 
                                (<span className={classes.priceFreeTag}>FREE</span>)
                            }
                        </strong>                   
                    </h2>

                </CardContent>

            </CardActionArea>

        </Card>
    )
}

export default TicketCard
