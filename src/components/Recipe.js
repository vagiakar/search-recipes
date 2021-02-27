import React, { useState, useEffect } from "react";
import Loading from "./Loading.js";
import { useParams } from "react-router-dom";

const URL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

export default function Recipe() {
  const { id } = useParams();
  const [formattedMeal, setFormattedMeal] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleMeal();
  }, [id]);

  async function handleMeal() {
    setLoading(true);
    const meal = await getMeal(id);
    console.log(meal);
    const formattedMeal = formatMeal(meal);
    console.log(formattedMeal);
    setFormattedMeal(formattedMeal);
    setLoading(false);
  }

  function formatMeal(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push({
          ingredient: meal[`strIngredient${i}`],
          quantity: meal[`strMeasure${i}`],
        });
      }
    }
    const video = convertUrlToEmbeddedUrl(meal.strYoutube);
    return {
      id: meal.idMeal,
      title: meal.strMeal,
      image: meal.strMealThumb,
      cuisine: meal.strArea,
      category: meal.strCategory,
      instructions: meal.strInstructions,
      ingredients,
      video,
    };
  }

  function convertUrlToEmbeddedUrl(url) {
    const res = url.split("=");
    return "https://www.youtube.com/embed/" + res[1];
  }

  async function getMeal(input) {
    const url = `${URL}${input}`;
    const response = await fetch(url);
    const data = await response.json();
    const meals = data.meals[0];
    return meals;
  }

  if (loading) {
    return <Loading />;
  }
  const {
    title,
    image,
    cuisine,
    category,
    instructions,
    ingredients,
    video,
  } = formattedMeal;
  return (
    <article>
      <h2>{title}</h2>
      <img src={image} alt="meal" />
      <h3>Cuisine:</h3>
      <p>{cuisine}</p>
      <h3>Category:</h3>
      <p>{category}</p>
      <h3>Instructions:</h3>
      <p>{instructions}</p>
      <h3>Ingredients:</h3>
      {ingredients.map((ingredient, index) => {
        return (
          <div key={index}>
            <p>Ingredient: {ingredient.ingredient}</p>
            <p>Quantity: {ingredient.quantity}</p>
          </div>
        );
      })}
      <iframe
        width="560"
        height="315"
        src={video}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </article>
  );
}
