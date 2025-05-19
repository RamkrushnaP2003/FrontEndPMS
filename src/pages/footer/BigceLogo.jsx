import React from "react";
import logo from "../../assets/BigceLogo.jpeg";

const BigceLogo = () => {
  return (
    <div>
      <img src={logo} alt="Bigce Logo" className="h-30 m-auto shadow-md" />
      <div className="text-center">
        <p className="text-red-500 font-bold">
          Bharat-Ratna Indira Gandhi Collage Of Engineering Kegaon, Solapur
        </p>
        <p>Department of Computer Science &amp; Engineering</p>
        <p>Acadamic Year: 2024-2025</p>
      </div>
    </div>
  );
};

export default BigceLogo;
