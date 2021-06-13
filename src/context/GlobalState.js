import React,{useState,useEffect} from 'react'
import { UserContext } from './Context';
import { isAuth } from '../helpers/auth';
import ComponentState from './ComponentState';
import DataState from './DataState';
function GlobalState(props) {
    const [user, setUser] = useState(null);
    const value = {
        user,setUser,
    }

    useEffect(() => {
        setUser(isAuth());
    }, [])

    return (
        <UserContext.Provider value={value}>
            <DataState>
                <ComponentState>
                    {props.children}
                </ComponentState>
            </DataState>
        </UserContext.Provider>
    )
}

export default GlobalState
