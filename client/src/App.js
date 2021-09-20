import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { showTrack, changeTrack } from "./actions/action.js";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

class App extends Component {
  change = () => {
    console.log("Changed.");
    this.props.appChangeTrack(this.refs.track.value);
  };
  render() {
    return (
      <>
        <div className="App">
          <h1 className="AppTitle">{this.props.appTrack}</h1>
          <p className="AppIntro">
            <input type="text" className="" ref="track" />

            <button className="" onClick={() => this.change()}>
              Change Track
            </button>
          </p>
        </div>

        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Home} />
        </Switch>
      </>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    appTrack: state.track,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    appShowTrack: () => dispatch(showTrack()),
    appChangeTrack: (data) => dispatch(changeTrack(data)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
