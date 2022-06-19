import "./App.css";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import { Route, Switch, Redirect } from "react-router-dom";
import Auth from "./pages/auth/Auth";

const App = () => {
  const authCtx = useContext(AuthContext);
  return (
    <>
      <Switch>
        <Route path="/" exact>
          {authCtx.isUserLoggedIn && <Redirect to="/subjects" />}
          {!authCtx.isUserLoggedIn && <Redirect to="/auth" />}
        </Route>

        {!authCtx.isUserLoggedIn && (
          <Route path="/auth">
            <Auth />
          </Route>
        )}

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </>
  );
};

export default App;
