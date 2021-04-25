import { Button } from '@material-ui/core';
import React,{useContext} from 'react'
import {
    useHistory,
    NavLink
} from 'react-router-dom';
import { UserContext } from "../../UserContext";
// import FlatButton from '../buttons/FlatButton';


function Navbar() {
    const history = useHistory();
    const { user } = useContext(UserContext);

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Login">Login</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Register">Register</NavLink>
                    </li>
                    <li>
                        <NavLink to="/About">About</NavLink>
                    </li>
                </ul>

                {
                    user ? 
                        (
                            <div>{user.name}</div>
                        ) :
                        (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => history.push('/Login')}
                                disableElevation
                            >
                                Login
                            </Button>
                        )
                }
            </nav>
        </>
    )
}

export default Navbar