import React from "react";
import { Route, Redirect} from "react-router-dom";

/**
 * Function that saves the key "is_logged" into the localStorage if the user is logged,
 * removes this key if he is logged off and returns the current status of the user 
 * (it means if he is logged or not by reading the localStorage).
 */
export function providerAuth() {

  /**
   * Save the key "is_logged" into the localStorage.
   * @param {String} email Email of the user
   */
  const signin = (email) => {
    window.localStorage.setItem('is_logged', email);
  };

  /**
   * Remove the key "is_logged" when the user is logged off.
   */
  const signout = () => {
    window.localStorage.removeItem('is_logged');
  };

  /**
   * Get the status of the connection (logged or not).
   */
  const isLogged = () => {
    return window.localStorage.getItem('is_logged') !== null;
  }

  return { signin, signout, isLogged };
}

/**
 * Component to allow the user to access to some routes
 * only if he is logged on the plateform.
 * If not, he is redirected to the homepage (uri "/").
 */
export function PrivateRoute({ children, ...rest }) {
  let auth = providerAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.isLogged() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}