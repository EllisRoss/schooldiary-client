import styles from './Header.module.css';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {logoutThunkCreator} from "../../redux/authReducer";

const Header = (props) => {
    return (
        <header className={styles.header}>
            <div className={styles.wrapper}>
                <div className={styles.navbar}>
                    <NavLink to='/personal-area' activeClassName={styles.active}>PA</NavLink><> </>
                    <NavLink to='/schedule' activeClassName={styles.active}>Schedule</NavLink><> </>


                </div>

                <div className={styles.loginBlock}>
                    {
                        props.isAuth && <label>{props.firstName} {props.surname} {props.role} <button onClick={props.logout}>Logout</button></label>
                    }
                    {
                        !props.isAuth && <label>
                            <NavLink to='/login' activeClassName={styles.active}>Login</NavLink>
                            <NavLink to='/registration' activeClassName={styles.active}>Registration</NavLink>
                        </label>
                    }
                </div>
            </div>
        </header>
    );
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        firstName: state.auth.firstName,
        surname: state.auth.surname,
        role:  state.auth.role,
    }
};

let mapDispatchToProps = {
    logout: logoutThunkCreator,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);