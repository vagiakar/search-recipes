import "../App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useState } from "react";
import Home from "./Home.js";
import About from "./About.js";
import Error from "./Error.js";
import Navbar from "./Navbar.js";
import Recipe from "./Recipe.js";

function App() {
  const [mealsMain, setMealsMain] = useState([]);
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home mealsMain={mealsMain} setMealsMain={setMealsMain} />
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
