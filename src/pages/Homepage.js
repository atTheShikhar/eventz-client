import { Button, makeStyles } from '@material-ui/core';
import React from 'react'
// import FlatButton from '../components/buttons/FlatButton';
import heroImage from '../assets/events.svg';
import "./Homepage.css"
// import FilledButton from '../components/buttons/FilledButton';


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
    }
}))
function Homepage(props) {
    const {history} = props;
    const classes = useStyles();
    return (
        <div className="container">
            <div className="header">
                
                <img src={heroImage} alt="man creating an event" className="heroImage" />
                <div className="headerContent">
                    <h1 className="heading">
                        Create or Book Events.<br/>
                        <span className="highlight">All Digitally.</span>
                    </h1>
                    <header className="content1">
                        Organizers can create events for free.<br/>
                        Participants can book those events.
                    </header>
                    
                    <div className="buttonGroup">
                        <Button 
                            variant="contained" 
                            size="large"
                            onClick={() => {
                                history.push('/create');
                            }}
                            className={classes.button}
                        >
                            Create Event
                        </Button>
                        <Button 
                            variant="outlined"
                            color="primary"
                            size="large"
                            className={classes.buttonOutline}
                            style={{
                                marginLeft: "2vmax"
                            }}
                            // onClick={() => {
                            //     history.push('/book')
                            // }}
                        >
                            Book Event
                        </Button>
                        {/* <FilledButton name="Create Event" className="bigButton" onClick={() => {
                            history.push('/create')
                        }}></FilledButton>
                        <FlatButton name="Book Event" className="bigButton book"></FlatButton> */}
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Homepage
