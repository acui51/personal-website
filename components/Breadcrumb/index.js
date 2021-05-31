import React from "react";
import { useRouter } from "next/router";

const Breadcrumb = () => {
  const router = useRouter();

  return (
    <div className="flex mb-1">
      <span
        className={`text-gray-600 hover:text-black dark:text-gray-200 cursor-pointer dark:hover:text-gray-400 ${
          router.pathname === "/" &&
          "border-b border-gray-600 dark:border-gray-200"
        }`}
        onClick={() => router.push("/")}
      >
        Intro
      </span>
      <span className="mx-2">/</span>
      <span
        className={`text-gray-600 hover:text-black dark:text-gray-200 cursor-pointer dark:hover:text-gray-400 ${
          router.pathname === "/experience" &&
          "border-b border-gray-600 dark:border-gray-200"
        }`}
        onClick={() => router.push("/experience")}
      >
        Experience
      </span>
      <span className="mx-2">/</span>
      <span
        className={`text-gray-600 hover:text-black dark:text-gray-200 cursor-pointer dark:hover:text-gray-400 ${
          router.pathname === "/projects" &&
          "border-b border-gray-600 dark:border-gray-200"
        }`}
        onClick={() => router.push("/projects")}
      >
        Projects
      </span>
    </div>
  );
};

export default Breadcrumb;
