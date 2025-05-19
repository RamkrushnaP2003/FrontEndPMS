import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useEffect } from "react";
import UserList from "../user/UserList";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssueById } from "@/redux/issue/Action";

const AssigneDetails = ({ project }) => {
  const dispatch = useDispatch();

  const issueDetails = useSelector((store) => store.issue.issueDetails);

  const getStatusText = (status) => {
    if (status === "in-progress") return "In Progress";
    if (status === "pending") return "To Do";
    if (status === "done") return "Done";
    return status;
  };

  // Refresh issue on assignee change
  useEffect(() => {
    if (issueDetails?.id) {
      dispatch(fetchIssueById(issueDetails.id));
    }
  }, [issueDetails?.assignee?.id]); // 🚫 Bad dependency

  if (!issueDetails) return <p>Loading...</p>;

  return (
    <>
      <p className="py-3 px-5 bg-blue-100 rounded-t-md">Details</p>
      <div className="p-5">
        <div className="space-y-7">
          <div className="flex gap-10 items-center">
            <p className="w-[5rem] text-gray-900">Assignee</p>
            <div className="flex items-center gap-3">
              <b>:</b>
              {issueDetails?.assignee ? (
                <>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-blue-400 text-white">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Avatar className="cursor-pointer bg-gray-300 hover:bg-gray-300 transition">
                            <AvatarFallback className="bg-gray-200 text-gray-900">
                              {issueDetails.assignee.fullName[0]}
                            </AvatarFallback>
                          </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white shadow-md border border-gray-200 rounded-lg">
                          <DropdownMenuItem className="p-3">
                            <UserList issueDetails={issueDetails} />
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </AvatarFallback>
                  </Avatar>
                  <p>{issueDetails.assignee.fullName}</p>
                </>
              ) : (
                <p>Not Assigned</p>
              )}
            </div>
          </div>

          <div className="flex gap-10 items-center">
            <p className="w-[5rem] text-gray-900">Labels</p>
            <p>
              <b>:</b>&nbsp;&nbsp;&nbsp;None
            </p>
          </div>

          <div className="flex gap-10 items-center">
            <p className="w-[5rem] text-gray-900">Status</p>
            <div>
              <b>:</b>&nbsp;&nbsp;&nbsp;
              <Badge className="bg-gray-800 text-white">
                {getStatusText(issueDetails.status)}
              </Badge>
            </div>
          </div>

          <div className="flex gap-10 items-center">
            <p className="w-[5rem] text-gray-900">Release</p>
            <p>
              <b>:</b>&nbsp;&nbsp;&nbsp;10-04-2024
            </p>
          </div>

          <div className="flex gap-10 items-center">
            <p className="w-[5rem] text-gray-900">Reporter</p>
            <div className="flex items-center gap-3">
              <b>:</b>
              <Avatar className="font-semibold">
                <AvatarFallback className="bg-blue-700 text-white">
                  {project.projectDetails?.owner?.fullName[0]}
                </AvatarFallback>
              </Avatar>
              <p>{project.projectDetails?.owner?.fullName}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssigneDetails;
