import React from "react";
import { Link } from "react-router-dom";
import Terms from "./Terms";
import Privacy from "./Privacy";

const Footer = () => {
  return (
    <footer className="h-24 w-full border-t-2 bg-gray-700 text-gray-300 flex flex-col items-center justify-center text-sm space-y-1">
      <div>
        &copy; {new Date().getFullYear()} Sprintly. All rights reserved.
      </div>
      <div className="flex space-x-4">
        <Link to="/terms" className="hover:underline">
          Terms
        </Link>
        <Link to="/privacy" className="hover:underline">
          Privacy
        </Link>
        <Link to="/contact" className="hover:underline">
          Contact
        </Link>
      </div>
      <div className="">Panda Gang</div>
    </footer>
  );
};

export default Footer;
