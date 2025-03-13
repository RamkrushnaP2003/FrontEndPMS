import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DotsVerticalIcon, PersonIcon } from "@radix-ui/react-icons";
import React from "react";
import UserList from "../user/UserList";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteIssue } from "@/redux/issue/Action";

const IssueCard = ({ issue }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleIssueDelete = () => {
    dispatch(deleteIssue(issue.id));
  };

  return (
    <div className="w-full relative">
      <div className="rounded-lg border border-gray-300 transition hover:shadow-md">
        {/* Header Section */}
        <div className="border-b bg-blue-400 rounded-t-lg px-4 py-1 border-gray-200  flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800 hover:text-gray-900 transition">
            <Link
              to={`/project/${id}/issue/${issue.id}`}
              className="cursor-pointer"
            >
              {issue.title}
            </Link>
          </h3>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full cursor-pointer hover:bg-blue-500 hover:shadow-md transition"
              >
                <DotsVerticalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white shadow-md border border-gray-200 rounded-lg">
              <DropdownMenuItem
                onClick={handleIssueDelete}
                className="cursor-pointer hover:bg-red-100 text-red-600 transition px-4 py-2"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Content Section */}
        <div className="relative h-16 mt-2 px-2">
          <p className="text-gray-600 text-sm truncate overflow-hidden whitespace-nowrap">
            {issue.description}
          </p>

          {/* Avatar Positioned Bottom Right */}
          <div className="absolute bottom-2 right-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Avatar className="cursor-pointer bg-gray-300 hover:bg-gray-300 transition">
                        <AvatarFallback className="bg-gray-200 text-gray-900">
                          {issue.assignee ? (
                            <span className="font-semibold">
                              {issue.assignee.fullName[0]}
                            </span>
                          ) : (
                            <PersonIcon />
                          )}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white shadow-md border border-gray-200 rounded-lg ">
                      <DropdownMenuItem className="p-3">
                        <UserList issueDetails={issue} />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TooltipTrigger>
                <TooltipContent>
                  {issue.assignee ? issue.assignee.fullName : "Unassigned"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
