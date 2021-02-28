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
    const formattedMeal = formatMeal(meal);
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
    const urlArray = url.split("=");
    if (!urlArray[1]) return null;
    return "https://www.youtube.com/embed/" + urlArray[1];
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
    <article className="recipe">
      <div className="recipe-container">
        <div className="recipe-basic-info">
          <h2 className="recipe-title">{title}</h2>
          <h3 className="cuisine">Cuisine</h3>
          <p>{cuisine}</p>
          <h3 className="category">Category</h3>
          <p>{category}</p>
        </div>
        <div className="recipe-grid">
          <img src={image} alt="meal" />
          <div className="recipe-ingredients">
            <h3 className="recipe-header">Ingredients</h3>
            {ingredients.map((ingredient, index) => {
              return (
                <div key={index}>
                  <p>
                    <span className="ingredient">{ingredient.ingredient}</span>:{" "}
                    <span className="quantity">{ingredient.quantity}</span>
                  </p>
                </div>
              );
            })}
          </div>
          <div className="recipe-instrunctions">
            <h3 className="recipe-header">Instructions</h3>
            <p>{instructions}</p>
          </div>
        </div>
        {video && (
          <div className="container-frame">
            <iframe
              className="responsive-iframe"
              width="560"
              height="315"
              src={video}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </article>
  );
}
