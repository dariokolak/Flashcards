import classes from './DeleteAccountForm.module.css';

import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import useHttp from '../../hooks/use-http';
import { API_URL } from '../../shared/app.constants';
import LoadingDots from '../ui/LoadingDots';

const DeleteAccountForm = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const { isLoading, error, sendRequest: deleteAccount } = useHttp();

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    const requestConfig = {
      method: 'DELETE',
      url: `${API_URL}/api/v1/users/me/delete`,
      headers: {
        Authorization: `${authCtx.token}`,
      },
    };

    // Logic
    deleteAccount(requestConfig, (data) => {
      authCtx.logout();
      history.push('/auth');
    });
  };

  return (
    <form className={classes.form} onSubmit={formSubmissionHandler}>
      <div className={classes['form__action']}>
        <button className={classes['form__btn']}>DELETE</button>
        {isLoading && <LoadingDots className={classes['form__loading']} />}
        {error && (
          <p className={classes['form__error-text']}>{error.message}</p>
        )}
      </div>
    </form>
  );
};

export default DeleteAccountForm;
