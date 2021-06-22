import React from 'react'
import { useRouteMatch } from 'react-router'

function AdminEventPage(props) {
    const {id} = useRouteMatch().params; 
    
    return (
        <div>
            {id}
        </div>
    )
}

export default AdminEventPage
