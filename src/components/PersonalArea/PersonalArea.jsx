import React, {useEffect, useState} from "react";
//import styles from './Header.module.css';
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";
import {connect} from "react-redux";
import {
    acceptNewUserThunkCreator,
    declineNewUserThunkCreator,
    getNewUsersThunkCreator
} from "../../redux/personalAreaReducer";
import NewUsers from "./NewUsers/NewUsers";

const PersonalArea = (props) => {

    useEffect(() => {
        props.getNewUsers();
    }, []);

    let [newUsers, setNewUsers] = useState(props.newUsers);

    useEffect(() => {
        setNewUsers(props.newUsers);
    }, [props.newUsers]);

    let printNewUsers = newUsers.map(user => {
        return <NewUsers key={user.id}
                         id={user.id}
                         firstName={user.firstName}
                         surname={user.surname}
                         role={user.role}
                         email={user.email}
                         acceptNewUser={props.acceptNewUser}
                         declineNewUser={props.declineNewUser}/>
    });

    if (props.isAdmin) {
        return (
            <div>
                {
                    newUsers.length === 0 && <div>No new users</div>
                }
                <div>{printNewUsers}</div>
            </div>
        );
    } else {
        return (
            <div>
                <h2>Personal Area</h2>
                <div>
                    <label>Name: </label>{props.firstName} {props.surname}
                </div>
                <div>
                    <label>Email: </label>{props.email}
                </div>
                <div>
                    <label>Role: </label>{props.role}
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        newUsers: state.personalAreaPage.newUsers,
        isAdmin: state.auth.isAdmin,
        firstName: state.auth.firstName,
        surname: state.auth.surname,
        email: state.auth.email,
        role: state.auth.role,
    }
}

let mapDispatchToProps = {
    getNewUsers: getNewUsersThunkCreator,
    acceptNewUser: acceptNewUserThunkCreator,
    declineNewUser: declineNewUserThunkCreator,
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect,
)(PersonalArea);