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
import React from "react";
import IssueCard from "./IssueCard";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateIssueForm from "./CreateIssueForm";

const IssueList = ({ title, status }) => {
  return (
    <div>
      <Dialog>
        <Card className="w-full px-1 md:w-[300px] lg:w-[330px]">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="">
            <div className="space-y-2">
              {[1, 1, 1, 1].map((item, idx) => (
                <IssueCard />
              ))}
            </div>
          </CardContent>
          <CardFooter className="w-full">
            <DialogTrigger>
              <Button className="w-full border">
                Create Issue <PlusIcon />
              </Button>
            </DialogTrigger>
          </CardFooter>
        </Card>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Issue</DialogTitle>
          </DialogHeader>
          <CreateIssueForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IssueList;
