import React, {useState} from 'react'
import { EventDataContext } from './Context'

function EventDataState(props) {
    const [eventData,setEventData] = useState(null);
    const value = {eventData,setEventData};

    return (
        <EventDataContext.Provider value={value}>
            {props.children}
        </EventDataContext.Provider>
    )
}

export default EventDataState
