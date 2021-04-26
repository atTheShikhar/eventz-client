import { Button } from '@material-ui/core';
import React,{useContext} from 'react'
import {
    useHistory,
    NavLink
} from 'react-router-dom';
import { logout } from '../../helpers/auth';
import { UserContext } from "../../context/UserContext";
// import FlatButton from '../buttons/FlatButton';


function Navbar() {
    const history = useHistory();
    const { user,setUser } = useContext(UserContext);

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                        {
                            user ? 
                                (<div style={{display: "none"}}></div>) :
                                (
                                    <li>
                                       <NavLink to = "/Register">Register</NavLink>
                                    </li>
                                )
                        }
                    <li>
                        <NavLink to="/About">About</NavLink>
                    </li>
                </ul>

                {
                    user ? 
                        (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    logout(setUser,history)
                                }}
                                disableElevation
                            >
                                Logout {user.name}
                            </Button>
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