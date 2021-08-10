import useStyles from './Styles'
import { Container,Card,CardContent,Divider} from '@material-ui/core'
import FiberPinIcon from '@material-ui/icons/FiberPin';
import PublicIcon from '@material-ui/icons/Public';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import React from 'react'

function Address(props) {
    const {
        apartment,
        street,
        district,
        stateName,
        pincode,
        country
    } = props.address;
    const classes = useStyles();
    return (
        <Container className={classes.container}>
            <Card
                variant="outlined"
                raised={false}
            >
                <CardContent>
                    <h3>Address of Event</h3>
                    <Divider 
                        variant="middle"
                        className={classes.vmargin}
                    />
                    <div>
                        <div className={classes.flexRow}>
                            <LocationCityIcon color="primary"/>
                            <span className={classes.hmargin}>
                                {apartment}, {street}
                            </span>
                        </div>
                        <div className={`${classes.flexRow} ${classes.vmargin}`}>
                            <LocationOnIcon color="primary"/>
                            <span className={classes.hmargin}>
                                {district}, {stateName}
                            </span>
                        </div>
                        <div className={classes.flexRow}>
                            <FiberPinIcon color="primary"/>
                            <span className={classes.hmargin}>
                                {pincode}
                            </span>
                        </div>
                        <div className={`${classes.flexRow} ${classes.vmargin}`}>
                            <PublicIcon color="primary"/>
                            <span className={classes.hmargin}>
                                {country}
                            </span>
                        </div>
                    </div> 
                </CardContent> 
            </Card>
        </Container>
    )
}

export default Address
