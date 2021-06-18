import React, {useEffect, useState} from "react";
// import styles from './Schedule.module.css';
import Day from "./Day/Day";
import {connect} from "react-redux";
import {getScheduleThunkCreator} from "../../redux/scheduleReducer";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";

const Schedule = (props) => {

    useEffect(() => {
        props.getSchedule()
    },[]);

    let [schedule, setSchedule] = useState(props.schedule);

    useEffect(() => {
        setSchedule(props.schedule);
    },[props.schedule]);

    let schedulePrint = schedule.map(day => {
        return <Day key={day._id} dayOfWeek={day.dayOfWeek} subjects={day.subjects}/>
    })

    return (
        <div>
            {schedulePrint}
        </div>
    );
}

let mapStateToProps = state => {
    return {
        schedule: state.schedulePage.schedule
    }
}

let mapDispatchToProps = {
    getSchedule: getScheduleThunkCreator,
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect,
)(Schedule);