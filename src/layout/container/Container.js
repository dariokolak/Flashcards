import classes from './Container.module.css';

const Container = (props) => {
  const styles = `${classes.container} ${
    props.className ? props.className : ''
  }`;
  return <div className={styles}>{props.children}</div>;
};

export default Container;
