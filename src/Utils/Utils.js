import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

// funciton to check if the tron wallet is logged in or not
const waitTron = () => {
    return new Promise((resolve, reject) => {
        let attempts = 0, maxAttempts = 100;
        const checkTron = () => {
            if (window.tronWeb) {
                resolve(true);
                return;
            }
            attempts++;
            if (attempts >= maxAttempts) {
                reject(false);
                return;
            }
            setTimeout(checkTron, 100);
        }
        checkTron();
    })
}

// functon to initialize the contract accessor

export const initContract = async () => {
    let tronExists = await waitTron();
    if (!tronExists) {
        alert('Please login into Tronlink wallet extension!');
        return null;
    }

    const contractAddress = 'TQDdzVDNLsVajjy5CrdDhhCvTPXnbJmGqh';
    let contract = await window.tronWeb.contract().at(contractAddress);
    return contract;
}

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

export {PrivateRoute};