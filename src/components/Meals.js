import React from "react";
import Meal from "./Meal";

export default function Meals({ mealsMain }) {
  return (
    <section className="meals">
      <div className="meals-container">
        {mealsMain.map((meal, index) => {
          return <Meal meal={meal} key={index} />;
        })}
      </div>
    </section>
  );
}
