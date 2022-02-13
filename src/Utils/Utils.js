import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

const token = localStorage.getItem('token') || null;

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            token ? (
                <Component {...props} />
            ) : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )} />
    )
}

const PublicRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            token ? <Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} /> : <Component {...props} />
        )} />
    )
}

export {PrivateRoute, PublicRoute};