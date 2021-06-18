//import styles from './Header.module.css';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {registrationThunkCreator} from "../../redux/authReducer";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const Registration = (props) => {

    if (props.isAuth) {
        return <Redirect to={'/schedule'} />
    }

    return (
        <div>
            <h2>Registration</h2>
            <Formik
                initialValues={{firstName: '', surname: '', email: '', password: '', confirmPassword: '', role: 'student'}}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }

                    if (!values.firstName) {
                        errors.firstName = 'Required';
                    }

                    if (!values.surname) {
                        errors.surname = 'Required';
                    }

                    if (!values.password) {
                        errors.password = 'Required';
                    }
                    if (!values.confirmPassword) {
                        errors.confirmPassword = 'Required';
                    }

                    if (values.password !== values.confirmPassword) {
                        errors.confirmPassword = 'passwords not equal';
                    }
                    return errors;
                }}
                onSubmit={(values, {setSubmitting}) => {
                    props.registration(values);
                    setTimeout(() => {
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({isSubmitting}) => (
                    <Form>
                        <div>
                            <Field name="firstName" placeholder={'First name'}/>{' '}
                            <ErrorMessage name="firstName" component="div"/>
                        </div>
                        <br />
                        <div>
                            <Field name="surname" placeholder={'Surname'}/>{' '}
                            <ErrorMessage name="surname" component="div"/>
                        </div>
                        <br />
                        <div>
                            <Field type="email" name="email" placeholder={'Email'}/>{' '}
                            <ErrorMessage name="email" component="div"/>
                        </div>
                        <br />
                        <div>
                            <Field type="password" name="password" placeholder={'Password'}/>{' '}
                            <ErrorMessage name="password" component="div"/>
                        </div>
                        <br/>
                        <div>
                            <Field type="password" name="confirmPassword" placeholder={'Confirm password'}/>{' '}
                            <ErrorMessage name="confirmPassword" component="div"/>
                        </div>
                        <br/>
                        <div>
                            <Field as="select" name="role">
                                <option value="parent">Parent</option>
                                <option value="student">Student</option>
                                <option value="teacher">Teacher</option>
                            </Field>
                        </div>
                        <br />
                        <div>
                            <button type="submit" disabled={isSubmitting}>
                                Register
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
    }
}

let mapDispatchToProps = {
    registration: registrationThunkCreator,
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);