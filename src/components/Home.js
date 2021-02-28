import React, { useState, useEffect } from "react";
import Meals from "./Meals.js";
import Notification from "./Notification.js";
import Loading from "./Loading.js";

const URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

export default function Home({ mealsMain, setMealsMain }) {
  const [searchInput, setSearchInput] = useState("");

  const [notification, setNotification] = useState({
    notFound: false,
    type: "",
    text: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (mealsMain.length === 0) {
      handleMeals("chicken");
    } else {
      setLoading(false);
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (searchInput === "") {
      setNotification({
        notFound: true,
        type: "danger",
        text: "Please enter a value",
      });
      return;
    }

    handleMeals(searchInput);
  }

  async function handleMeals(input) {
    setLoading(true);
    const meals = await getMeals(input);
    setLoading(false);
    if (!meals) {
      setNotification({
        notFound: true,
        type: "danger",
        text: "Meal not found",
      });
      return;
    }

    setNotification({ notFound: false, type: "", text: "" });
    const formattedMealsMain = formatMealsMain(meals);
    setMealsMain(formattedMealsMain);
  }

  async function getMeals(input) {
    const url = `${URL}${input}`;
    const response = await fetch(url);
    const data = await response.json();
    const meals = data.meals;
    return meals;
  }

  function formatMealsMain(meals) {
    return meals.map((meal) => {
      return { title: meal.strMeal, image: meal.strMealThumb, id: meal.idMeal };
    });
  }

  return (
    <>
      <section className="search">
        <h1>Search Recipes</h1>
        <form className="search-form" onSubmit={(e) => handleSubmit(e)}>
          <input
            className="search-input"
            type="text"
            value={searchInput}
            placeholder="e.g. chicken"
            onChange={(e) => setSearchInput(e.target.value)}
          ></input>
          <button className="btn search-btn">Search</button>
          {notification.notFound && (
            <Notification
              notification={notification}
              setNotification={setNotification}
            />
          )}
        </form>
      </section>
      {loading ? <Loading /> : <Meals mealsMain={mealsMain} />}
    </>
  );
}
