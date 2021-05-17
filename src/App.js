// import "./App.css";

import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Jobs from "./pages/Jobs";
import Form from "./pages/Form";
import Details from "./pages/Details";
import { auth } from "./services/firebase";

import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Navbar from "./components/partials/Navbar";

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    });
  }

  render() {
    return this.state.loading === true ? (
      <h2>Loading...</h2>
    ) : (
      <>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <PrivateRoute
              exact
              path="/jobs"
              authenticated={this.state.authenticated}
              component={Jobs}
            ></PrivateRoute>
            <PrivateRoute
              path="/jobs/:jobId"
              authenticated={this.state.authenticated}
              component={Details}
            ></PrivateRoute>
            <PrivateRoute
              path="/form"
              authenticated={this.state.authenticated}
              component={Form}
            ></PrivateRoute>
            <PublicRoute
              path="/signup"
              authenticated={this.state.authenticated}
              component={Signup}
            ></PublicRoute>
            <PublicRoute
              path="/login"
              authenticated={this.state.authenticated}
              component={Login}
            ></PublicRoute>
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
