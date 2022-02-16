import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import 'remixicon/fonts/remixicon.css'
import 'react-toastify/dist/ReactToastify.css';

import "./App.css";

// components
import Loading from "./Components/Loading";
// packages
import { AnimatePresence } from "framer-motion";
import { PrivateRoute, PublicRoute } from "./Utils/Utils";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import UserDataLayer from "./Context/UserContext";
const Login = React.lazy(() => import("./Pages/Auth/Login"));
const Register = React.lazy(() => import("./Pages/Auth/Register"));
const Dashboard = React.lazy(() => import("./Pages/Dashboard/index"));
const Home = React.lazy(() => import("./Pages/Home"));
const About = React.lazy(() => import("./Pages/About/About"));

function App() {
  // eslint-disable-next-line
  const [redirect, setRedirect] = React.useState(false);

  return (
    <UserDataLayer>
      <AnimatePresence>
        <BrowserRouter>
          <Switch>
            <PublicRoute
              exact
              path="/"
              component={() => (
                <Suspense fallback={<Loading />}>
                  <Home />
                </Suspense>
              )}
            />
            {/* login route */}
            <PublicRoute
              exact
              path="/login"
              component={() => (
                <Suspense fallback={<Loading />}>
                  <Login setRedirect={setRedirect} />
                </Suspense>
              )}
            />

            <PublicRoute
              exact
              path="/register"
              component={() => (
                <Suspense fallback={<Loading />}>
                  <Register setRedirect={setRedirect} />
                </Suspense>
              )}
            />

          <PublicRoute
            exact
            path="/forgot-password"
            component={() => (
              <Suspense fallback={<Loading />}>
                <ForgotPassword setRedirect={setRedirect} />
              </Suspense>
            )}
          />
          <Route exact path="/about" component={() =>(
               <Suspense fallback={<Loading />}>
               <About setRedirect={setRedirect} />
             </Suspense>
          )} />

            <PrivateRoute
              // exact
              path="/dashboard"
              component={() => (
                <Suspense fallback={<Loading />}>
                  <Dashboard setRedirect={setRedirect} />
                </Suspense>
              )}
            />
          </Switch>
        </BrowserRouter>
      </AnimatePresence>
    </UserDataLayer>
  );
}
export default App;
