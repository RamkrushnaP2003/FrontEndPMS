import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsVerticalIcon, PersonIcon } from "@radix-ui/react-icons";
import React from "react";
import UserList from "../user/UserList";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteIssue } from "@/redux/issue/Action";

const IssueCard = ({ issue }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleIssueDelete = (id) => {
    dispatch(deleteIssue(issue.id));
  };

  return (
    <div>
      <Card className="rounded-md py-1 pb-2">
        <CardHeader className={"py-0 pb-1"}>
          <div className="flex justify-between items-center w-fu">
            <CardTitle>
              <Link to={`/project/${id}/issue/${issue.id}`}>
                <span className="cursor-pointer">{issue.title}</span>
              </Link>
            </CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full cursor-pointer"
                >
                  <DotsVerticalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="cursor-pointer">
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleIssueDelete(issue.id)}
                  className="cursor-pointer"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p>FBP - {1}</p>
            <DropdownMenu className="w-[30rem] border border-red-400">
              <DropdownMenuTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarFallback>
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
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <UserList issueDetails={issue} />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IssueCard;
