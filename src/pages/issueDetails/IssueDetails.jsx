import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateCommentForm from "../comment/CreateCommentForm";
import CommentCard from "../comment/CommentCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssueById, updateIssueStatus } from "@/redux/issue/Action";
import { fetchComments } from "@/redux/comment/Action";
import { fetchProjectById } from "@/redux/project/Action";

const IssueDetails = () => {
  const { projectId, issueId } = useParams();
  const dispatch = useDispatch();
  const { issue } = useSelector((store) => store);
  const { comment, project } = useSelector((store) => store);

  const handleUpdateIssueStatus = (status) => {
    dispatch(updateIssueStatus(issueId, status));
  };

  const getStatusText = (status) => {
    if (status === "in-progress") {
      return "In Progress";
    } else if (status === "pending") {
      return "To Do";
    } else if (status === "done") {
      return "Done";
    }
    return status;
  };

  useEffect(() => {
    dispatch(fetchIssueById(issueId));
    dispatch(fetchComments(issueId));
    dispatch(fetchProjectById(projectId));
  }, [issueId]);

  return (
    <>
      {issue.issueDetails && (
        <div className="px-4 sm:px-10 lg:px-20 py-8 text-gray-700">
          <div className="flex flex-col lg:flex-row justify-between border p-5 lg:p-10 rounded-lg bg-white shadow-lg">
            <ScrollArea className="h-[80vh] lg:w-[60%] w-full">
              <div className="w-full lg:w-[60%]">
                <h1 className="text-lg font-semibold text-blue-700">
                  {issue.issueDetails.title}
                </h1>
                <div className="py-5">
                  <h2 className="font-semibold text-gray-600">Description</h2>
                  <p className="text-gray-500 text-sm mt-3">
                    {issue.issueDetails.description}
                  </p>
                </div>
                <div className="mt-5">
                  <h1 className="pb-3 text-gray-800 font-semibold">Comments</h1>
                  <CreateCommentForm issueId={issueId} />
                  <div className="mt-8 space-y-6">
                    {comment.comments?.map((item, idx) => (
                      <CommentCard comment={item} key={item.id + " "} />
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
            <div className="w-full lg:w-[30%] space-y-2 mt-5 lg:mt-0">
              <Select
                className="w-full"
                onValueChange={handleUpdateIssueStatus}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="border-none">
                  <SelectItem value="pending">To-Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
              <div className="border border-gray-200 rounded-lg ">
                <p className=" py-3 px-5 bg-blue-100 rounded-t-md">Details</p>
                <div className="p-5">
                  <div className="space-y-7">
                    <div className="flex gap-10 items-center">
                      <p className="w-[5rem] text-gray-900">Assignee</p>
                      <div className="flex items-center gap-3">
                        <b>:</b>
                        {issue.issueDetails?.assignee ? (
                          <>
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-blue-400 text-white">
                                {issue.issueDetails?.assignee?.fullName[0] ||
                                  "X"}
                              </AvatarFallback>
                            </Avatar>
                            <p>
                              {issue.issueDetails?.assignee.fullName ||
                                "Not Assigned"}
                            </p>
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
                          {getStatusText(issue.issueDetails.status)}
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
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IssueDetails;
