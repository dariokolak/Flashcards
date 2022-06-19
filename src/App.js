import './App.css';
import { useContext } from 'react';
import AuthContext from './store/auth-context';
import { Route, Switch, Redirect } from 'react-router-dom';
import Auth from './pages/auth/Auth';
import Subjects from './pages/subjects/Subjects';
import NewSubject from './pages/subjects/NewSubject';
import FlashCards from './pages/flashcards/FlashCards';
import EditSubject from './pages/subjects/EditSubject';
import NewFlashcard from './pages/flashcards/NewFlashcard';
import EditFlashcard from './pages/flashcards/EditFlashcard';
import Profile from './pages/profile/Profile';
import Security from './pages/security/Security';

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
          <Route path="/profile">
            <Profile />
          </Route>
        )}

        {authCtx.isUserLoggedIn && (
          <Route path="/security">
            <Security />
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

        {authCtx.isUserLoggedIn && (
          <Route path="/subjects/:subjectId/flashcards" exact>
            <FlashCards />
          </Route>
        )}

        {authCtx.isUserLoggedIn && (
          <Route path="/subjects/:subjectId/flashcards/new-flashcard">
            <NewFlashcard />
          </Route>
        )}

        {authCtx.isUserLoggedIn && (
          <Route path="/subjects/:subjectId/flashcards/:flashcardId/edit-flashcard">
            <EditFlashcard />
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
