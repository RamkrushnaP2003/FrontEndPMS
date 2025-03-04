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
import { PersonIcon } from "@radix-ui/react-icons";
import React from "react";
import CreateProject from "../projectList/CreateProject";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="border-b py-4 px-5 flex items-center justify-between sticky top-0 z-10 bg-white shadow-md shadow-gray-300">
      <div className="flex items-center gap-3">
        <Link to="/">
          <p className="cursor-pointer">Project Management Logo</p>
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
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full border-2 border-gray-500"
            >
              <p className="text-gray-600">U</p>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <p>Username</p>
      </div>
    </div>
  );
};

export default Navbar;
