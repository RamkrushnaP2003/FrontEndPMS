import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteProject } from "@/redux/project/Action";
import { DotFilledIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const dispatch = useDispatch();

  const handleDelete = async (projectId) => {
    await dispatch(deleteProject(projectId));
  };

  return (
    <Card className="p-6 w-full lg:max-w-3xl shadow-lg border border-gray-200 rounded-lg bg-white hover:shadow-xl transition-shadow duration-300">
      <div className="space-y-5">
        <div className="space-y-2">
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Link to={`/project/${project.id}`} className="hover:underline">
                <h1 className="cursor-pointer font-bold text-lg text-gray-800">
                  {project?.name}
                </h1>
              </Link>
              <DotFilledIcon className="text-gray-400" />
              <p className="text-sm text-gray-600">{project.category}</p>
            </div>

            {/* Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button
                  variant="ghost"
                  className="rounded-full cursor-pointer hover:bg-gray-100"
                  size="icon"
                >
                  <DotsVerticalIcon className="text-gray-600 w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-32 bg-white shadow-md border border-gray-200 rounded-md">
                <DropdownMenuItem className="cursor-pointer px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                  Update
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer px-3 py-2 text-red-600 hover:bg-red-100 rounded-md"
                  onClick={() => handleDelete(project.id)}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-sm leading-relaxed">
            {project.description}
          </p>

          {/* Tags Section */}
          <div className="flex flex-wrap items-center gap-2">
            {project &&
              project.tags.map((item, idx) => (
                <Badge
                  key={idx}
                  className="border border-blue-400 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium"
                >
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
