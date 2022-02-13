import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// components
import Loading from "./Components/Loading";
// packages
import { AnimatePresence } from "framer-motion";
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
          <Route
            exact
            path="/login"
            render={() => (
              <Suspense fallback={<Loading />}>
                <Login />
              </Suspense>
            )}
          />

        <Route
            exact
            path="/register"
            render={() => (
              <Suspense fallback={<Loading />}>
                <Register />
              </Suspense>
            )}
          />

          <Route
            // exact
            path="/dashboard/:refer?/:refralID?"
            render={() => (
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
