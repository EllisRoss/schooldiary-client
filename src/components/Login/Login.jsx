import React, {useEffect, useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {loginThunkCreator} from "../../redux/authReducer";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

//import styles from './Header.module.css';

const Login = (props) => {
    let [serverError, setServerError] = useState(props.loginError);

    useEffect(() => {
        setServerError(props.loginError)
    }, [props.loginError]);

    if (props.isAuth) {
        return <Redirect to={'/schedule'}/>
    } else {
        return (
            <div>
                <h2>Login</h2>
                <Formik
                    initialValues={{email: '', password: ''}}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }

                        if (!values.password) {
                            errors.password = 'Required';
                        }
                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                        props.login(values.email, values.password);
                        setTimeout(() => {
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({isSubmitting}) => (
                        <Form>
                            {
                                serverError && <label>{serverError}</label>
                            }
                            <div>
                                <Field type="email" name="email" placeholder={'email'}/>{' '}
                                <ErrorMessage name="email" component="div"/>
                            </div>
                            <br/>
                            <div>
                                <Field type="password" name="password" placeholder={'password'}/>{' '}
                                <ErrorMessage name="password" component="div"/>
                            </div>
                            <br/>
                            <div>
                                <button type="submit" disabled={isSubmitting}>
                                    Login
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        loginError: state.auth.loginError,
        isAuth: state.auth.isAuth,
    }
}

let mapDispatchToProps = {
    login: loginThunkCreator,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);