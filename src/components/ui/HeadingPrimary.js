import classes from './HeadingPrimary.module.css';

const HeadingPrimary = (props) => {
  return <h1 className={classes['heading-primary']}>{props.children}</h1>;
};

export default HeadingPrimary;
