import {Redirect} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
});

export const LoginRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (this.props.isAuth) return (<Redirect to={'/schedule'}/>);
            return <Component {...this.props} />
        }
    }

    let loginRedirectComponent = connect(mapStateToProps)(RedirectComponent);
    return loginRedirectComponent;
}
