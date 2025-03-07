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
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const dispatch = useDispatch();
  const handleDelete = (projectId) => {
    dispatch(deleteProject(projectId));
  };

  const handleUpdate = () => {};
  return (
    <Card className="p-5 w-full lg:max-w-3xl">
      <div className="space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="flex items-center gap-5">
              <Link to={`/project/${project.id}`}>
                <h1 className="cursor-pointer font-bold text-lg">
                  {project.name}
                </h1>
              </Link>
              <DotFilledIcon />
              <p className="text-sm text-gray-600">{project.category}</p>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    variant="ghost"
                    className="rounded-full cursor-pointer"
                    size="icon"
                  >
                    <DotsVerticalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="cursor-pointer">
                    Update
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <p className="text-gray-700 text-sm">{project.description}</p>
          <div className="flex flex-wrap items-center gap-2">
            {project &&
              project.tags.map((item, idx) => (
                <Badge key={idx + idx + idx} variant="outlined">
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
