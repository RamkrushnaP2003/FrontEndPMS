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
import React from "react";
import InviteUserForm from "./InviteUserForm";
import IssueList from "../issue/IssueList";
import Chatbox from "../chat/Chatbox";

const ProjectDetails = () => {
  const handleProjectInvitation = () => {};

  return (
    <div className="mt-5 lg:px-10">
      <div className="lg:flex gap-5 flex-wrap justify-between pb-4">
        <ScrollArea className="h-screen lg:w-[69%] pr-2">
          <div className="text-gray-400 pb-10 w-full">
            <h1 className="text-lg font-semibold pb-5">
              Create E-Commerce Website
            </h1>
            <div className="space-y-5 pb-10 text-sm">
              <p className="w-full md:max-w-lg lg:max-w-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Temporibus quae libero minus asperiores rerum exercitationem?
                Inventore iusto deleniti delectus! Architecto magni, provident
                facilis corporis accusantium in tempore dolores illum laborum.
              </p>
              <div className="flex">
                <p className="w-36">Project Lead : </p>
                <p>Ramkrushna</p>
              </div>
              <div className="flex flex-wrap">
                <p className="w-36">Menmbers : </p>
                <div className="flex items-center gap-2">
                  {[1, 1, 1, 1].map((item, idx) => (
                    <Avatar className="cursor-pointer" key={item + idx + "k"}>
                      <AvatarFallback>Z</AvatarFallback>
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
                <p className="w-36">Category : </p>
                <p>Fullstack</p>
              </div>
              <div className="flex">
                <p className="w-36">Status : </p>
                <Badge>To-Do</Badge>
              </div>
            </div>
            <section>
              <p className="py-5 border-b text-lg tracking-wider">Tasks</p>
              <div className="lg:flex md:flex gap-3 justify-between py-5">
                <IssueList status="pending" title="Todo List" />
                <IssueList status="in-progess" title="In Progress" />
                <IssueList status="done" title="Done" />
              </div>
            </section>
          </div>
        </ScrollArea>
        <div className="lg:w-[29%] rounded-md sticky right-5 top-10">
          <Chatbox />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
