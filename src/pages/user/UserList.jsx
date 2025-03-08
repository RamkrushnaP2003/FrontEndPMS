import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { assignedUserToIssue } from "@/redux/issue/Action";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const UserList = ({ issueDetails }) => {
  const { project } = useSelector((store) => store);
  const dispatch = useDispatch();
  const handleAssigneIsssueToUser = (id) => {
    console.log(issueDetails.id, id);
    dispatch(assignedUserToIssue(issueDetails.id, id));
  };
  return (
    <div className="space-y-2 w-full">
      <div className="border rounded-md w-full">
        <p className="py-2 px-3 w-full">
          {issueDetails.assignee?.fullName || "Unassigned"}
        </p>
      </div>
      {project.projectDetails?.team.map((item, idx) => (
        <div
          onClick={() => handleAssigneIsssueToUser(item.id)}
          key={item + idx + item}
          className="py-2 grou hover:bg-slate-300 cursor-pointer flex items-center space-x-4 rounded-md border px-4"
        >
          <Avatar>
            <AvatarFallback>{item.fullName[0]}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className=" w-full text-sm leading-none">{item.fullName}</p>
            <p className=" w-full text-sm text-muted-foreground">
              @{item.fullName.toLowerCase()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
