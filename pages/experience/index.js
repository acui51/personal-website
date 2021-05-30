import React, { useState, useEffect } from "react";
import Head from "next/head";
import Breadcrumb from "components/Breadcrumb";
import ToggleButton from "components/ToggleButton";
import Footer from "components/Footer";
import ExperienceBullet from "./components/ExperienceBullet";
import Bubble2 from "assets/svg-js/Bubble2";
import { useTheme } from "next-themes";
import MeExperience from "assets/svg-js/MeExperience";

const Experience = () => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => setMounted(true), []);

  // When client is not mounted, render nothing
  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center justify-center py-2 px-4">
      <Head>
        <title>Experience</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToggleButton />
      <main className="flex flex-col md:flex-row justify-center w-full md:w-8/12 relative">
        <div className="relative">
          <Bubble2
            className="absolute z-[-1] -left-24 -top-20"
            color={theme === "light" ? "#F2F5F8" : "#40404080"}
          />
          <Breadcrumb />
          <h1 className="text-5xl whitespace-nowrap mb-4">Experience</h1>
          <ExperienceBullet
            company="Amazon"
            occupation="Software Development Engineer Intern"
            dates="Jun 2021 - Sep 2021"
            description={["Incoming Summer 2021 (AWS)"]}
            color="rgb(255, 153, 0)"
          />
          <ExperienceBullet
            company="The Washington Post"
            color={theme === "light" ? "#212121" : "#aaa"}
            occupation="Software Engineer Intern"
            description={[
              "Building front-end components using React.js for the home and article pages",
              "Writing unit tests using Jest and Enzyme and E2E tests using Cypress",
              "Working in agile development following scrum methodologies",
            ]}
            technologies={["Next.js", "Jest", "Enzyme", "Cypress", "Storybook"]}
            dates="Mar 2021 - June 2021"
          />
          <ExperienceBullet
            company="Stanford"
            color="#B83A4B"
            occupation="Full Stack Engineer Intern"
            description={[
              "Converting a logic courseware application to a newly improved web-based application using the MVC paradigm",
              "Refashioned the model component of the design pattern by serializing data from the backend into abstracted components",
              "Integrating REST API endpoints with Java using Jersey",
              "Migrated from Bootstrap V3 to Bootstrap V4 with a complete responsive redesign of the application chrome",
            ]}
            technologies={[
              "JavaScript (ES6)",
              "jQuery",
              "Java",
              "Subversion SVN",
            ]}
            dates="Jun 2020 - April 2021"
          />
          <ExperienceBullet
            company="Stanford Carta"
            color="#B83A4B"
            occupation="Front-end Engineer"
            description={[
              "Improving on Carta V2 and help building Carta V3 from the ground up",
              <a
                href="http://carta-beta.stanford.edu/"
                target="_blank"
                rel="noreferrer"
                className="border-b hover:border-b-0"
              >
                {" "}
                Carta V2{" "}
              </a>,
            ]}
            technologies={["React", "Redux", "TypeScript", "Storybook"]}
            dates="Sep 2020 - Present"
          />
        </div>
        <div className="self-center md:self-start md:mt-16">
          <MeExperience />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Experience;
