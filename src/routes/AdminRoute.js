import React from 'react'
import { Redirect,Route } from 'react-router-dom';
import { isAuth } from '../helpers/auth';

function AdminRoute({component: Component, ...rest}) {
    return (
        <Route
            {...rest}
            render={
                props => {return (isAuth()?.type === "admin") ? 
                    (<Component {...props} />) :
                    (
                        <Redirect
                            to={{
                                pathname: "/admin/login",
                                state: {from: props.location}
                            }}
                        />
                    )
                }
            }
        />
    )
}

export default AdminRoute
