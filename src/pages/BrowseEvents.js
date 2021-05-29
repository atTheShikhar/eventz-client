import { GridList, GridListTile } from '@material-ui/core'
import React from 'react'
import EventCard from '../components/cards/EventCard'

function BrowseEvents(props) {
    const arr = [
        {
            key: "one",
            title: "Title",
            heading: "Body"
        },
        {
            key: "two",
            title: "Title",
            heading: "Body"
        },
        {
            key: "three",
            title: "Title",
            heading: "Body"
        },
        {
            key: "four",
            title: "Title",
            heading: "Body"
        },
        {
            key: "five",
            title: "Title",
            heading: "Body"
        }
    ]
    return (
        <div>
            <EventCard 
                heading={"Sports Event that is"} 
                genre={"Sports"} 
                date={"21st June 2021"} 
                address={"Andaman & Nicobar Islands"}
            />
        </div>
    )
}

export default BrowseEvents
