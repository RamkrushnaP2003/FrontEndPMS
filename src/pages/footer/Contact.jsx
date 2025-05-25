import React from "react";
import BigceLogo from "./BigceLogo";
import ProjectGuild from "./ProjectGuild";
import ProjectMember from "./ProjectMember";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="h-[80vh]">
      <div className="h-20 w-full border mb-2 flex items-center justify-between">
        <p className="text-center font-semibold text-3xl bg-gradient-to-r from-red-700 pl-8 to-gray-900 bg-clip-text text-transparent">
          Project Management System
        </p>

        <div className="mr-10">
          <Link to="/auth/login">
            <Button className="rounded-full mr-4">Login</Button>
          </Link>
          <Link to="/auth/signup">
            <Button className="rounded-full">Sign-Up</Button>
          </Link>
        </div>
      </div>
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
