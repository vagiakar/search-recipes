import "../App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Home from "./Home.js";
import About from "./About.js";
import Error from "./Error.js";
import Navbar from "./Navbar.js";
import Recipe from "./Recipe.js";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/recipe/:id">
            <Recipe />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
