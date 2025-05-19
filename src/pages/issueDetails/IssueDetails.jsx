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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PersonIcon } from "@radix-ui/react-icons";
import UserList from "../user/UserList";
import AssigneDetails from "./AssigneDetails";

const IssueDetails = () => {
  const { projectId, issueId } = useParams();
  const dispatch = useDispatch();
  const { issue } = useSelector((store) => store);
  const { comment, project } = useSelector((store) => store);

  const handleUpdateIssueStatus = (status) => {
    dispatch(updateIssueStatus(issueId, status));
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
                <AssigneDetails issue={issue} project={project} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IssueDetails;
