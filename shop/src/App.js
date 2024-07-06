import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import "./Style/Home.css";

// Import components
import SLogin from "./components/SLogin";
import SRegister from "./components/SRegister";
import SDashboard from "./components/SDashboard";
import Home from "./components/Home";
import CustLogin from './components/CustLogin';
import CustDash from "./components/CustDash";

function App() {
    const checkAuthenticated = async () => {
        try {
            const res = await fetch("http://localhost:5000/auth/check-auth", {
                method: "GET",
                headers: { token: localStorage.token },
            });
            const parseRes = await res.json();
            parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        checkAuthenticated();
    }, []);

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setAuth = (boolean) => {
        setIsAuthenticated(boolean);
    };

    return (
        <Fragment>
            <Router>
                <div className="banner">
                    <Switch>
                        <Route exact path="/" render={() => <Home />} />
                        <Route exact path="/shop-login" render={(props) =>
                            !isAuthenticated ? (
                                <SLogin {...props} setAuth={setAuth} />
                            ) : (
                                <Redirect to="/shop-dashboard" />
                            )
                        } />
                        <Route exact path="/shop-dashboard" render={(props) =>
                            isAuthenticated ? (
                                <SDashboard {...props} setAuth={setAuth} />
                            ) : (
                                <Redirect to="/shop-login" />
                            )
                        } />
                        <Route exact path="/customer-login" render={(props) =>
                            !isAuthenticated ? (
                                <CustLogin {...props} setAuth={setAuth} />
                            ) : (
                                <Redirect to="/customer-dashboard" />
                            )
                        } />
                        <Route exact path="/customer-dashboard" render={(props) =>
                            isAuthenticated ? (
                                <CustDash {...props} setAuth={setAuth} />
                            ) : (
                                <Redirect to="/customer-login" />
                            )
                        } />
                    </Switch>
                </div>
            </Router>
        </Fragment>
    );
}

export default App;
