import { useState } from 'react';
import classes from './Flashcard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faTrashAlt,
  faCheck,
  faBook,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const Flashcard = (props) => {
  console.log(props.done);
  const [isClicked, setIsClicked] = useState(false);
  const rotationHandler = () => {
    setIsClicked((val) => !val);
  };
  const styles = `${classes.card} ${isClicked ? classes['card--clicked'] : ''}`;

  const deleteHandler = () => {
    props.onDeleteFlashcard(props._id);
  };

  const updateFlashcardHandler = () => {
    props.onUpdateFlashCard(props._id, !props.done);
  };

  return (
    <li className={styles}>
      <div
        className={`${classes['card__side']} ${classes['card__side--front']} `}
      >
        <div
          onClick={rotationHandler}
          className={`${classes['card__question']} ${
            props.done
              ? classes['card__question--done']
              : classes['card__question--not-done']
          }`}
        >
          <p>{props.question}</p>
        </div>
        <div className={classes['card__options']}>
          <button
            onClick={updateFlashcardHandler}
            className={classes['card__options-btn']}
          >
            <FontAwesomeIcon icon={props.done ? faBook : faCheck} />
          </button>
          <NavLink
            className={classes['card__options-link']}
            to={`/subjects/${props.subjectId}/flashcards/${props._id}/edit-flashcard`}
          >
            <FontAwesomeIcon icon={faPen} />
          </NavLink>
          <button
            onClick={deleteHandler}
            className={classes['card__options-btn']}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      </div>
      <div
        onClick={rotationHandler}
        className={`${classes['card__side']} ${classes['card__side--back']}`}
      >
        <p>{props.answer}</p>
      </div>
    </li>
  );
};

export default Flashcard;
