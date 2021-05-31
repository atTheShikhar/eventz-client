import { Button, 
    Card, 
    CardContent, 
    CardMedia, 
    Container,
    Divider, 
} from '@material-ui/core'
import React from 'react'
import useStyles from './Styles';
import noImage from '../../assets/no-image.jpg'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import EventIcon from '@material-ui/icons/Event';
import PeopleIcon from '@material-ui/icons/People';

function Header(props) {
    const classes = useStyles();
    const { imgLink,title,genre,noOfPeople,duration,date,time,price } = props;

    return (
        <Container className={classes.container}>
            <Card
                variant="outlined"
                raised={false}
            >
                <CardMedia
                    title={imgLink ? props.title : "No Image"}
                    component="img"
                    className={classes.cardMedia}
                    src={imgLink ?? noImage}
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
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                className={classes.button}
                            >
                                Book
                            </Button>                            
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
