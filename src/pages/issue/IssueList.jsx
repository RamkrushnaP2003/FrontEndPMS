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
import { Filter, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateIssueForm from "./CreateIssueForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssues } from "@/redux/issue/Action";
import { useParams } from "react-router-dom";

const IssueList = ({ title, status }) => {
  const dispatch = useDispatch();
  const { issue } = useSelector((store) => store);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchIssues(id));
  }, [id]);

  return (
    <div>
      <Dialog>
        <Card className="w-full px-1 md:w-[300px] lg:w-[330px]">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="">
            <div className="space-y-2">
              {title == "Todo List" &&
                issue.issues
                  ?.filter((issue) => issue.status === status)
                  .map((item, idx) => <IssueCard issue={item} key={item.id} />)}
              {title === "In Progress" &&
                issue.issues
                  ?.filter((issue) => issue.status == status)
                  .map((item, idx) => <IssueCard issue={item} key={item.id} />)}
              {title === "Done" &&
                issue.issues
                  ?.filter((issue) => issue.status == status)
                  .map((item, idx) => <IssueCard issue={item} key={item.id} />)}
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
