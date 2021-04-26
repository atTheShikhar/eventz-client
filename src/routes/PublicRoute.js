import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import { isAuth } from '../helpers/auth';

function PublicRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={
                props => isAuth() ?
                    (<Redirect
                        to={{
                            pathname: "/",
                            state: { from: props.location }
                        }}
                    />) :
                    (<Component {...props} />)
            }
        />
    )
}

export default PublicRoute
