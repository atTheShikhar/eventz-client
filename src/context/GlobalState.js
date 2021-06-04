import React,{useState,useEffect} from 'react'
import { UserContext } from './Context';
import { isAuth } from '../helpers/auth';
import ComponentState from './ComponentState';
import EventDataState from './EventDataState';
function GlobalState(props) {
    const [user, setUser] = useState(null);

    const value = {
        user,
        setUser,
    }

    useEffect(() => {
        setUser(isAuth());
    }, [])

    return (
        <UserContext.Provider value={value}>
            <EventDataState>
                <ComponentState>
                    {props.children}
                </ComponentState>
            </EventDataState>
        </UserContext.Provider>
    )
}

export default GlobalState
