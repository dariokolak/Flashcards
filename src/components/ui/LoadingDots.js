import classes from './LoadingDots.module.css';
const LoadingDots = (props) => {
  const color = props.color ? props.color : 'white';
  const styles = `${classes['lds-ellipsis']} ${classes[color]} ${props.className}`;
  return (
    <div className={styles}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingDots;
