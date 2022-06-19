import classes from './Auth.module.css';

import Container from '../../layout/container/Container';

import HeadingPrimary from '../../components/ui/HeadingPrimary';
import SignUpForm from '../../components/forms/SignUpForm';
import LoginForm from '../../components/forms/LoginForm';
import { useState } from 'react';

const Auth = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const toggleForms = () => {
    setIsLoginForm((prevState) => !prevState);
  };
  return (
    <>
      <header className={classes.header}>
        <Container>
          <HeadingPrimary>Flash cards</HeadingPrimary>
        </Container>
      </header>
      <main>
        <section className={classes.section}>
          {!isLoginForm && (
            <Container className="margin-bottom-sm-util">
              <h2 className={classes['heading-secondary']}>
                Create a new Account
              </h2>
            </Container>
          )}
          <Container>
            {isLoginForm && <LoginForm onChangeForm={toggleForms} />}
            {!isLoginForm && <SignUpForm onChangeForm={toggleForms} />}
          </Container>
        </section>
      </main>
    </>
  );
};

export default Auth;
