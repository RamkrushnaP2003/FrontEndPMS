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
        <div className="mt-5 px-4 md:px-6 lg:px-10 h-full">
          <div className="flex flex-col lg:flex-row gap-5 justify-between pb-4">
            <ScrollArea className="h-[85vh] lg:w-[69%] pr-4 bg-white shadow-lg rounded-lg p-4">
              <div className="text-gray-900 pb-10 w-full">
                <h1 className="text-2xl font-bold text-gray-800 pb-5">
                  {project.projectDetails.name}
                </h1>
                <div className="space-y-5 pb-10 text-gray-800 font-semibold">
                  <p className="w-full md:max-w-lg lg:max-w-xl">
                    {project.projectDetails.description}
                  </p>
                  <div className="flex">
                    <p className="w-36 font-semibold">Project Lead</p>
                    <p>: {project.projectDetails.owner.fullName}</p>
                  </div>
                  <div className="flex flex-wrap items-center">
                    <p className="w-36 font-semibold">Members</p>
                    <span>:&nbsp;</span>
                    {project.projectDetails.team?.map((item, idx) => (
                      <div
                        key={item + idx + "k"}
                        className="flex flex-wrap items-center"
                      >
                        <Avatar
                          className="cursor-pointer mx-1 text-gray-900 "
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
                    <Dialog>
                      <DialogTrigger>
                        <Button
                          className="ml-2 bg-gray-800 cursor-pointer text-white hover:bg-gray-900"
                          size="sm"
                        >
                          Invite <PlusIcon />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white">
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
                    <p className="w-36 font-semibold">Category</p>
                    <p>: {project.projectDetails.category}</p>
                  </div>
                  <div className="flex">
                    <p className="w-36 font-semibold">Status</p>
                    <span>: &nbsp;</span>
                    <Badge className="bg-gray-800 text-white">To-Do</Badge>
                  </div>
                </div>
                <section>
                  <div className="border-b py-2 shadow-md">
                    <p className="text-lg tracking-wider font-bold text-gray-900">
                      Tasks
                    </p>
                    <div className="flex flex-wrap items-center justify-start">
                      <Button
                        className={`py-2 mx-2 cursor-pointer ${
                          selectedUser === null
                            ? "bg-gray-800  text-white hover:bg-gray-800 hover:text-white"
                            : "text-gray-900 hover:bg-gray-800 hover:text-white"
                        }`}
                        variant="ghost"
                        onClick={() => setSelectedUser(null)}
                      >
                        All
                      </Button>
                      {project.projectDetails?.team?.map((item, idx) => (
                        <Button
                          key={idx}
                          className={`py-2 mx-2 cursor-pointer ${
                            selectedUser === item.id
                              ? "bg-gray-800 text-white hover:bg-gray-800 hover:text-white"
                              : "text-gray-900 hover:bg-gray-800 hover:text-white"
                          }`}
                          variant="ghost"
                          onClick={() => setSelectedUser(item.id)}
                        >
                          {item.fullName.split(" ")[0]}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-3 justify-evenly py-5 w-full">
                    <IssueList
                      status="pending"
                      title="To-Do List"
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
            <div className="lg:w-[29%] h-[85vh] bg-white shadow-md rounded-md p-4 sticky right-5 top-10">
              <ChatAndBot />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectDetails;
