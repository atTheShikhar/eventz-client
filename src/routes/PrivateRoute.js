import React from 'react'
import { Redirect,Route } from 'react-router-dom';
import { isAuth } from '../helpers/auth';

function PrivateRoute({component: Component, ...rest}) {
    return (
        <Route
            {...rest}
            render={
                props => isAuth() ? 
                    (<Component {...props} />) :
                    (
                        <Redirect
                            to={{
                                pathname: "/Login",
                                state: {from: props.location}
                            }}
                        />
                    )
            }
        />
    )
}

export default PrivateRoute
