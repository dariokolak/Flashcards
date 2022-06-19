import classes from './FlashCards.module.css';

import Header from '../../layout/header/Header';
import Container from '../../layout/container/Container';
import HeadingPrimary from '../../components/ui/HeadingPrimary';
import { NavLink } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import { useState, useEffect } from 'react';
import { API_URL } from '../../shared/app.constants';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import LoadingDots from '../../components/ui/LoadingDots';
import { useParams } from 'react-router-dom';
import Flashcard from '../../components/flashcards/Flashcard';
import FlashcardsList from '../../components/flashcards/FlashcardsList';

const FlashCards = () => {
  const params = useParams();
  const authCtx = useContext(AuthContext);
  const [subject, setSubject] = useState({ _id: '', name: '', flashcards: [] });
  const { isLoading, error, sendRequest: fetchSubject } = useHttp();
  const {
    isLoading: isLoading2,
    error: error2,
    sendRequest: updateFlashcard,
  } = useHttp();
  const {
    isLoading: isLoading3,
    error: error3,
    sendRequest: deleteFlashcard,
  } = useHttp();

  useEffect(() => {
    const requestConfig = {
      method: 'GET',
      url: `${API_URL}/api/v1/users/me/subjects/${params.subjectId}`,
      headers: {
        Authorization: `${authCtx.token}`,
      },
    };

    const handleSubject = (data) => {
      console.log(data.data.subject);
      setSubject(data.data.subject);
    };

    fetchSubject(requestConfig, handleSubject);
  }, [fetchSubject]);

  const deleteFlashcardHandler = (_id) => {
    const requestConfig = {
      method: 'DELETE',
      url: `${API_URL}/api/v1/users/me/subjects/${params.subjectId}/flashcards/${_id}`,
      headers: {
        Authorization: `${authCtx.token}`,
      },
    };

    const handleFlashCards = (data) => {
      setSubject((prevState) => {
        return {
          _id: prevState._id,
          name: prevState.name,
          flashcards: prevState.flashcards.filter((card) => card._id !== _id),
        };
      });
    };

    deleteFlashcard(requestConfig, handleFlashCards);
  };

  const updateFlashcardHandler = (_id, done) => {
    const requestConfig = {
      method: 'PATCH',
      url: `${API_URL}/api/v1/users/me/subjects/${params.subjectId}/flashcards/${_id}`,
      data: {
        done,
      },
      headers: {
        Authorization: `${authCtx.token}`,
      },
    };

    const handleFlashCards = (data) => {
      setSubject((prevState) => {
        return {
          _id: prevState._id,
          name: prevState.name,
          flashcards: prevState.flashcards.map((card) => {
            if (card._id === _id) return { ...card, done: done };
            else return { ...card };
          }),
        };
      });
    };

    updateFlashcard(requestConfig, handleFlashCards);
  };
  return (
    <>
      <Header></Header>
      <main>
        <section className={classes.section}>
          <Container className="margin-bottom-sm-util">
            <HeadingPrimary>{subject.name}</HeadingPrimary>
          </Container>
          <Container className="align-right-util margin-bottom-md-util">
            <NavLink
              className={classes.link}
              to={`/subjects/${params.subjectId}/flashcards/new-flashcard`}
            >
              Create a new Flashcard
            </NavLink>
          </Container>
          <Container>
            {error && <p className={classes.error}>{error.message}</p>}
            {error2 && <p className={classes.error}>{error2.message}</p>}
            {error3 && <p className={classes.error}>{error3.message}</p>}
            {(isLoading || isLoading2 || isLoading3) && (
              <LoadingDots color="orange" />
            )}
            {!error && (
              <FlashcardsList
                onUpdateFlashCard={updateFlashcardHandler}
                subjectId={subject._id}
                onDeleteFlashcard={deleteFlashcardHandler}
                flashcards={subject.flashcards}
              ></FlashcardsList>
            )}
          </Container>
        </section>
      </main>
    </>
  );
};

export default FlashCards;
