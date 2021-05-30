import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="self-center">
      <small>{`© Alix Cui ${year}`}</small>
    </footer>
  );
};

export default Footer;
