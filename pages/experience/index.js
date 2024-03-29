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
        <link
          rel="icon"
          href={theme === "light" ? "/mountain.png" : "/volcano.png"}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href={theme === "light" ? "/mountain.png" : "/volcano.png"}
        />
      </Head>
      <ToggleButton />
      <main className="flex flex-col md:flex-row justify-center w-full md:w-8/12 relative max-w-7xl">
        <div className="relative">
          <Bubble2
            className="absolute z-[-1] -left-24 -top-20"
            color={theme === "light" ? "#F2F5F899" : "#40404080"}
          />
          <Breadcrumb />
          <h1 className="text-5xl whitespace-nowrap mb-4">Experience</h1>
          <ExperienceBullet
            company="Glean"
            occupation="Software Engineer Intern"
            dates="Mar 2022 - Sep 2022"
            description={[
              "Reduced search latency from the new tab page by 300ms on average by reprioritzing the data request and firing it in parallel with results page startup",
              "Cut root bundlesize by 10% through a process of dynamic importing, lazy-loading, and Webpack optimizations",
              "Developed an entirely new page for product updates that utilizes Contentful CMS to serve content",
              "Full stack development for our people and directory product utilizing Go, React, and TypeScript",
              "Improved the consistency and robustness of our design system by utilizing Storybook and better categorizing our components in the codebase",
              "Met some of the most talented, nicest, and funniest engineers ever 😄",
            ]}
            color={theme === "light" ? "#333CED" : "#FFFFFFE6"}
            technologies={[
              "React",
              "TypeScript",
              "Redux",
              "Vanilla Extract",
              "Webpack",
              "Go",
            ]}
          />
          <ExperienceBullet
            company="Kleiner Perkins"
            occupation="Engineering Fellow"
            dates="Jun 2022 - "
            description={["Fellowship", "Met a bunch of cool people on a boat"]}
            color={theme === "light" ? "#000000" : "#FFFFFFE6"}
          />
          <ExperienceBullet
            company="Stanford"
            occupation="Co-Instructor"
            dates="Jan 2022 - Mar 2022"
            description={[
              "Co-led and taught Stanford's CS47: Cross-platform Mobile App Development in React Native.",
              "Gave lectures on React Native topics such as JavaScript basics, hooks, and React Navigation.",
              "Created two new assignments from scratch.",
              "Held weekly office hours.",
            ]}
            technologies={["React Native", "Expo"]}
            color="#B83A4B"
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
