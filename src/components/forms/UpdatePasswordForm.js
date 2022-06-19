import classes from './UpdatePasswordForm.module.css';

import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import useInput from '../../hooks/use-input';
import useHttp from '../../hooks/use-http';
import { API_URL } from '../../shared/app.constants';
import LoadingDots from '../ui/LoadingDots';

const validateEmpty = (value) => value.trim() !== '';

const validatePassword = (value) => {
  return value.length >= 8;
};

const UpdatePasswordForm = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const { isLoading, error, sendRequest: updatePassword } = useHttp();

  // CURRENT PASSWORD
  const {
    value: enteredcurrentPassword,
    isValid: enteredcurrentPasswordIsValid,
    hasError: currentPasswordInputHasError,
    inputChangeHandler: currentPasswordInputChangeHandler,
    inputBlurHandler: currentPasswordInputBlurHandler,
    reset: resetCurrentPassword,
    setAsTouched: setCurrentPasswordInputAsTouched,
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
  } = useInput(validatePassword);

  // FORM VALIDITY
  const formIsValid =
    enteredcurrentPasswordIsValid && enteredPasswordIsValid ? true : false;

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setCurrentPasswordInputAsTouched();
    setPasswordInputAsTouched();

    if (!formIsValid) {
      return;
    }

    const requestConfig = {
      method: 'PATCH',
      url: `${API_URL}/api/v1/users/me/updatePassword`,
      data: {
        currentPassword: enteredcurrentPassword,
        password: enteredPassword,
      },
      headers: {
        Authorization: `${authCtx.token}`,
      },
    };

    // Logic
    updatePassword(requestConfig, (data) => {
      resetCurrentPassword();
      resetPassword();
      authCtx.logout();
      history.push('/auth');
    });
  };

  return (
    <form className={classes.form} onSubmit={formSubmissionHandler}>
      {/* CURRENT PASSWORD */}
      <div>
        <label htmlFor="currentPassword" className={classes['form__label']}>
          Current Password
        </label>
        <input
          type="password"
          id="currentPassword"
          className={classes['form__input']}
          onChange={currentPasswordInputChangeHandler}
          onBlur={currentPasswordInputBlurHandler}
          value={enteredcurrentPassword}
        />
        {currentPasswordInputHasError && (
          <p className={classes['form__error-text']}>
            Please provide your current password!
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
        <button className={classes['form__btn']}>Update</button>
        {isLoading && <LoadingDots className={classes['form__loading']} />}
        {error && (
          <p className={classes['form__error-text']}>{error.message}</p>
        )}
      </div>
    </form>
  );
};

export default UpdatePasswordForm;
