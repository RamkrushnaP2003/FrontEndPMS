import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import React from "react";

const UserList = () => {
  return (
    <div className="space-y-2 w-full">
      <div className="border rounded-md w-full">
        <p className="py-2 px-3 w-full">{"Raam" || "Unassigned"}</p>
      </div>
      {[1, 1, 1, 1].map((item, idx) => (
        <div
          key={item + idx + item}
          className="py-2 grou hover:bg-slate-300 cursor-pointer flex items-center space-x-4 rounded-md border px-4"
        >
          <Avatar>
            <AvatarFallback>R</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className=" w-full text-sm leading-none">Code With ram</p>
            <p className=" w-full text-sm text-muted-foreground">
              @CodeWithram
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
