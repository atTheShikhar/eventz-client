import React,{useState} from 'react'
import FlatButton from '../components/buttons/FlatButton';
import heroImage from '../assets/events.svg';
import "./Homepage.css"
import FilledButton from '../components/buttons/FilledButton';

function Homepage(props) {
    const {history} = props;
    
    return (
        <div className="container">
            <div className="header">
                
                <img src={heroImage} className="heroImage"></img>
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
                        <FilledButton name="Create Event" className="bigButton" onClick={() => {
                            history.push('/create')
                        }}></FilledButton>
                        <FlatButton name="Book Event" className="bigButton book"></FlatButton>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Homepage
