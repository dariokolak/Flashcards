import classes from './LoginForm.module.css';

import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import useInput from '../../hooks/use-input';
import useHttp from '../../hooks/use-http';
import LoadingDots from '../ui/LoadingDots';
import { API_URL } from '../../shared/app.constants';

const validateEmpty = (value) => value.trim() !== '';

const LoginForm = (props) => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const { isLoading, error, sendRequest: sendLoginRequest } = useHttp();
  // EMAIL

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    inputChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmail,
    setAsTouched: setEmailInputAsTouched,
  } = useInput(validateEmpty);

  // PASSWORD
  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    inputChangeHandler: passwordInputChangeHandler,
    inputBlurHandler: passwordInputBlurHandler,
    reset: resetPassword,
    setAsTouched: setPasswordInputAsTouched,
  } = useInput(validateEmpty);

  // FORM VALIDITY
  const formIsValid =
    enteredEmailIsValid && enteredPasswordIsValid ? true : false;

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setEmailInputAsTouched();
    setPasswordInputAsTouched();

    if (!formIsValid) {
      return;
    }

    // Logic

    const requestConfig = {
      method: 'POST',
      url: `${API_URL}/api/v1/users/login`,
      data: {
        email: enteredEmail,
        password: enteredPassword,
      },
    };

    // Logic
    sendLoginRequest(requestConfig, (data) => {
      resetEmail();
      resetPassword();
      authCtx.login(data.token, data.data.user);
      history.push('/subjects');
    });
  };

  return (
    <form className={classes.form} onSubmit={formSubmissionHandler}>
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
            Please provide your email!
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
            Password provide your password!
          </p>
        )}
      </div>

      <div className={classes['form__action']}>
        <button className={classes['form__btn']}>Log in</button>
        {isLoading && <LoadingDots className={classes['form__loading']} />}
        {error && (
          <p className={classes['form__error-text']}>{error.message}</p>
        )}
      </div>

      <div>
        <p className={classes['form__signup-text']}>
          Don't have an account? {''}
          <button
            onClick={props.onChangeForm}
            className={classes['form__signup-btn']}
          >
            Sign up
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
