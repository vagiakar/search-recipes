import React from "react";
import { Link } from "react-router-dom";

export default function Meal({ meal }) {
  const { title, image, id } = meal;
  return (
    <Link to={`/recipe/${id}`}>
      <article className="meal">
        <h1>{title}</h1>
        <img src={image} alt="meal"></img>
      </article>
    </Link>
  );
}
