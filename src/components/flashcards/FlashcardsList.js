import Flashcard from './Flashcard';

const FlashcardsList = (props) => {
  return (
    <ul className="list grid grid__col--3">
      {props.flashcards.map((flashcard) => (
        <Flashcard
          onDeleteFlashcard={props.onDeleteFlashcard}
          onUpdateFlashCard={props.onUpdateFlashCard}
          question={flashcard.question}
          answer={flashcard.answer}
          subjectId={props.subjectId}
          _id={flashcard._id}
          key={flashcard._id}
          done={flashcard.done}
        />
      ))}
    </ul>
  );
};

export default FlashcardsList;
