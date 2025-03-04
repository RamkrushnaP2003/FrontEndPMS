import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import React from "react";

const CommentCard = () => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarFallback>Z</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <p>Code with Zosh</p>
          <p>How much work is pedding</p>
        </div>
        <Button
          size="icon"
          className="rounded-full cursor-pointer"
          variant="ghost"
        >
          <TrashIcon />
        </Button>
      </div>
    </div>
  );
};

export default CommentCard;
