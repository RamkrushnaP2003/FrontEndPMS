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
import React from "react";
import CreateProject from "../projectList/CreateProject";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { logout } from "@/redux/auth/Action";
import logo from "../../assets/PMSLogo.jpeg";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  // Safely get first initial or fallback
  const getUserInitial = () => {
    if (
      user?.fullName &&
      typeof user.fullName === "string" &&
      user.fullName.length > 0
    ) {
      return user.fullName.charAt(0).toUpperCase();
    }
    return "U";
  };

  // Safely get first name or fallback
  const getUserFirstName = () => {
    if (user?.fullName && typeof user.fullName === "string") {
      return user.fullName.split(" ")[0];
    }
    window.location.reload();
    return "User";
  };

  return (
    <div className="border-b py-4 px-5 flex items-center justify-between sticky top-0 z-10 bg-white shadow-md shadow-gray-300">
      <div className="flex items-center gap-3">
        <Link to="/home">
          <div className="flex flex-row items-center">
            {/* <Avatar className="mr-2">
              <AvatarFallback> */}
            <img src={logo} alt="logo" className="h-10 mr-2" />
            {/* </AvatarFallback>
            </Avatar> */}
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

        {/* <Link to="/upgrade_plan">
          <Button className="cursor-pointer" variant="ghost">
            Upgrade
          </Button>
        </Link> */}
      </div>

      <div className="flex gap-3 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="cursor-pointer rounded-full border border-gray-300">
              <AvatarFallback>{getUserInitial()}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="border border-gray-300 mt-[2px] cursor-pointer">
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <p>{getUserFirstName()}</p>
      </div>
    </div>
  );
};

export default Navbar;
