import classes from './SignUpForm.module.css';

import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import useInput from '../../hooks/use-input';
import useHttp from '../../hooks/use-http';
import validator from 'validator';
import { API_URL } from '../../shared/app.constants';
import LoadingDots from '../ui/LoadingDots';

const validateName = (value) => value.trim() !== '';

const validateEmail = (value) => {
  return validator.isEmail(value);
};

const validatePassword = (value) => {
  return value.length >= 8;
};

const SignUpForm = (props) => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const { isLoading, error, sendRequest: sendSignUpRequest } = useHttp();

  // FIRST NAME
  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    hasError: firstNameInputHasError,
    inputChangeHandler: firstNameInputChangeHandler,
    inputBlurHandler: firstNameInputBlurHandler,
    reset: resetFirstNameInput,
    setAsTouched: setFirstNameInputAsTouched,
  } = useInput(validateName);

  // LAST NAME

  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: lastNameInputHasError,
    inputChangeHandler: lastNameInputChangeHandler,
    inputBlurHandler: lastNameInputBlurHandler,
    reset: resetLastNameInput,
    setAsTouched: setLastNameInputAsTouched,
  } = useInput(validateName);

  // EMAIL

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    inputChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmail,
    setAsTouched: setEmailInputAsTouched,
  } = useInput(validateEmail);

  // PASSWORD
  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    inputChangeHandler: passwordInputChangeHandler,
    inputBlurHandler: passwordInputBlurHandler,
    reset: resetPassword,
    setAsTouched: setPasswordInputAsTouched,
  } = useInput(validatePassword);

  // FORM VALIDITY
  const formIsValid =
    enteredFirstNameIsValid &&
    enteredLastNameIsValid &&
    enteredEmailIsValid &&
    enteredPasswordIsValid
      ? true
      : false;

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setFirstNameInputAsTouched();
    setLastNameInputAsTouched();
    setEmailInputAsTouched();
    setPasswordInputAsTouched();

    if (!formIsValid) {
      return;
    }

    const requestConfig = {
      method: 'POST',
      url: `${API_URL}/api/v1/users/signup`,
      data: {
        firstName: enteredFirstName,
        lastName: enteredLastName,
        email: enteredEmail,
        password: enteredPassword,
      },
    };

    // Logic
    sendSignUpRequest(requestConfig, (data) => {
      resetFirstNameInput();
      resetLastNameInput();
      resetEmail();
      resetPassword();

      authCtx.login(data.token, data.data.user);
      history.push('/subjects');
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
          onBlur={firstNameInputBlurHandler}
          value={enteredFirstName}
        />
        {firstNameInputHasError && (
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
          onBlur={lastNameInputBlurHandler}
          value={enteredLastName}
        />
        {lastNameInputHasError && (
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
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && (
          <p className={classes['form__error-text']}>
            Please provide a valid email!
          </p>
        )}
      </div>

      {/* PASSWORD */}
      <div>
        <label htmlFor="password" className={classes['form__label']}>
          Password
        </label>
        <input
          type="password"
          id="password"
          className={classes['form__input']}
          onChange={passwordInputChangeHandler}
          onBlur={passwordInputBlurHandler}
          value={enteredPassword}
        />
        {passwordInputHasError && (
          <p className={classes['form__error-text']}>
            Password must have minimum 8 characters!
          </p>
        )}
      </div>

      <div className={classes['form__action']}>
        <button className={classes['form__btn']}>Sign up</button>
        {isLoading && <LoadingDots className={classes['form__loading']} />}
        {error && (
          <p className={classes['form__error-text']}>{error.message}</p>
        )}
      </div>

      <div>
        <p className={classes['form__login-text']}>
          Already have an account? {''}
          <button
            onClick={props.onChangeForm}
            className={classes['form__login-btn']}
          >
            Log in
          </button>
        </p>
      </div>
    </form>
  );
};

export default SignUpForm;
