import Header from '../../layout/header/Header';
import Container from '../../layout/container/Container';

import HeadingPrimary from '../../components/ui/HeadingPrimary';
import classes from './NewSubject.module.css';
import NewSubjectForm from '../../components/forms/NewSubjectForm';

const NewSubject = () => {
  return (
    <>
      <Header></Header>
      <main>
        <section className={classes.section}>
          <Container className="margin-bottom-md-util">
            <HeadingPrimary>Create a new Subject</HeadingPrimary>
          </Container>
          <Container>
            <NewSubjectForm />
          </Container>
        </section>
      </main>
    </>
  );
};

export default NewSubject;
