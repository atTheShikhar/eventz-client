import React,{useState,useEffect} from 'react'
import { UserContext } from './Context';
import { isAuth } from '../helpers/auth';
import ComponentState from './ComponentState';

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
            <ComponentState>
                {props.children}
            </ComponentState>
        </UserContext.Provider>
    )
}

export default GlobalState
