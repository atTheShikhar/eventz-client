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
            <GridList spacing={2}>
                {arr.map((elem) => {
                    <GridListTile key={elem.key} cols={2} rows={3}>
                        <EventCard heading={elem.title} body={elem.heading} />
                    </GridListTile>
                })}
            </GridList>
        </div>
    )
}

export default BrowseEvents
