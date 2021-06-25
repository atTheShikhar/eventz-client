import { Container,Button, Divider,Grid, makeStyles, ButtonGroup } from '@material-ui/core';
import React from 'react'
import heroImage from '../assets/events.svg';


const useStyles = makeStyles(theme => ({
    button: {
        backgroundColor: "#20232a",
        color: "white",
        "&:hover": {
            backgroundColor: theme.palette.grey[800]
        }
    },
    buttonOutline: {
        color: "#20232a",
        borderColor: "#20232a",
        "&:hover": {
            borderColor: "#20232a",
            backgroundColor: theme.palette.grey[300],
        }
    },
    page: {
        backgroundColor: "rgb(250,250,250)",
        minHeight: "90vh"
    },
    heroImage: {
        width: "100%",
        height: "auto"
    },
    heading: {
        fontWeight: 500,
        lineHeight: "1.3em",
        fontSize: "2.5rem",
        color: "rgb(75, 75, 75)",
        padding: "10px 0"
    },
    highlight: {
        color: "rgb(0, 0, 161)",
    },
    headerContent: {
        fontSize: "1.3rem",
        fontWeight: 300,
        color: "rgb(100, 100, 100)",
        padding: "10px 0 30px",
    }
}))
function Homepage(props) {
    const {history} = props;
    const classes = useStyles();
    return (
        <div className={classes.page}>
            <Container maxWidth="lg">

            <Grid 
                container 
                justify="center" 
                alignItems="center"
                style={{minHeight: "70vh"}}
            >

                <Grid item xs={6} style={{width: "100%", paddingLeft: "30px"}}>
                        <h1 className={classes.heading}>
                            Create or Book Events.<br/>
                            <span className={classes.highlight}>All Digitally.</span>
                        </h1>
                        <header className={classes.headerContent}>
                            Organizers can create events for free.<br/>
                            Participants can book those events.
                        </header>
                        
                        <ButtonGroup size="large" disableElevation>
                            <Button 
                                variant="contained" 
                                onClick={() => {
                                    history.push('/create');
                                }}
                                className={classes.button}
                            >
                                Create Event
                            </Button>
                            <Button 
                                variant="outlined"
                                className={classes.buttonOutline}
                                onClick={() => {
                                    history.push('/browse')
                                }}
                            >
                                Book Event
                            </Button>
                        </ButtonGroup>
                </Grid>
                
                <Grid item xs={6} style={{paddingRight: "30px"}}>
                    <img src={heroImage} alt="man creating an event" className={classes.heroImage}/>
                </Grid>
            </Grid>                
            <Divider variant="middle"/>

            
            </Container>
        </div>
    )
}

export default Homepage
