import React from "react";
import Image from "next/image";
import Technology from "pages/experience/components/Technology";
import { AiFillGithub } from "react-icons/ai";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";

const ProjectCard = ({ technologies, name, github, gif, children }) => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <div
      className="w-64 h-108 rounded-2xl shadow-lg bg-white relative mr-4 mb-4 cursor-pointer dark:text-gray-200
      transition duration-200 ease-in-out transform hover:scale-105"
      style={{ backgroundColor: theme === "dark" && "#2C2C2C" }}
      onClick={() => router.push(github)}
    >
      <a href={github}>
        <AiFillGithub className="absolute left-2 bottom-2" size={32} />
      </a>
      <Image
        src={gif}
        alt={`${name} demo`}
        width={300}
        height={128}
        layout="responsive"
        objectFit="cover"
        className="rounded-t-2xl"
      />
      <div className="p-3">
        <h1 className="text-xl font-medium">{name}</h1>
        {children}
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
