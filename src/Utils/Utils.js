import { Redirect, Route } from "react-router-dom";




export const PrivateRoute = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem('token');
    return (
        <Route {...rest} render={props => (
            token ? (
                <Component {...props} />
            ) : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )} />
    )
}

export const PublicRoute = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem('token');
    return (
        <Route {...rest} render={props => (
            !token ? (
                <Component {...props} />
            ) : <Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} />
        )} />
    )
}


