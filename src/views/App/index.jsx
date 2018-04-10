/**
 * IMPORTS:
 * react
 * react-jss
 * prop-types
 */
import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
/**
 * COMPONENTS:
 * Button
 * Message
 * Header
 */
import Header from "./../../components/Header";
import Bigchain from "./../Bigchain";

const styles = {
  "@import": "https://fonts.googleapis.com/css?family=Source+Sans+Pro",
  "@global html, body": {
    fontFamily: "Source Sans Pro",
    margin: 0,
    padding: 0
  },
  App: {
    textAlign: "center"
  },
  intro: {
    fontSize: "large"
  }
};

const App = ({ classes }) => (
  <div className={classes.App}>
    <Header title="A React boilerplate, with Parcel!"/>
    <div className={classes.intro}>
      <Bigchain/>
    </div>
  </div>
);

/**
 * PROPTYPES:
 * classes: object
 */
App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(App);
