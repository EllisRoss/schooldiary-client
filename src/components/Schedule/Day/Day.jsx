import React, {useEffect} from "react";
import styles from './Day.module.css';
import AdminSubject from "./Subject/AdminSubject";
import {connect} from "react-redux";
import TeacherSubject from "./Subject/TeacherSubject";
import StudentSubject from "./Subject/StudentSubject";
import ParentSubject from "./Subject/ParentSubject";

const STUDENT_ROLE = 'student';
const TEACHER_ROLE = 'teacher';
const PARENT_ROLE = 'parent';

const Day = React.memo((props) => {

    // useEffect(() => {}, [props])

    let printAdminSubjects = props.subjects.map((subject, i) => {
        let key = props._id + i.toString();
        //console.log(key)
        return <AdminSubject key={key}
                        _id={key}
                        _ObjectId={props._id}
                        index={i}
                        subjectName={subject.subjectName}
                        subjectHomework={subject.subjectHomework}
                        marks={subject.marks}
                        dayOfWeek={props.dayOfWeek}
        />
    })
    let printTeacherSubjects = props.subjects.map((subject, i) => {
        let key = props._id + i.toString();
        //console.log(key)
        return <TeacherSubject key={key}
                             _id={key}
                             _ObjectId={props._id}
                             index={i}
                             subjectName={subject.subjectName}
                             subjectHomework={subject.subjectHomework}
                             marks={subject.marks}
                             dayOfWeek={props.dayOfWeek}
        />
    })
    let printStudentSubjects = props.subjects.map((subject, i) => {
        let key = props._id + i.toString();
        //console.log(key)
        return <StudentSubject key={key}
                             _id={key}
                             _ObjectId={props._id}
                             index={i}
                             subjectName={subject.subjectName}
                             subjectHomework={subject.subjectHomework}
                             marks={subject.marks}
                             dayOfWeek={props.dayOfWeek}
        />
    })
    let printParentSubjects = props.subjects.map((subject, i) => {
        let key = props._id + i.toString();
        //console.log(key)
        return <ParentSubject key={key}
                             _id={key}
                             _ObjectId={props._id}
                             index={i}
                             subjectName={subject.subjectName}
                             subjectHomework={subject.subjectHomework}
                             marks={subject.marks}
                             dayOfWeek={props.dayOfWeek}
        />
    })
    return (
        <div>
            <div className={styles.dayOfWeek}>{props.dayOfWeek}</div>
            <div className={styles.subjectsWrapper}>
                <span className={styles.number}>№</span>
                <span className={styles.subject}>Subject</span>
                <span className={styles.homework}>Home Work</span>
                <span className={styles.marks}>Marks</span>
            </div>
            <div>
                { props.isAdmin && printAdminSubjects }
                { props.role === TEACHER_ROLE && printTeacherSubjects }
                { props.role === STUDENT_ROLE && printStudentSubjects }
                { props.role === PARENT_ROLE && printParentSubjects }
            </div>
        </div>
    );
})

let mapStateToProps = (state) => {
    return {
        role: state.auth.role,
        isAdmin: state.auth.isAdmin,
    }
}

export default connect(mapStateToProps, null)(Day);