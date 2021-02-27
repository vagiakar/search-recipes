import React, { useState, useEffect } from "react";
import Meals from "./Meals.js";
import Notification from "./Notification.js";
import Loading from "./Loading.js";

const URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [mealsMain, setMealsMain] = useState([]);
  const [notification, setNotification] = useState({
    notFound: false,
    type: "",
    text: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleMeals("chicken");
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
    console.log(meals);
    setLoading(false);
    if (!meals) {
      setNotification({
        notFound: true,
        type: "danger",
        text: "Meal not found",
      });
      return;
    }

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
            type="text"
            value={searchInput}
            placeholder="e.g. chicken"
            onChange={(e) => setSearchInput(e.target.value)}
          ></input>
          {notification.notFound && (
            <Notification
              notification={notification}
              setNotification={setNotification}
            />
          )}
          <button>Search</button>
        </form>
      </section>
      {loading ? <Loading /> : <Meals mealsMain={mealsMain} />}
    </>
  );
}
