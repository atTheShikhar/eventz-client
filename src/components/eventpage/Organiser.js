import MailIcon from '@material-ui/icons/Mail';
import WorkIcon from '@material-ui/icons/Work';
import PhoneIcon from '@material-ui/icons/Phone';
import { Avatar, 
    Card, 
    CardContent, 
    Collapse, 
    Container,
    Divider,
    IconButton,
    Typography, 

} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useState } from 'react'
import useStyles from './Styles';
import personImg from '../../assets/person.png'


function Organiser(props) {
    const [expanded,setExpanded] = useState(false);
    const classes = useStyles();
    const { 
        organiserName,
        email,
        orgName,
        phone,
    } = props.organiserDetails;

    const handleMoreInfo = (e) => {
        setExpanded(!expanded);
    }   

    return (
        <Container className={classes.container}>
            <Card 
                variant="outlined"
                raised={false}
            >
                <CardContent>
                    <h3>
                        Organiser
                    </h3>

                    <Divider 
                        variant="middle"
                        className={classes.vmargin}
                    />
                    <div className={`${classes.flexRow} ${classes.spaceBetween}`}>
                        <div className={classes.flexRow}>
                            <Avatar 
                                src={personImg}
                            />
                            <Typography
                                variant="h5"
                                className={classes.hmargin}
                            >
                                {organiserName}
                            </Typography>
                        </div>
                        <IconButton onClick={handleMoreInfo}>
                            <ExpandMoreIcon/>
                        </IconButton>
                    </div>
                    <Collapse 
                        in={expanded} 
                        timeout="auto" 
                        unmountOnExit 
                        className={`${classes.vmargin} ${classes.hmargin}`}
                    >
                        <div className={classes.flexRow}>
                            <MailIcon color="primary"/>
                            <span className={classes.hmargin} style={{wordBreak: "break-word"}}>
                                {email}
                            </span>
                        </div>
                        <div className={`${classes.flexRow} ${classes.vmargin}`}>
                            <PhoneIcon color="primary"/>
                            <span className={classes.hmargin}>
                                {phone}
                            </span>
                        </div>
                        <div className={classes.flexRow}>
                            <WorkIcon color="primary"/>
                            <span className={classes.hmargin}>
                                {orgName}
                            </span>
                        </div>
                    </Collapse>
                </CardContent>
            </Card>
        </Container>        
    )
}

export default Organiser
