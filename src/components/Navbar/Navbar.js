import React,{useState} from 'react'
import {
    useHistory,
    NavLink
} from 'react-router-dom';
import FlatButton from '../buttons/FlatButton';
import FilledButton from '../buttons/FilledButton';
import styles from './Navbar.module.css';

function Navbar() {
    const history = useHistory();
    
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
                <FlatButton onClick={() => history.push('/Login')} name="Login" />
            </nav>
        </>
    )
}

export default Navbar