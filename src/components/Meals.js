import React from "react";
import Meal from "./Meal";

export default function Meals({ mealsMain }) {
  return (
    <section className="meals">
      {mealsMain.map((meal, index) => {
        return <Meal meal={meal} key={index} />;
      })}
    </section>
  );
}
