import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DotsVerticalIcon, PlusIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import InviteUserForm from "./InviteUserForm";
import IssueList from "../issue/IssueList";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProject,
  fetchProjectById,
  softDeleteProject,
} from "@/redux/project/Action";
import { useNavigate, useParams } from "react-router-dom";
import ChatAndBot from "../chat/ChatAndBot";
import { Tooltip as ReactTooltip } from "react-tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditProject from "../projectList/EditProject";
import IssueDonut from "./IssueDonut";
import { fetchIssues } from "@/redux/issue/Action";

const ProjectDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { project, auth, issue } = useSelector((store) => store);
  const { id } = useParams();
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(fetchProjectById(id));
    dispatch(fetchIssues(id));
  }, []);

  console.log(issue.issues);

  const handleProjectDelete = async (projectId) => {
    await dispatch(softDeleteProject(projectId, "false"));
    navigate("/home");
  };

  return (
    <>
      {project.projectDetails && (
        <div className="mt-5 px-4 md:px-6 lg:px-10 h-full">
          <div className="flex flex-col lg:flex-row gap-5 justify-between pb-4">
            <ScrollArea className="h-[85vh] lg:w-[69%] pr-4 bg-white shadow-lg rounded-lg p-4">
              <div className="text-gray-900 pb-10 w-full">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-gray-800 pb-5">
                    {project.projectDetails.name}
                  </h1>
                  {project.projectDetails.owner.id === auth.user.id && (
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full cursor-pointer hover:bg-blue-500 hover:shadow-md transition"
                        >
                          <DotsVerticalIcon />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white shadow-md border border-gray-200 rounded-lg">
                        {/* Prevent Dropdown from closing when clicking "Edit" */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <DropdownMenuItem
                              onSelect={(event) => event.preventDefault()} // Prevent auto-closing
                              className="cursor-pointer w-full hover:bg-gray-100 transition px-4 py-2"
                            >
                              Edit
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DialogContent>
                            <EditProject />
                          </DialogContent>
                        </Dialog>

                        <DropdownMenuItem
                          onClick={() => handleProjectDelete(id)}
                          className="cursor-pointer hover:bg-red-100 text-red-600 transition px-4 py-2"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
                <div className="flex items-center justify-between w-full">
                  <div className="space-y-5 pb-10 text-gray-800 font-semibold w-full h-[260px]">
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
                            <AvatarFallback className="border-blue-400 bg-blue-50 text-blue-600">
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
                            className="ml-2 bg-blue-500 cursor-pointer text-white hover:bg-blue-600"
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
                      <Badge className="border-blue-400 bg-blue-50 text-blue-600">
                        To-Do
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full h-[260px]">
                    {issue?.issues && <IssueDonut issues={issue.issues} />}
                  </div>
                </div>
                <section>
                  <div className="">
                    <p className="text-lg tracking-wider font-bold text-gray-900">
                      Tasks
                    </p>
                    <div className="flex items-center w-full">
                      <div className="flex flex-wrap items-center justify-start">
                        <Button
                          className={`rounded-none cursor-pointer ${
                            selectedUser === null
                              ? "border-x border-t border-blue-400 bg-blue-50 text-blue-600"
                              : "border-b border-blue-400 text-gray-900 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
                          }`}
                          variant="ghost"
                          onClick={() => setSelectedUser(null)}
                        >
                          All
                        </Button>
                        {project.projectDetails?.team?.map((item, idx) => (
                          <Button
                            key={idx}
                            className={`rounded-none cursor-pointer ${
                              selectedUser === item.id
                                ? "border-x border-t border-blue-400 bg-blue-50 text-blue-600 hover:border-blue-500 hover:text-blue-700"
                                : "border-b border-blue-400 text-gray-900 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
                            }`}
                            variant="ghost"
                            onClick={() => {
                              setSelectedUser(item.id);
                            }}
                          >
                            {item.fullName.split(" ")[0]}
                          </Button>
                        ))}
                      </div>
                      <div className="flex-grow border-b h-9 border-blue-400"></div>
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
