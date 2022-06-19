import classes from './Subjects.module.css';

import Header from '../../layout/header/Header';
import Container from '../../layout/container/Container';
import HeadingPrimary from '../../components/ui/HeadingPrimary';
import { NavLink } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import { useState, useEffect } from 'react';
import { API_URL } from '../../shared/app.constants';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import SubjectList from '../../components/subjects/SubjectsList';
import LoadingDots from '../../components/ui/LoadingDots';

const Subjects = () => {
  const authCtx = useContext(AuthContext);
  const [subjects, setSubjects] = useState([]);
  const { isLoading, error, sendRequest: fetchSubjects } = useHttp();
  const {
    isLoading: isLoading2,
    error: error2,
    sendRequest: deleteSubject,
  } = useHttp();

  useEffect(() => {
    const requestConfig = {
      method: 'GET',
      url: `${API_URL}/api/v1/users/me/subjects`,
      headers: {
        Authorization: `${authCtx.token}`,
      },
    };

    const handleSubjects = (data) => {
      setSubjects(data.data.subjects);
    };

    fetchSubjects(requestConfig, handleSubjects);
  }, [fetchSubjects]);

  const deleteSubjectHandler = (_id) => {
    const requestConfig = {
      method: 'DELETE',
      url: `${API_URL}/api/v1/users/me/subjects/${_id}`,
      headers: {
        Authorization: `${authCtx.token}`,
      },
    };

    const handleSubjectsAfterDelete = (data) => {
      setSubjects((prevState) => prevState.filter((item) => item._id !== _id));
    };

    deleteSubject(requestConfig, handleSubjectsAfterDelete);
  };
  return (
    <>
      <Header></Header>
      <main>
        <section className={classes.section}>
          <Container className="margin-bottom-sm-util">
            <HeadingPrimary>My Subjects</HeadingPrimary>
          </Container>
          <Container className="align-text-right-util margin-bottom-md-util">
            <NavLink className={classes['link-new']} to="/subjects/new-subject">
              Create a new subject
            </NavLink>
          </Container>
          <Container>
            {error && <p className={classes.error}>{error.message}</p>}
            {error2 && <p className={classes.error}>{error2.message}</p>}
            {(isLoading || isLoading2) && <LoadingDots color="orange" />}
            {!error && (
              <SubjectList
                onDeleteSubject={deleteSubjectHandler}
                subjects={subjects}
              ></SubjectList>
            )}
          </Container>
        </section>
      </main>
    </>
  );
};

export default Subjects;
