import classes from './NewFlashcardForm.module.css';

import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import useInput from '../../hooks/use-input';
import useHttp from '../../hooks/use-http';
import { API_URL } from '../../shared/app.constants';
import LoadingDots from '../ui/LoadingDots';

const validateFlashcard = (value) => value.trim() !== '';

const NewFlashcardForm = (props) => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const { isLoading, error, sendRequest: sendNewFlashcard } = useHttp();

  // FLASHCARD QUESTION
  const {
    value: enteredFlashcardQuestion,
    isValid: enteredFlashcardQuestionIsValid,
    hasError: flashcardQuestionInputHasError,
    inputChangeHandler: flashcardQuestionInputChangeHandler,
    inputBlurHandler: flashcardQuestionInputBlurHandler,
    reset: resetFlashcardQuestionInput,
    setAsTouched: setFlashcardQuestionInputAsTouched,
  } = useInput(validateFlashcard);

  // FLASHCARD ANSWER
  const {
    value: enteredFlashcardAnswer,
    isValid: enteredFlashcardAnswerIsValid,
    hasError: flashcardAnswerInputHasError,
    inputChangeHandler: flashcardAnswerInputChangeHandler,
    inputBlurHandler: flashcardAnswerInputBlurHandler,
    reset: resetFlashcardAnswerInput,
    setAsTouched: setFlashcardAnswerInputAsTouched,
  } = useInput(validateFlashcard);

  // FORM VALIDITY
  const formIsValid =
    enteredFlashcardQuestionIsValid && enteredFlashcardAnswerIsValid
      ? true
      : false;

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setFlashcardQuestionInputAsTouched();
    setFlashcardAnswerInputAsTouched();

    if (!formIsValid) {
      return;
    }

    const requestConfig = {
      method: 'POST',
      url: `${API_URL}/api/v1/users/me/subjects/${props.subjectId}/flashcards`,
      data: {
        question: enteredFlashcardQuestion,
        answer: enteredFlashcardAnswer,
      },
      headers: {
        Authorization: `${authCtx.token}`,
      },
    };

    // Logic
    sendNewFlashcard(requestConfig, (data) => {
      resetFlashcardQuestionInput();
      resetFlashcardAnswerInput();

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
          onBlur={flashcardQuestionInputBlurHandler}
          value={enteredFlashcardQuestion}
        />
        {flashcardQuestionInputHasError && (
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
          onBlur={flashcardAnswerInputBlurHandler}
          value={enteredFlashcardAnswer}
        ></textarea>
        {flashcardAnswerInputHasError && (
          <p className={classes['form__error-text']}>
            Please tell us the answer of the flashcard!
          </p>
        )}
      </div>

      <div className={classes['form__action']}>
        <button className={classes['form__btn']}>Create</button>
        {isLoading && <LoadingDots className={classes['form__loading']} />}
        {error && (
          <p className={classes['form__error-text']}>{error.message}</p>
        )}
      </div>
    </form>
  );
};

export default NewFlashcardForm;
