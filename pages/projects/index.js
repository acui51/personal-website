import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Head from "next/head";
import ToggleButton from "components/ToggleButton";
import Breadcrumb from "components/Breadcrumb";
import Bubble2 from "assets/svg-js/Bubble2";
import MeProjects from "assets/svg-js/MeProjects";
import ProjectCard from "./components/ProjectCard";
import Footer from "components/Footer";
import { useRouter } from "next/router";

export default function ProjectsCard() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center justify-center py-2 px-4">
      <Head>
        <title>Projects</title>
        <link
          rel="icon"
          href={theme === "light" ? "/mountain.png" : "/volcano.png"}
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
          <h1 className="text-5xl whitespace-nowrap mb-4">Projects</h1>
          <div className="flex flex-wrap justify-center md:justify-start">
            <ProjectCard
              name="rizzGPT"
              technologies={["Next.js", "GPT", "Whisper", "Brilliant Monocle"]}
              github="https://twitter.com/bryanhpchiang/status/1639830383616487426"
              gif="/rizzgpt.jpeg"
            >
              Real-time Charisma as a Service (CaaS) that listens to your
              conversation and tells you exactly what to say next.
            </ProjectCard>
            <ProjectCard
              name="Hubble"
              technologies={["Next.js", "Typescript", "Supabase", "OpenAI"]}
              github="https://hubble-waitlist.vercel.app/"
              gif="/hubble.png"
            >
              Making your housing search easier by aggregating and automating
              the process with our nifty dashboard and Chrome extension.
            </ProjectCard>
            <ProjectCard
              name="Storytracker"
              technologies={[
                "Next.js",
                "Typescript",
                "Hugging Face",
                "Supabase",
              ]}
              github="https://github.com/acui51/homepage-compare"
              gif="/storytracker.png"
            >
              <p>
                A neat way to compare newsroom homepages using scraping and AI.
              </p>
            </ProjectCard>
            <ProjectCard
              name="Race me"
              technologies={["Next.js", "TailwindCSS", "Firebase"]}
              github="https://github.com/acui51/personal-website"
              gif="/race-me.gif"
            >
              <p>
                A{" "}
                <a
                  className="border-b border-gray-600 hover:border-b-0 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push("/race-me");
                  }}
                >
                  page
                </a>{" "}
                on my personal website that allows users to compare their typing
                abilities to mine.
              </p>
            </ProjectCard>
            <ProjectCard
              name="Telehistory"
              technologies={[
                "Next.js",
                "TypeScript",
                "TailwindCSS",
                "Nivo Graphs",
              ]}
              github="https://github.com/acui51/telehistory-v2.1"
              gif="/telehistorydemo.gif"
            >
              <p>
                A web app that charts and analyzes data from your chat history
                on the popular messaging app, Telegram.
              </p>
            </ProjectCard>
            <ProjectCard
              name="Applied Learning Initiative"
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
            >
              <p>
                A web app that allows students to find research opportunities
                with various PIs.
              </p>
            </ProjectCard>
            <ProjectCard
              name="Sprout"
              technologies={["React Native", "Expo", "Firebase"]}
              github="https://github.com/acui51/sprout-app"
              gif="/sproutdemo.gif"
            >
              <p>
                A hi-fidelity prototype for an app that allows creators to train
                together sounds and connect effortlessly.
              </p>
            </ProjectCard>
          </div>
        </div>
        <div className="self-center mt-4 md:self-start md:ml-4 md:mt-16">
          {/* <MeProjects /> */}
        </div>
      </main>
      <Footer />
    </div>
  );
}
