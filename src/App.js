import "./App.css";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import { Route, Switch, Redirect } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import EditSubject from "./pages/subjects/EditSubject";
import Subjects from "./pages/subjects/Subjects";
import NewSubject from "./pages/subjects/NewSubject";

const App = () => {
  const authCtx = useContext(AuthContext);
  return (
    <>
      <Switch>
        <Route path="/" exact>
          {authCtx.isUserLoggedIn && <Redirect to="/subjects" />}
          {!authCtx.isUserLoggedIn && <Redirect to="/auth" />}
        </Route>

        {authCtx.isUserLoggedIn && (
          <Route path="/subjects" exact>
            <Subjects />
          </Route>
        )}

        {authCtx.isUserLoggedIn && (
          <Route path="/subjects/new-subject">
            <NewSubject />
          </Route>
        )}

        {authCtx.isUserLoggedIn && (
          <Route path="/subjects/:subjectId/edit-subject">
            <EditSubject />
          </Route>
        )}

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
