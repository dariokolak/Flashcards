import Header from '../../layout/header/Header';
import Container from '../../layout/container/Container';

import HeadingPrimary from '../../components/ui/HeadingPrimary';
import classes from './NewFlashcard.module.css';
import NewFlashcardForm from '../../components/forms/NewFlashcardForm';
import { useParams } from 'react-router-dom';

const NewFlashcard = () => {
  const params = useParams();
  return (
    <>
      <Header></Header>
      <main>
        <section className={classes.section}>
          <Container className="margin-bottom-md-util">
            <HeadingPrimary>Create a new Flashcard</HeadingPrimary>
          </Container>
          <Container>
            <NewFlashcardForm subjectId={params.subjectId} />
          </Container>
        </section>
      </main>
    </>
  );
};

export default NewFlashcard;
