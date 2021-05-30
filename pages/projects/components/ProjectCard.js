import React from "react";
import Image from "next/image";
import Technology from "pages/experience/components/Technology";
import { AiFillGithub } from "react-icons/ai";
import { useTheme } from "next-themes";

const ProjectCard = ({ technologies, name, description, github, gif }) => {
  const { theme } = useTheme();

  return (
    <div
      className="w-72 h-96 rounded-2xl shadow-lg bg-white relative"
      style={{ backgroundColor: theme === "dark" && "#2C2C2C" }}
    >
      <a href={github}>
        <AiFillGithub className="absolute left-2 bottom-2" size={24} />
      </a>
      <Image
        src={gif}
        alt={`${name} demo`}
        width={300}
        height={128}
        layout="responsive"
        className="rounded-t-2xl"
      />
      <div className="ml-2">
        <h1 className="text-xl font-medium mt-2">{name}</h1>
        <p>{description}</p>
        <div className="flex flex-wrap">
          {technologies &&
            technologies.map((technology, i) => (
              <Technology key={i}>{technology}</Technology>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
