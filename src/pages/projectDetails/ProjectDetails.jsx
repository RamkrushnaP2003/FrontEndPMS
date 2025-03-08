import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusIcon } from "@radix-ui/react-icons";
import React, { useEffect } from "react";
import InviteUserForm from "./InviteUserForm";
import IssueList from "../issue/IssueList";
import Chatbox from "../chat/Chatbox";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectById } from "@/redux/project/Action";
import { useParams } from "react-router-dom";
import ChatAndBot from "../chat/ChatAndBot";

const ProjectDetails = () => {
  const dispatch = useDispatch();
  const { project } = useSelector((store) => store);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchProjectById(id));
  }, []);

  const handleProjectInvitation = () => {};

  return (
    <>
      {" "}
      {project.projectDetails && (
        <div className="mt-5 lg:px-10">
          <div className="lg:flex gap-5 flex-wrap justify-between pb-4">
            <ScrollArea className="h-screen lg:w-[69%] pr-2">
              <div className="text-gray-400 pb-10 w-full">
                <h1 className="text-lg font-semibold pb-5">
                  {project.projectDetails.name}
                </h1>
                <div className="space-y-5 pb-10 text-sm">
                  <p className="w-full md:max-w-lg lg:max-w-xl">
                    {project.projectDetails.description}
                  </p>
                  <div className="flex">
                    <p className="w-36">Project Lead</p>
                    <p>
                      <span>: &nbsp;</span>
                      {project.projectDetails.owner.fullName}
                    </p>
                  </div>
                  <div className="flex flex-wrap">
                    <p className="w-36">Members</p>
                    <div className="flex items-center gap-2">
                      <span>:</span>
                      {project.projectDetails.team?.map((item, idx) => (
                        <Avatar
                          className="cursor-pointer"
                          key={item + idx + "k"}
                        >
                          <AvatarFallback>{item.fullName[0]}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <Dialog>
                      <DialogTrigger>
                        <Button
                          onClick={handleProjectInvitation}
                          className="ml-2 cursor-pointer"
                          size="sm"
                        >
                          Invite <PlusIcon />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          {/* ✅ Required Title for accessibility */}
                          <DialogTitle className="font-semibold text-gray-950">
                            Invite User
                          </DialogTitle>
                          {/* ✅ Optional Description to provide more context */}
                          <DialogDescription>
                            Enter the email of the user you want to invite.
                          </DialogDescription>
                        </DialogHeader>
                        {/* ✅ InviteUserForm moved outside of DialogHeader */}
                        <InviteUserForm />
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="flex">
                    <p className="w-36">Category</p>
                    <p>
                      <span>: &nbsp;</span>
                      {project.projectDetails.category}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="w-36">Status</p>
                    <p>
                      <span>: &nbsp;</span>
                      <Badge>To-Do</Badge>
                    </p>
                  </div>
                </div>
                <section>
                  <p className="py-5 border-b text-lg tracking-wider">Tasks</p>
                  <div className="lg:flex md:flex gap-3 justify-between py-5">
                    <IssueList status="pending" title="Todo List" />
                    <IssueList status="in-progress" title="In Progress" />
                    <IssueList status="done" title="Done" />
                  </div>
                </section>
              </div>
            </ScrollArea>
            <div className="lg:w-[29%] rounded-md sticky right-5 top-10">
              {/* <Chatbox /> */}
              <ChatAndBot />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectDetails;
