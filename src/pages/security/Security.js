import Header from '../../layout/header/Header';
import Container from '../../layout/container/Container';

import HeadingPrimary from '../../components/ui/HeadingPrimary';
import classes from './Security.module.css';
import UpdatePasswordForm from '../../components/forms/UpdatePasswordForm';
import DeleteAccountForm from '../../components/forms/DeleteAccountForm';

const Security = () => {
  return (
    <>
      <Header></Header>
      <main>
        <section className={classes.section}>
          <Container className="margin-bottom-md-util">
            <HeadingPrimary>Update your password</HeadingPrimary>
          </Container>
          <Container className="margin-bottom-md-util">
            <UpdatePasswordForm />
          </Container>
          <Container className="margin-bottom-md-util">
            <HeadingPrimary>Delete your account</HeadingPrimary>
          </Container>
          <Container>
            <DeleteAccountForm />
          </Container>
        </section>
      </main>
    </>
  );
};

export default Security;
