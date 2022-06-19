import Header from '../../layout/header/Header';
import Container from '../../layout/container/Container';

import HeadingPrimary from '../../components/ui/HeadingPrimary';
import classes from './Profile.module.css';
import ProfileDataForm from '../../components/forms/ProfileDataForm';

const Profile = () => {
  return (
    <>
      <Header></Header>
      <main>
        <section className={classes.section}>
          <Container className="margin-bottom-md-util">
            <HeadingPrimary>Update Your Profile Data</HeadingPrimary>
          </Container>
          <Container>
            <ProfileDataForm />
          </Container>
        </section>
      </main>
    </>
  );
};

export default Profile;
