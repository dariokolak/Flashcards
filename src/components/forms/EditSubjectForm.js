import classes from './NewSubjectForm.module.css';

import { useHistory } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../../store/auth-context';
import useHttp from '../../hooks/use-http';
import { API_URL } from '../../shared/app.constants';
import LoadingDots from '../ui/LoadingDots';

const validateSubjectName = (value) => value.trim() !== '';

const EditSubjectForm = (props) => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const { isLoading, error, sendRequest: editSubject } = useHttp();

  const [enteredSubjectName, setEnteredSubjectName] = useState('');
  const enteredSubjectNameIsValid = validateSubjectName(enteredSubjectName);

  useEffect(() => {
    setEnteredSubjectName(props.name);
  }, [props.name]);

  const subjectNameInputChangeHandler = (event) => {
    setEnteredSubjectName(event.target.value);
  };

  // FORM VALIDITY
  const formIsValid = enteredSubjectNameIsValid ? true : false;

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    const requestConfig = {
      method: 'PATCH',
      url: `${API_URL}/api/v1/users/me/subjects/${props._id}`,
      data: {
        name: enteredSubjectName,
      },
      headers: {
        Authorization: `${authCtx.token}`,
      },
    };

    // Logic
    editSubject(requestConfig, (data) => {
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
          value={enteredSubjectName}
        />
        {!enteredSubjectNameIsValid && (
          <p className={classes['form__error-text']}>
            Please tell us the name of the subject!
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

export default EditSubjectForm;
