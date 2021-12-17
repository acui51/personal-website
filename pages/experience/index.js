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
            color={theme === "light" ? "#F2F5F899" : "#40404080"}
          />
          <Breadcrumb />
          <h1 className="text-5xl whitespace-nowrap mb-4">Experience</h1>
          <ExperienceBullet
            company="Stripe"
            occupation="Software Engineer Intern"
            dates="Jun 2022 - Sep 2022"
            description={["Incoming Summer 2022"]}
            color="#5433FF"
          />
          <ExperienceBullet
            company="Amazon Web Services"
            occupation="Software Development Engineer Intern"
            dates="Jun 2021 - Sep 2021"
            technologies={[
              "Ruby on Rails",
              "jQuery",
              "SCSS",
              "RSpec",
              "Python",
              "Selenium",
              "AWS suite",
            ]}
            description={[
              "Created the entire front-end of an internal tool that lets PMs and engineers grant API and Console permissions of varying degrees to multiple EC2 users at once.",
              "Conducted user interviews, created mock ups in Figma, and polled project stakeholders weekly to ensure design aligned with user needs.",
              "Developed the entire front-end using Ruby on Rails for templating HTML, jQuery for dynamic client-side logic, and SCSS for styling and responsiveness.",
              "Wrote unit and integration tests with RSpec, Python and Selenium with 90% code coverage percentage.",
              "Contributed to the implementation of a Slackbot notification system using AWS suite (SNS, Chatbot, CloudMetrics).",
            ]}
            color="rgb(255, 153, 0)"
          />
          <ExperienceBullet
            company="The Washington Post"
            color={theme === "light" ? "#212121" : "#aaa"}
            occupation="Software Engineer Intern"
            description={[
              "Engineered the new author byline and author bio components used across almost every article using Next.js and Storybook.",
              "Created an author follow module that lets users receive notifications every time an article by the given author is published.",
              "Wrote unit tests using Jest and Enzyme and end-to-end tests using Cypress to maintain 80% code coverage.",
              "Worked in agile development following scrum methodologies.",
            ]}
            technologies={["Next.js", "Jest", "Enzyme", "Cypress", "Storybook"]}
            dates="Mar 2021 - June 2021"
          />
          <ExperienceBullet
            company="Stanford"
            color="#B83A4B"
            occupation="Full Stack Engineer Intern"
            description={[
              "Converted a logic courseware application to a newly improved web-based application using the MVC design pattern",
              "Refashioned the model component of the design pattern by serializing data from the backend into abstracted components",
              "Integrated REST API endpoints with Java using Jersey",
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
              "Refining the course planning web application and help building a new version from the ground up witha custom design system",
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
          {/* <MeExperience /> */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Experience;
