import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// components
import Loading from "./Components/Loading";
// packages
import { AnimatePresence } from "framer-motion";
import { PrivateRoute, PublicRoute } from "./Utils/Utils";
const Login = React.lazy(() => import("./Pages/Auth/Login"));
const Register = React.lazy(() => import("./Pages/Auth/Register"));
const Dashboard = React.lazy(() => import("./Pages/Dashboard"));
const Home = React.lazy(() => import("./Pages/Home"));

function App() {
  return (
    <AnimatePresence>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
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
                <Login />
              </Suspense>
            )}
          />

        <PublicRoute
            exact
            path="/register"
            component={() => (
              <Suspense fallback={<Loading />}>
                <Register />
              </Suspense>
            )}
          />

          <PrivateRoute
            // exact
            path="/dashboard"
            component={() => (
              <Suspense fallback={<Loading />}>
                <Dashboard  />
              </Suspense>
            )}
          />
        </Switch>
      </BrowserRouter>
    </AnimatePresence>
  );
}
export default App;
