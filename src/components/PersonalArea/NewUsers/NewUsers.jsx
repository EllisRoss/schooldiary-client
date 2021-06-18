import React from "react";
import styles from "./NewUsers.module.css";


const NewUsers = (props) => {

    let name = `${props.firstName} ${props.surname}`;

    let onAccept = () => {
        props.acceptNewUser(props.id);
    }

    let onDecline = () => {
        props.declineNewUser(props.id);
    }

    return (
        <div className={styles.wrapper}>
            <div>
                <label>Name: </label>
                {name}
            </div>

            <div>
                <label>Email: </label>
                {props.email}
            </div>

            <div>
                <label>Role: </label>
                {props.role}
            </div>

            <button onClick={onAccept}>Accept</button>
            <button onClick={onDecline}>Decline</button>
        </div>
    );
}

export default NewUsers;