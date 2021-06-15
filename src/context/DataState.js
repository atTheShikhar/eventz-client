import React, {useState} from 'react'
import { DataContext } from './Context'

function DataState(props) {
    const [messages,setMessages] = useState(null);
    const [events,setEvents] = useState(null);
    const [ticketData,setTicketData] = useState(null);

    const value = {
        messages,setMessages,
        events,setEvents,
        ticketData,setTicketData
    };

    return (
        <DataContext.Provider value={value}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataState
