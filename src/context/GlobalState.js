import React,{useState,useEffect} from 'react'
import { UserContext } from './UserContext';
import { isAuth } from '../helpers/auth';

function GlobalState(props) {
    const [user, setUser] = useState(null);
    // const value = useMemo(() => ({ user, setUser }), [user, setUser]);

    useEffect(() => {
        setUser(isAuth());
    }, [])

    return (
        <UserContext.Provider value={{
            user: user,
            setUser: setUser
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default GlobalState
