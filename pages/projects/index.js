import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Head from "next/head";
import ToggleButton from "components/ToggleButton";
import Breadcrumb from "components/Breadcrumb";
import Bubble2 from "assets/svg-js/Bubble2";
import styles from "./ProjectsCard.module.css";
import Technology from "../experience/components/Technology";
import { AiFillGithub } from "react-icons/ai";
import Image from "next/image";

/**
 * Project Card Component Credit goes to markelrayes
 * https://codepen.io/markelrayes/pen/ZEGVBZm?__cf_chl_jschl_tk__=d8fb598d0b6378f54df98d875798aecf62c07cfb-1606072410-0-ATdnFCljbrkSFfdoLPQe-KPbZaOzuwZOqIH4nfvpQFehuYl8ro3XL-Oo-CuDAhoohZGpaRnvFcy4XGZKEIavt3dJmhwvWRnIGHJQU4jIk1GbOFXL427w3YFDNjV1ATmSpjp5ckNhRio1dxi6bda1TiwzCToyk0JLP2oYKwDMtronizYEt6YsWUmJojXY0pV-00Fz2FtqZJeG7h_dzKqJyF2lx31M5FEfDveoSlkBxM_FXHmxsqy6uEiyiWwVgyv-iNy8KwGNRtfdK1QYWsdIs6cgUk6XYMgziw0jlQ8uDvH90I6fNamg46h4uUDg8LyPsTRvznWCg-WauBoNisxeYW7kgcMJB9QLKANhbjkXvLhNj6veR5WO5J9aFFqP_v6tAweJvJb-COkp90ZqFgURoXc
 */

export default function ProjectsCard() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center justify-center py-2 px-4">
      <Head>
        <title>Experience</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col md:flex-row justify-center w-full md:w-8/12 relative">
        <div>
          <ToggleButton />
          <Bubble2
            className="absolute z-[-1] -left-24 -top-20 dark:color"
            color={theme === "light" ? "#F2F5F8" : "#40404080"}
          />
          <Breadcrumb />
          <h1 className="text-5xl whitespace-nowrap mb-4">Experience</h1>
        </div>
      </main>
    </div>
    // <div className={styles.wrapper}>
    //   {/* Telehistory */}
    //   <div className={styles.center}>
    //     <div className={styles.propertyCard}>
    //       <span>
    //         <div
    //           className={styles.propertyImage}
    //           style={{ backgroundImage: "/telehistorydemo.gif" }}
    //         ></div>
    //       </span>
    //       <div className={styles.propertyDescription}>
    //         <h5> Telehistory</h5>
    //         <p>
    //           A web app that charts and analyzes data from your chat history on
    //           the popular messaging app, Telegram.
    //           <div className="d-flex flex-wrap justify-content-center">
    //             <Technology>Next.js</Technology>
    //             <Technology>TypeScript</Technology>
    //             <Technology>Tailwind CSS</Technology>
    //             <Technology>Nivo Graphs</Technology>
    //             <Technology>Parallel Dots API</Technology>
    //           </div>
    //         </p>
    //       </div>
    //       <a
    //         href="https://github.com/acui51/telehistory-v2.1"
    //         target="_blank"
    //         rel="noreferrer"
    //       >
    //         <div className={styles.propertySocialIcons}>
    //           <AiFillGithub size={25} color={"#212529"} />
    //         </div>
    //       </a>
    //     </div>
    //   </div>

    //   {/* ALI */}
    //   <div className={styles.center}>
    //     <div className={styles.propertyCard}>
    //       <span>
    //         <div
    //           className={styles.propertyImage}
    //           style={{ backgroundImage: "/alidemo.gif" }}
    //         ></div>
    //       </span>
    //       <div className={styles.propertyDescription}>
    //         <h5> Applied Learning Initiative</h5>
    //         <p>
    //           A web app that allows students to find research opportunities with
    //           various PIs.
    //           <div className="d-flex flex-wrap justify-content-center">
    //             <Technology>React/Redux</Technology>
    //             <Technology>TypeScript</Technology>
    //             <Technology>Node/Express</Technology>
    //             <Technology>MongoDB</Technology>
    //             <Technology>Firebase Auth</Technology>
    //           </div>
    //         </p>
    //       </div>
    //       <a
    //         href="https://github.com/acui51/ali-site"
    //         target="_blank"
    //         rel="noreferrer"
    //       >
    //         <div className={styles.propertySocialIcons}>
    //           <AiFillGithub size={25} color={"#212529"} />
    //         </div>
    //       </a>
    //     </div>
    //   </div>

    //   {/* Sprout */}
    //   <div className={styles.center}>
    //     <div className={styles.propertyCard}>
    //       <span>
    //         <div
    //           className={styles.propertyImage}
    //           style={{ backgroundImage: "/sproutdemo.gif" }}
    //         ></div>
    //       </span>
    //       <div className={styles.propertyDescription}>
    //         <h5> Sprout App </h5>
    //         <p>
    //           A hi-fidelity prototype for an app that allows creators to train
    //           together sounds and connect effortlessly.
    //           <div className="d-flex flex-wrap justify-content-center">
    //             <Technology>React Native</Technology>
    //             <Technology>Expo</Technology>
    //             <Technology>Firebase</Technology>
    //           </div>
    //         </p>
    //       </div>
    //       <a
    //         href="https://github.com/acui51/sprout-app"
    //         target="_blank"
    //         rel="noreferrer"
    //       >
    //         <div className={styles.propertySocialIcons}>
    //           <AiFillGithub size={25} color={"#212529"} />
    //         </div>
    //       </a>
    //     </div>
    //   </div>
    // </div>
  );
}
