import React, { Suspense } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import 'remixicon/fonts/remixicon.css'

import "./App.css";

// components
import Loading from "./Components/Loading";
// packages
import { AnimatePresence } from "framer-motion";
import { PrivateRoute, PublicRoute } from "./Utils/Utils";
const Login = React.lazy(() => import("./Pages/Auth/Login"));
const Register = React.lazy(() => import("./Pages/Auth/Register"));
const Dashboard = React.lazy(() => import("./Pages/Dashboard/index"));
const Home = React.lazy(() => import("./Pages/Home"));

function App() {
   // eslint-disable-next-line 
  const [redirect, setRedirect] = React.useState(false);

 
  return (
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
                <Register setRedirect={setRedirect}/>
              </Suspense>
            )}
          />

          <PrivateRoute
            // exact
            path="/dashboard"
            component={() => (
              <Suspense fallback={<Loading />}>
                <Dashboard setRedirect={setRedirect}  />
              </Suspense>
            )}
          />
        </Switch>
      </BrowserRouter>
    </AnimatePresence>
  );
}
export default App;
