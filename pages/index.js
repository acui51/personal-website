import { useState, useEffect } from "react";
import Head from "next/head";
import Breadcrumb from "components/Breadcrumb";
import ToggleButton from "components/ToggleButton";
import {
  AiFillGithub,
  AiFillFilePdf,
  AiFillLinkedin,
  AiFillMail,
} from "react-icons/ai";
import Bubble2 from "assets/svg-js/Bubble2";
import { useTheme } from "next-themes";
import Footer from "components/Footer";
import { useRouter } from "next/router";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const router = useRouter();

  // When mounted on client, we can show UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 px-4">
      <Head>
        <title>Alix Cui</title>
        <link
          rel="icon"
          href={theme === "light" ? "/mountain.png" : "/volcano.png"}
        />
        <meta property="og:title" content="Alix Cui's Personal Website" />
        <meta
          property="og:description"
          content="A place that displays my experience and various projects."
        />
        <meta
          property="og:image"
          content="https://drive.google.com/file/d/1Z43CKCP7CN6aKdrx0NcTcPVDvs7TqtY_/view?usp=sharing"
        />
      </Head>
      <ToggleButton />
      <main className="h-screen flex flex-col md:align-center md:justify-center w-full md:w-8/12 relative max-w-7xl">
        <section className="flex flex-col md:flex-row gap-2 relative">
          <Bubble2
            className="absolute z-[-1] -left-24 -top-20"
            color={theme === "light" ? "#F2F5F899" : "#40404080"}
          />
          <div>
            <Breadcrumb />
            <h1 className="text-5xl mb-3 whitespace-nowrap">
              Hi, I'm Alix {theme === "light" ? "⛰" : "🌋"}
            </h1>
            <p className="mb-3 text-gray-600 dark:text-gray-200">
              I'm currently a senior at Stanford University with recent
              engineering experience at Glean, Amazon Web Services, and The
              Washington Post. Sometimes, I enjoy taking typing tests. Race me{" "}
              <a
                className="border-b border-gray-600 hover:border-b-0 cursor-pointer"
                onClick={() => router.push("/race-me")}
              >
                here
              </a>
              .
            </p>
            <div className="flex gap-8">
              <a
                href="https://github.com/acui51"
                target="_blank"
                rel="noreferrer"
              >
                <AiFillGithub size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/alix-cui/"
                target="_blank"
                rel="noreferrer"
              >
                <AiFillLinkedin size={24} />
              </a>
              <a href="mailto:acui@stanford.edu">
                <AiFillMail size={24} />
              </a>
              <a href="/resume.pdf" target="_blank" rel="noreferrer">
                <AiFillFilePdf size={24} />
              </a>
            </div>
          </div>
          <div className="self-center md:self-start">{/* <Me /> */}</div>
        </section>
        <Footer />
      </main>
    </div>
  );
}
