import classes from './Subject.module.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Subject = (props) => {
  const deleteSubjectHandler = () => {
    props.onDeleteSubject(props._id);
  };

  return (
    <li>
      <div className={classes.subject}>
        <NavLink
          className={classes['subject-link']}
          to={`/subjects/${props._id}/flashcards`}
        >
          {props.name}
        </NavLink>
        <div className={classes.options}>
          <NavLink
            className={classes['options-link']}
            to={`/subjects/${props._id}/edit-subject`}
          >
            <FontAwesomeIcon icon={faPen} />
          </NavLink>
          <button
            onClick={deleteSubjectHandler}
            className={classes['options-btn']}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      </div>
    </li>
  );
};

export default Subject;
