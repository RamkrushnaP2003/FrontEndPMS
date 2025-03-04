import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotFilledIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = () => {
  return (
    <Card className="p-5 w-full lg:max-w-3xl">
      <div className="space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="flex items-center gap-5">
              <Link to="/project/1">
                <h1 className="cursor-pointer font-bold text-lg">
                  Create E-Commerce Project
                </h1>
              </Link>
              <DotFilledIcon />
              <p className="text-sm text-gray-600">Fullstack</p>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="ghost" className="rounded-full" size="icon">
                    <DotsVerticalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Update</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <p className="text-gray-700 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
            aliquid eum quae reprehenderit dicta nemo doloribus, exercitationem
            saepe cumque aut esse aliquam inventore eligendi necessitatibus
            ratione hic veritatis aperiam accusamus?
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {["React", "NodeJs", "MongoDB", "ExpressJs"].map((item, idx) => (
              <Badge key={idx} variant="outlined">
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
