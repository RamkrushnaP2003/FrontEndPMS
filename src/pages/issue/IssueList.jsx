import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect } from "react";
import IssueCard from "./IssueCard";
import { Button } from "@/components/ui/button";
import CreateIssueForm from "./CreateIssueForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssues } from "@/redux/issue/Action";
import { useParams } from "react-router-dom";
import { PlusIcon } from "@radix-ui/react-icons";

const IssueList = ({ title, status, selectedUser }) => {
  const dispatch = useDispatch();
  const { issue } = useSelector((store) => store);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchIssues(id));
  }, [id, dispatch]); // Ensure dispatch is included to prevent stale data

  const filteredIssues = issue.issues?.filter(
    (item) =>
      item.status === status &&
      (!selectedUser ||
        item.assignee?.id?.toString() === selectedUser?.toString()) // Ensure matching ID type
  );

  console.log(issue.issues);

  return (
    <div>
      <Dialog>
        <Card className="w-full px-1 md:w-[300px] lg:w-[300px] my-4 border-none bg-gray-50 shadow-md">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filteredIssues.length > 0 ? (
                filteredIssues.map((item) => (
                  <IssueCard issue={item} key={item.id} />
                ))
              ) : (
                <p className="text-gray-500">No issues found</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="w-full">
            <DialogTrigger>
              <Button className="w-full border cursor-pointer">
                Create Issue <PlusIcon />
              </Button>
            </DialogTrigger>
          </CardFooter>
        </Card>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Issue</DialogTitle>
          </DialogHeader>
          <CreateIssueForm status={status} title={title} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IssueList;
