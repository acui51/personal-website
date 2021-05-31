import React from "react";
import Technology from "./Technology";

const ExperienceBullet = ({
  description,
  technologies,
  occupation,
  dates,
  color,
  company,
}) => {
  const descriptionList =
    description &&
    description.map((elem, id) => {
      return (
        <li className="mb-1" key={id}>
          » {elem}
        </li>
      );
    });

  const technologyList =
    technologies &&
    technologies.map((elem, id) => {
      return <Technology key={id}>{elem}</Technology>;
    });

  return (
    <div className="mb-7 flex flex-col md:flex-row">
      <div className="md:w-6/12">
        <h2 className="text-4xl mb-1" style={{ color: color }}>
          {company}
        </h2>
        <h3 className="text-xl mb-1 dark:text-gray-200">{occupation}</h3>
        <h4 className="mb-1">{dates}</h4>
      </div>

      <div className="md:w-8/12 ml-4 mt-1 md:mt-0 dark:text-gray-200">
        <ul>{descriptionList}</ul>
        <div className="flex flex-wrap mt-2">{technologyList}</div>
      </div>
    </div>
  );
};

export default ExperienceBullet;
