import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { PrivateRoute } from "./auth/authentication";
import Home from "./components/Home";
import Tasks from "./components/Tasks";
import Navbar from "./components/Navbar";


export default function App() {
  return (
    <Router>
      <Navbar />
        <div className="container mt-5">
          <Switch>
            {/* Private routes */}
            <PrivateRoute path="/tasks">
              <Tasks />
            </PrivateRoute>

            {/* Public routes */}
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
    </Router>
  );
};

