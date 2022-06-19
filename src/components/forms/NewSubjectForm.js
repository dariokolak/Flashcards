import classes from './NewSubjectForm.module.css';

import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import useInput from '../../hooks/use-input';
import useHttp from '../../hooks/use-http';
import { API_URL } from '../../shared/app.constants';
import LoadingDots from '../ui/LoadingDots';

const validateSubjectName = (value) => value.trim() !== '';

const NewSubjectForm = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const { isLoading, error, sendRequest: sendNewSubject } = useHttp();

  // SUBJECT NAME
  const {
    value: enteredSubjectName,
    isValid: enteredSubjectNameIsValid,
    hasError: SubjectNameInputHasError,
    inputChangeHandler: subjectNameInputChangeHandler,
    inputBlurHandler: subjectNameInputBlurHandler,
    reset: resetSubjectNameInput,
    setAsTouched: setSubjectNameInputAsTouched,
  } = useInput(validateSubjectName);

  // FORM VALIDITY
  const formIsValid = enteredSubjectNameIsValid ? true : false;

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setSubjectNameInputAsTouched();

    if (!formIsValid) {
      return;
    }

    const requestConfig = {
      method: 'POST',
      url: `${API_URL}/api/v1/users/me/subjects`,
      data: {
        name: enteredSubjectName,
      },
      headers: {
        Authorization: `${authCtx.token}`,
      },
    };

    // Logic
    sendNewSubject(requestConfig, (data) => {
      resetSubjectNameInput();

      history.push('/subjects');
    });
  };

  return (
    <form className={classes.form} onSubmit={formSubmissionHandler}>
      {/* SUBJECT NAME */}
      <div>
        <label htmlFor="subjectname" className={classes['form__label']}>
          Subject name
        </label>
        <input
          type="text"
          id="subjectname"
          className={classes['form__input']}
          onChange={subjectNameInputChangeHandler}
          onBlur={subjectNameInputBlurHandler}
          value={enteredSubjectName}
        />
        {SubjectNameInputHasError && (
          <p className={classes['form__error-text']}>
            Please tell us the name of the subject!
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

export default NewSubjectForm;
