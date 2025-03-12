import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { assignedUserToIssue } from "@/redux/issue/Action";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const UserList = ({ issueDetails }) => {
  const { project } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleAssigneIssueToUser = (id) => {
    dispatch(assignedUserToIssue(issueDetails.id, id));
  };

  return (
    <div className="">
      {/* Current Assignee */}
      <div className="rounded-md p-3 bg-gray-200 mb-2 flex items-center gap-2">
        <Avatar>
          <AvatarFallback className="text-white bg-blue-500">
            {issueDetails.assignee?.fullName?.[0] || "U"}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <p className="text-gray-700 font-medium truncate max-w-[150px]">
            {issueDetails.assignee?.fullName || "Unassigned"}
          </p>
        </div>
      </div>

      {/* Team List */}
      <div className="space-y-2 ">
        {project.projectDetails?.team.map((item) => (
          <div
            key={item.id}
            onClick={() => handleAssigneIssueToUser(item.id)}
            className="flex items-center space-x-4 p-3 rounded-md transition hover:bg-gray-200 cursor-pointer"
          >
            {/* Avatar */}
            <Avatar className="bg-blue-500">
              <AvatarFallback className="text-white bg-blue-500">
                {item.fullName[0]}
              </AvatarFallback>
            </Avatar>

            {/* User Details */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate max-w-[150px]">
                {item.fullName}
              </p>
              <p className="text-xs text-gray-500 truncate max-w-[150px]">
                @{item.fullName.toLowerCase()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
