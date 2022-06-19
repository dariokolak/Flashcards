import Header from '../../layout/header/Header';
import Container from '../../layout/container/Container';

import HeadingPrimary from '../../components/ui/HeadingPrimary';
import classes from './EditSubject.module.css';
import EditSubjectForm from '../../components/forms/EditSubjectForm';
import { useState, useEffect } from 'react';
import useHttp from '../../hooks/use-http';
import { API_URL } from '../../shared/app.constants';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { useParams } from 'react-router-dom';
import LoadingDots from '../../components/ui/LoadingDots';

const EditSubject = () => {
  const params = useParams();
  const authCtx = useContext(AuthContext);
  const [subject, setSubject] = useState({ name: '', _id: '' });
  const { isLoading, error, sendRequest: fetchSubject } = useHttp();

  useEffect(() => {
    const requestConfig = {
      method: 'GET',
      url: `${API_URL}/api/v1/users/me/subjects/${params.subjectId}?alone=1`,
      headers: {
        Authorization: `${authCtx.token}`,
      },
    };

    const handleSubject = (data) => {
      console.log(data);
      setSubject(data.data.subject);
    };

    fetchSubject(requestConfig, handleSubject);
  }, [fetchSubject]);
  return (
    <>
      <Header></Header>
      <main>
        <section className={classes.section}>
          <Container className="margin-bottom-md-util">
            <HeadingPrimary>Update Subject</HeadingPrimary>
          </Container>
          <Container></Container>
          <Container>
            {error && <p className={classes.error}>{error.message}</p>}
            {isLoading && <LoadingDots color="orange" />}
            {!error && (
              <EditSubjectForm name={subject.name} _id={subject._id} />
            )}
          </Container>
        </section>
      </main>
    </>
  );
};

export default EditSubject;
