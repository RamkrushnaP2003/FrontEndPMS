import React from "react";
import BigceLogo from "./BigceLogo";
import ProjectGuild from "./ProjectGuild";
import ProjectMember from "./ProjectMember";

const Contact = () => {
  return (
    <div className="h-[80vh] pt-4">
      <div className="w-full ">
        <BigceLogo />
      </div>
      <div className="w-full mb-2">
        <ProjectGuild />
      </div>
      <div className="w-full">
        <ProjectMember />
      </div>
    </div>
  );
};

export default Contact;
