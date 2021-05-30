import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Head from "next/head";
import ToggleButton from "components/ToggleButton";
import Breadcrumb from "components/Breadcrumb";
import Bubble2 from "assets/svg-js/Bubble2";
import MeProjects from "assets/svg-js/MeProjects";
import ProjectCard from "./components/ProjectCard";

export default function ProjectsCard() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center justify-center py-2 px-4">
      <Head>
        <title>Projects</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col md:flex-row justify-center w-full md:w-8/12 relative">
        <div>
          <ToggleButton />
          <Bubble2
            className="absolute z-[-1] -left-24 -top-20"
            color={theme === "light" ? "#F2F5F8" : "#40404080"}
          />
          <Breadcrumb />
          <h1 className="text-5xl whitespace-nowrap mb-4">Projects</h1>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <ProjectCard
              name="Telehistory"
              description="A web app that charts and analyzes data from your chat history on the popular messaging app, Telegram."
              technologies={[
                "Next.js",
                "TypeScript",
                "TailwindCSS",
                "Nivo Graphs",
                "Parallel Dots API",
              ]}
              github="https://github.com/acui51/telehistory-v2.1"
              gif="/telehistorydemo.gif"
            />
            <ProjectCard
              name="Applied Learning Initiative"
              description="A web app that allows students to find research opportunities with various PIs."
              technologies={[
                "React.js",
                "Redux",
                "TypeScript",
                "Node.js",
                "MongoDB",
                "Firebase",
              ]}
              github="https://github.com/acui51/ali-site"
              gif="/alidemo.gif"
            />
            <ProjectCard
              name="Sprout"
              description="A hi-fidelity prototype for an app that allows creators to train together sounds and connect effortlessly."
              technologies={["React Native", "Expo", "Firebase"]}
              github="https://github.com/acui51/sprout-app"
              gif="/sproutdemo.gif"
            />
          </div>
        </div>
        <div className="self-center mt-4 md:self-start md:ml-4 md:mt-16">
          <MeProjects />
        </div>
      </main>
    </div>
  );
}
