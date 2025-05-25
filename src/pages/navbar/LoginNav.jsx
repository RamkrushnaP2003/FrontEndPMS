import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const LoginNav = () => {
  return (
    <div className="h-20 w-full border mb-2 flex items-center justify-center">
      <p>Project Management System</p>
      <div>
        <Link to="/auth/login">
          <Button>Login</Button>
        </Link>
        <Link to="/auth/signup">
          <Button>Sign-Up</Button>
        </Link>
      </div>
    </div>
  );
};

export default LoginNav;
