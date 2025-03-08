import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { deleteComment } from "@/redux/comment/Action";
import { TrashIcon } from "@radix-ui/react-icons";
import React from "react";
import { useDispatch } from "react-redux";

const CommentCard = ({ comment }) => {
  const dispatch = useDispatch();
  const handleDeleteComment = (id) => {
    dispatch(deleteComment(id));
  };
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarFallback className=" font-semibold">
            {comment.user.fullName[0]}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <p className=" font-semibold">{comment?.user?.fullName}</p>
          <p>{comment?.content}</p>
        </div>
        <Button
          size="icon"
          className="rounded-full cursor-pointer"
          variant="ghost"
          onClick={() => handleDeleteComment(comment.id)}
        >
          <TrashIcon />
        </Button>
      </div>
    </div>
  );
};

export default CommentCard;
