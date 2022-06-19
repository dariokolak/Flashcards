import classes from './ProfileDataForm.module.css';

import { useContext, useState, useEffect } from 'react';
import AuthContext from '../../store/auth-context';
import useHttp from '../../hooks/use-http';
import { API_URL } from '../../shared/app.constants';
import LoadingDots from '../ui/LoadingDots';
import validator from 'validator';

const validateName = (value) => value.trim() !== '';

const validateEmail = (value) => {
  return validator.isEmail(value);
};

const EditFlashcardForm = () => {
  const authCtx = useContext(AuthContext);
  const { isLoading, error, sendRequest: editProfile } = useHttp();

  const [enteredFirstName, setEnteredFirstName] = useState('');
  const [enteredLastName, setEnteredLastName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const enteredFirstNameIsValid = validateName(enteredFirstName);
  const enteredLastNameIsValid = validateName(enteredLastName);
  const enteredEmailIsValid = validateEmail(enteredEmail);

  useEffect(() => {
    setEnteredFirstName(authCtx.loggedInUser.firstName);
    setEnteredLastName(authCtx.loggedInUser.lastName);
    setEnteredEmail(authCtx.loggedInUser.email);
  }, [
    authCtx.loggedInUser.firstName,
    authCtx.loggedInUser.lastName,
    authCtx.loggedInUser.email,
  ]);

  const firstNameInputChangeHandler = (event) => {
    setEnteredFirstName(event.target.value);
  };

  const lastNameInputChangeHandler = (event) => {
    setEnteredLastName(event.target.value);
  };

  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  // FORM VALIDITY
  const formIsValid =
    enteredFirstNameIsValid && enteredLastNameIsValid && enteredEmailIsValid
      ? true
      : false;

  const formSubmissionHandler = (event) => {
    console.log(enteredEmail, enteredFirstName, enteredLastName);
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    const requestConfig = {
      method: 'PATCH',
      url: `${API_URL}/api/v1/users/me/updateData`,
      data: {
        firstName: enteredFirstName,
        lastName: enteredLastName,
        email: enteredEmail,
      },
      headers: {
        Authorization: `${authCtx.token}`,
      },
    };

    // Logic
    editProfile(requestConfig, (data) => {
      authCtx.updateUser(data.data.user);
    });
  };

  return (
    <form className={classes.form} onSubmit={formSubmissionHandler}>
      {/* FIRST NAME */}
      <div>
        <label htmlFor="firstname" className={classes['form__label']}>
          First name
        </label>
        <input
          type="text"
          id="firstname"
          className={classes['form__input']}
          onChange={firstNameInputChangeHandler}
          value={enteredFirstName}
        />
        {!enteredFirstNameIsValid && (
          <p className={classes['form__error-text']}>
            Please tell us your first name!
          </p>
        )}
      </div>
      {/* LAST NAME */}
      <div>
        <label htmlFor="lastname" className={classes['form__label']}>
          Last name
        </label>
        <input
          type="text"
          id="lastname"
          className={classes['form__input']}
          onChange={lastNameInputChangeHandler}
          value={enteredLastName}
        />
        {!enteredLastNameIsValid && (
          <p className={classes['form__error-text']}>
            Please tell us your last name!
          </p>
        )}
      </div>
      {/* EMAIL */}
      <div>
        <label htmlFor="email" className={classes['form__label']}>
          Email
        </label>
        <input
          type="email"
          id="email"
          className={classes['form__input']}
          onChange={emailInputChangeHandler}
          value={enteredEmail}
        />
        {!enteredEmailIsValid && (
          <p className={classes['form__error-text']}>
            Please provide a valid email!
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
