import classes from './EditFlashcard.module.css';
import EditFlashcardForm from '../../components/forms/EditFlashcardForm';
import { useState, useEffect } from 'react';
import useHttp from '../../hooks/use-http';
import { API_URL } from '../../shared/app.constants';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { useParams } from 'react-router-dom';
import LoadingDots from '../../components/ui/LoadingDots';
import Header from '../../layout/header/Header';
import Container from '../../layout/container/Container';

import HeadingPrimary from '../../components/ui/HeadingPrimary';

const EditFlashcard = () => {
  const params = useParams();
  const authCtx = useContext(AuthContext);
  const [flashcard, setFlashcard] = useState({
    question: '',
    _id: '',
    answer: '',
    done: false,
  });
  const { isLoading, error, sendRequest: fetchFlashcard } = useHttp();

  useEffect(() => {
    const requestConfig = {
      method: 'GET',
      url: `${API_URL}/api/v1/users/me/subjects/${params.subjectId}/flashcards/${params.flashcardId}`,
      headers: {
        Authorization: `${authCtx.token}`,
      },
    };

    const handleFlashcard = (data) => {
      setFlashcard(data.data.flashcard);
    };

    fetchFlashcard(requestConfig, handleFlashcard);
  }, [fetchFlashcard]);
  return (
    <>
      <Header></Header>
      <main>
        <section className={classes.section}>
          <Container className="margin-bottom-md-util">
            <HeadingPrimary>Update Flashcard</HeadingPrimary>
          </Container>
          <Container></Container>
          <Container>
            {error && <p className={classes.error}>{error.message}</p>}
            {isLoading && <LoadingDots color="orange" />}
            {!error && (
              <EditFlashcardForm
                answer={flashcard.answer}
                question={flashcard.question}
                _id={flashcard._id}
                subjectId={params.subjectId}
              />
            )}
          </Container>
        </section>
      </main>
    </>
  );
};

export default EditFlashcard;
