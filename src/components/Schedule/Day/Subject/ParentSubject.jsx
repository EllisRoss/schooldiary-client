import React, {useState} from "react";
import styles from './Subject.module.css';
import {setScheduleFieldThunkCreator} from "../../../../redux/scheduleReducer";
import {connect} from "react-redux";

const AdminSubject = (props) => {
    let [subject, setSubject] = useState(props.subjectName);
    let [marks, setMarks] = useState(props.marks);
    let [homework, setHomework] = useState(props.subjectHomework);

    let [editModeSubject, setEditModeSubject] = useState(false);
    let [editModeHomework, setEditModeHomework] = useState(false);
    let [editModeMarks, setEditModeMarks] = useState(false);

    // AdminSubject edit mode
    let activateEditModeSubject = () => {
        setEditModeSubject(true);
    }
    let deactivateEditModeSubject = () => {
        setEditModeSubject(false);
        props.setField(props.dayOfWeek, props.index, 'subjectName', subject);
    }

    // Homework edit mode
    let activateEditModeHomework = () => {
        setEditModeHomework(true);
    }
    let deactivateEditModeHomework = () => {
        setEditModeHomework(false);
        props.setField(props.dayOfWeek, props.index, 'subjectHomework', homework);
    }

    // Marks edit mode
    let activateEditModeMarks = () => {
        setEditModeMarks(true);
    }
    let deactivateEditModeMarks = () => {
        setEditModeMarks(false);
        props.setField(props.dayOfWeek, props.index, 'marks', marks);
    }

    // onChange AdminSubject
    let onChangeSubject = (event) => {
        setSubject(event.target.value)

    }

    // onChange homework
    let onChangeHomework = (event) => {
        setHomework(event.target.value)
    }

    // onChange marks
    let onChangeMarks = (event) => {
        setMarks(event.target.value)
    }

    return (
            <div className={styles.wrapper}>
                <span className={styles.index}>{props.index + 1}</span>
                {/*subject field*/}
                <span className={styles.name}>{props.subjectName}</span>
                {/*homework field*/}
                <span className={styles.homework}>{props.subjectHomework}</span>
                {/*marks field*/}
                <span className={styles.marks}>{props.marks}</span>
            </div>
    );
}

let mapDispatchToProps = {
    setField: setScheduleFieldThunkCreator,
}

export default connect(null, mapDispatchToProps)(AdminSubject);