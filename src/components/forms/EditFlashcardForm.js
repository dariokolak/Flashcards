import classes from './EditFlashcardForm.module.css';

import { useHistory } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../../store/auth-context';
import useHttp from '../../hooks/use-http';
import { API_URL } from '../../shared/app.constants';
import LoadingDots from '../ui/LoadingDots';

const validateFlashcard = (value) => value.trim() !== '';

const EditFlashcardForm = (props) => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const { isLoading, error, sendRequest: editSubject } = useHttp();

  const [enteredFlashcardQuestion, setEnteredFlashcardQuestion] = useState('');
  const enteredFlashcardQuestionIsValid = validateFlashcard(
    enteredFlashcardQuestion
  );

  const [enteredFlashcardAnswer, setEnteredFlashcardAnswer] = useState('');
  const enteredFlashcardAnswerIsValid = validateFlashcard(
    enteredFlashcardAnswer
  );

  useEffect(() => {
    setEnteredFlashcardQuestion(props.question);
    setEnteredFlashcardAnswer(props.answer);
  }, [props.name, props.answer]);

  const flashcardQuestionInputChangeHandler = (event) => {
    setEnteredFlashcardQuestion(event.target.value);
  };

  const flashcardAnswerInputChangeHandler = (event) => {
    setEnteredFlashcardAnswer(event.target.value);
  };

  // FORM VALIDITY
  const formIsValid = enteredFlashcardQuestion ? true : false;

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    const requestConfig = {
      method: 'PATCH',
      url: `${API_URL}/api/v1/users/me/subjects/${props.subjectId}/flashcards/${props._id}`,
      data: {
        question: enteredFlashcardQuestion,
        answer: enteredFlashcardAnswer,
      },
      headers: {
        Authorization: `${authCtx.token}`,
      },
    };

    // Logic
    editSubject(requestConfig, (data) => {
      history.push(`/subjects/${props.subjectId}/flashcards`);
    });
  };

  return (
    <form className={classes.form} onSubmit={formSubmissionHandler}>
      {/* FLASHCARD QUESTION */}
      <div>
        <label htmlFor="question" className={classes['form__label']}>
          Question
        </label>
        <input
          type="text"
          id="question"
          className={classes['form__input']}
          onChange={flashcardQuestionInputChangeHandler}
          value={enteredFlashcardQuestion}
        />
        {!enteredFlashcardQuestionIsValid && (
          <p className={classes['form__error-text']}>
            Please tell us the question of the flashcard!
          </p>
        )}
      </div>

      {/* FLASHCARD ANSWER */}

      <div>
        <label htmlFor="answer" className={classes['form__label']}>
          Answer
        </label>
        <textarea
          id="answer"
          className={classes['form__text']}
          onChange={flashcardAnswerInputChangeHandler}
          value={enteredFlashcardAnswer}
        ></textarea>
        {!enteredFlashcardAnswerIsValid && (
          <p className={classes['form__error-text']}>
            Please tell us the answer of the flashcard!
          </p>
        )}
      </div>

      <div className={classes['form__action']}>
        <button className={classes['form__btn']}>Update</button>
        {isLoading && <LoadingDots className={classes['form__loading']} />}
        {error && (
          <p className={classes['form__error-text']}>{error.message}</p>
        )}
      </div>
    </form>
  );
};

export default EditFlashcardForm;
