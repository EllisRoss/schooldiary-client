import React from "react";
import {Route} from 'react-router-dom';
import './App.css';
import Preloader from "./components/common/Preloader/Preloader";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import PersonalArea from "./components/PersonalArea/PersonalArea";
import Registration from "./components/Registration/Registration";
import Schedule from "./components/Schedule/Schedule";
import {setInitializedThunkCreator} from "./redux/appReducer";
import {connect} from "react-redux";

class App extends React.Component {

    componentDidMount() {
        this.props.initialize();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        } else {
            return (
                <div className='app-wrapper'>
                    <Header/>
                    <div className='app-wrapper-content'>
                        <Route path='/login' render={() => <Login/>}/>
                        <Route path='/registration' render={() => <Registration/>}/>
                        <Route path='/personal-area' render={() => <PersonalArea/>}/>
                        <Route path='/schedule' render={() => <Schedule/>}/>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
})

let mapDispatchToProps = {
    initialize: setInitializedThunkCreator,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
