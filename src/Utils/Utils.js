import { Redirect, Route } from "react-router-dom";


const token = localStorage.getItem('token') || null;

export const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            token ? (
                <Component {...props} />
            ) : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )} />
    )
}

export const PublicRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            !token ? (
                <Component {...props} />
            ) : <Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} />
        )} />
    )
}


