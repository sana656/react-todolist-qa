import { useState } from "react"
import { useHistory } from "react-router-dom";
import { providerAuth } from "../auth/authentication";

export default function Home() {

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [error, setError] = useState(false)

  const auth = providerAuth();
  const history = useHistory();

  /**
   * Log the user and redirect the page to the route "/tasks".
   */
  const logIn = () => {
    if (email === 'test@test.com' && password === 'test') {
      auth.signin("Test")
      
      history.replace('/tasks');
      return;
    }

    // If credentials are invalid, an error is shown.
    setError(true);
  }

  return (
    <>
      <div className="row">
        <div className="col-md-4 offset-4">

          {error && <div className="alert alert-danger">Désolé, les identifiants sont incorrects.</div>}

          <div className="form-group">
            <label htmlFor="email">Adresse e-mail</label>
            <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="form-group">
            <input type="submit" className="btn btn-primary" onClick={logIn} />
          </div>

        </div>
      </div>
    </>
  )
}