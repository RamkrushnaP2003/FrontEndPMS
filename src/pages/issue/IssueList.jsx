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

  return (
    <div className="bg-gray-100 border border-gray-200 rounded-lg shadow-lg">
      <Dialog>
        <div className="w-full  md:w-[300px] lg:w-[300px] bg-gray-100  rounded-lg flex flex-col">
          <div className="bg-gray-300 p-3 rounded-t-lg flex items-start">
            <h3 className="text-gray-900 font-bold">{title}</h3>
          </div>
          <div className="p-3 flex-grow">
            <div className="space-y-2">
              {filteredIssues.length > 0 ? (
                filteredIssues.map((item) => (
                  <IssueCard issue={item} key={item.id} />
                ))
              ) : (
                <p className="text-gray-500 text-center">No issues found</p>
              )}
            </div>
          </div>
          {status == "pending" && (
            <div className="w-full p-3 bg-gray-100 rounded-b-lg">
              <DialogTrigger>
                <Button className="w-full border border-gray-400 bg-blue-600 text-white hover:bg-blue-700 cursor-pointer rounded-lg">
                  Create Issue <PlusIcon />
                </Button>
              </DialogTrigger>
            </div>
          )}
        </div>
        <DialogContent className="bg-white p-6 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-gray-900">
              Create New Issue
            </DialogTitle>
          </DialogHeader>
          <CreateIssueForm status={status} title={title} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IssueList;
