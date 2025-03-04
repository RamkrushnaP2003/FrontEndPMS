import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
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

const IssueDetails = () => {
  const { projectId, issueId } = useParams();

  const handleUpdateIssueStatus = (status) => {
    console.log(status);
  };
  return (
    <div className="px-20 py-8 text-gray-700">
      <div className="flex justify-between border p-10 rounded-lg">
        <ScrollArea>
          <div className="h-[80vh] w-[60%]">
            <h1 className="text-lg font-semibold text-gray-700">
              Create issue navbar
            </h1>
            <div className="py-5">
              <h2 className="font-semibold text-gray-600">Description</h2>
              <p className="text-gray-500 text-sm mgt-3">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Perferendis sed molestias iusto, debitis quae ducimus fugit
                provident alias iure illum nihil, laudantium laboriosam
                accusantium iste nobis delectus asperiores officia sit.
              </p>
            </div>
            <div className="mt-5">
              <h1 className="pb-3">Activity</h1>
              <Tabs defaultValue="comments" className="w-[400px]">
                <TabsList className="mb-5">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="comments">Comments</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  All make changes to your account heree
                </TabsContent>
                <TabsContent value="comments">
                  <CreateCommentForm issueId={issueId} />
                  <div className="mt-8 space-y-6">
                    {[1, 1, 1, 1].map((item, idx) => (
                      <CommentCard key={item + idx + idx} />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="history">
                  History Change your password here
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </ScrollArea>
        <div className="w-full lg:w-[30%] space-y-2">
          <Select className="w-full" onValueChange={handleUpdateIssueStatus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todo">To-Do</SelectItem>
              <SelectItem value="inProgress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>
          <div className="border rounded-lg">
            <p className="border-b py-3 px-5">Details</p>
            <div className="p-5">
              <div className="space-y-7">
                <div className="flex gap-10 items-center">
                  <p className="w-[3rem]">Assignee</p>
                  <div className="flex items-center gap-3">
                    <b>:</b>
                    <Avatar className="h-8 w-8 text-xs">
                      <AvatarFallback>X</AvatarFallback>
                    </Avatar>
                    <p>Code with ram</p>
                  </div>
                </div>
                <div className="flex gap-10 items-center">
                  <p className="w-[3rem]">Labels</p>

                  <p>
                    <b>:</b>&nbsp;&nbsp;&nbsp;None
                  </p>
                </div>
                <div className="flex gap-10 items-center">
                  <p className="w-[3rem]">Status</p>
                  <div>
                    <b>:</b>&nbsp;&nbsp;&nbsp;<Badge>In Progress</Badge>
                  </div>
                </div>
                <div className="flex gap-10 items-center">
                  <p className="w-[3rem]">Release</p>
                  <p>
                    <b>:</b>&nbsp;&nbsp;&nbsp;10-04-2024
                  </p>
                </div>
                <div className="flex gap-10 items-center">
                  <p className="w-[3rem]">Reporter</p>
                  <div className="flex items-center gap-3">
                    <b>:</b>
                    <Avatar className="h-8 w-8 text-xs">
                      <AvatarFallback>X</AvatarFallback>
                    </Avatar>
                    <p>Code with ram</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
