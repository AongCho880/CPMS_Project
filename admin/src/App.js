import React, { Fragment, useState, useEffect } from "react";

// import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

// import { toast } from "react-toastify";

//components

import AdminLogin from "./components/AdminLogin";
import AdminRegister from "./components/AdminRegister";
import AdminDashboard from "./components/AdminDashboard";
import AdminHome from "./components/AdminHome";

// toast.configure();

function App() {
  const checkAuthenticated = async () => {
    console.log("Hell oform checkAuthenticated App.js");
    try {
      const res = await fetch("http://localhost:5000/admin/check-auth", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await res.json();
      console.log(`From checkAuthenticated: ${parseRes}`);

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Switch>

            <Route exact path="/" render={() => <AdminHome />} />

            <Route
              exact
              path="/admin-login"
              render={props =>
                !isAuthenticated ? (
                  <AdminLogin {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/admin-dashboard" />
                )
              }
            />

            <Route
              exact
              path="/admin-register"
              render={props =>
                !isAuthenticated ? (
                  <AdminRegister {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/admin-dashboard" />
                )
              }
            />

            <Route
              exact
              path="/admin-dashboard"
              render={props =>
                isAuthenticated ? (
                  <AdminDashboard {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/admin-login" />
                )
              }
            />

          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;