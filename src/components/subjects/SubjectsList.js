import Subject from './Subject';

const SubjectList = (props) => {
  return (
    <ul className="list grid grid__col--3">
      {props.subjects.map((subject) => (
        <Subject
          onDeleteSubject={props.onDeleteSubject}
          name={subject.name}
          _id={subject._id}
          key={subject._id}
        />
      ))}
    </ul>
  );
};

export default SubjectList;
