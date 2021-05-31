import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="self-center dark:text-gray-200">
      <small>{`© Alix Cui ${year}`}</small>
    </footer>
  );
};

export default Footer;
