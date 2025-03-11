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
import React, { useEffect, useState } from "react";
import InviteUserForm from "./InviteUserForm";
import IssueList from "../issue/IssueList";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectById } from "@/redux/project/Action";
import { useParams } from "react-router-dom";
import ChatAndBot from "../chat/ChatAndBot";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { DragDropContext } from "@hello-pangea/dnd";

const ProjectDetails = () => {
  const dispatch = useDispatch();
  const { project } = useSelector((store) => store);
  const { id } = useParams();
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(fetchProjectById(id));
  }, []);

  return (
    <>
      {project.projectDetails && (
        <div className="mt-5 lg:px-10">
          <div className="lg:flex gap-5 flex-wrap justify-between pb-4">
            <ScrollArea className="h-screen lg:w-[69%] pr-4">
              <div className="text-gray-900 pb-10 w-full">
                <h1 className="text-xl font-semibold pb-5">
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
                        <div key={item + idx + "k"}>
                          <Avatar
                            className="cursor-pointer"
                            data-tooltip-id={`tooltip-${idx}`}
                          >
                            <AvatarFallback className="font-semibold">
                              {item.fullName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <ReactTooltip
                            id={`tooltip-${idx}`}
                            place="bottom-start"
                            effect="solid"
                          >
                            {item.fullName}
                          </ReactTooltip>
                        </div>
                      ))}
                    </div>
                    <Dialog>
                      <DialogTrigger>
                        <Button className="ml-2 cursor-pointer" size="sm">
                          Invite <PlusIcon />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="font-semibold text-gray-950">
                            Invite User
                          </DialogTitle>
                          <DialogDescription>
                            Enter the email of the user you want to invite.
                          </DialogDescription>
                        </DialogHeader>
                        <InviteUserForm projectId={id} />
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
                  <div className="border-b py-2 shadow-md">
                    <p className="text-lg tracking-wider font-bold">Tasks</p>
                    <div className="flex flex-row font-semibold flex-wrap items-center justify-start">
                      <Button
                        className="py-2 mx-2 cursor-pointer"
                        variant={"ghost"}
                        onClick={() => setSelectedUser(null)}
                      >
                        {"All"}
                      </Button>
                      {project.projectDetails?.team?.map((item, idx) => (
                        <Button
                          key={idx}
                          className={`py-2 mx-2 cursor-pointer ${
                            selectedUser === item.id ? "bg-gray-300" : ""
                          }`}
                          variant={"ghost"}
                          onClick={() => setSelectedUser(item.id)}
                        >
                          {item.fullName.split(" ")[0]}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="lg:flex md:flex gap-3 justify-evenly py-5 w-[100%]">
                    <IssueList
                      status="pending"
                      title="Todo List"
                      selectedUser={selectedUser}
                    />
                    <IssueList
                      status="in-progress"
                      title="In Progress"
                      selectedUser={selectedUser}
                    />
                    <IssueList
                      status="done"
                      title="Done"
                      selectedUser={selectedUser}
                    />
                  </div>
                </section>
              </div>
            </ScrollArea>
            <div className="lg:w-[29%] rounded-md sticky right-5 top-10">
              <ChatAndBot />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectDetails;
