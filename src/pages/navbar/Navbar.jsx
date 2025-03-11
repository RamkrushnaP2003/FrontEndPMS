import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import React, { useEffect, useState } from "react";
import CreateProject from "../projectList/CreateProject";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { logout } from "@/redux/auth/Action";
import logo from "../../assets/mainLogo.webp";
import { useDispatch } from "react-redux";

const Navbar = ({ user }) => {
  const dispatch = useDispatch();
  console.log(user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };
  return (
    <div className="border-b py-4 px-5 flex items-center justify-between sticky top-0 z-10 bg-white shadow-md shadow-gray-300">
      <div className="flex items-center gap-3">
        <Link to="/home">
          <div className="flex flex-row items-center">
            <Avatar>
              <AvatarFallback>
                <img src={logo} alt="logo" />
              </AvatarFallback>
            </Avatar>
            <p className="cursor-pointer font-semibold text-gray-900">
              Sprintly
            </p>
          </div>
        </Link>
        <Dialog>
          <DialogTrigger>
            <Button className="cursor-pointer" variant="ghost">
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>

            <DialogDescription>
              <CreateProject />
            </DialogDescription>
          </DialogContent>
        </Dialog>
        <Link to="/upgrade_plan">
          <Button className="cursor-pointer" variant="ghost">
            Upgrade
          </Button>
        </Link>
      </div>

      <div className="flex gap-3 items-center">
        <DropdownMenu className="hover:border-none">
          <DropdownMenuTrigger>
            <Avatar className="cursor-pointer rounded-full border border-gray-300">
              <AvatarFallback>{user?.fullName[0]}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border border-gray-300 mt-[2px] cursor-pointer">
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <p>{user?.fullName.split(" ")[0]}</p>
      </div>
    </div>
  );
};

export default Navbar;
