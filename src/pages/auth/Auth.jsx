import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
import { Button } from "@/components/ui/button";

const Auth = () => {
  const [active, setActive] = useState(true);
  return (
    <div className="loginContainer w-full">
      <div className="box w-[25rem] m-auto mt-10">
        <div className="minContainer login">
          <div className="loginBox w-full px-10 space-y-5">
            {active ? <Signup /> : <Login />}
            {active ? (
              <div className="">
                <span className="text-gray-700">Already have account?</span>
                <Button
                  className="cursor-pointer text-gray-900"
                  variant="ghost"
                  onClick={() => setActive(!active)}
                >
                  sign-in
                </Button>
              </div>
            ) : (
              <div>
                <span className="text-gray-700">Dont have account?</span>
                <Button
                  className="cursor-pointer text-gray-900"
                  variant="ghost"
                  onClick={() => setActive(!active)}
                >
                  sign-up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
