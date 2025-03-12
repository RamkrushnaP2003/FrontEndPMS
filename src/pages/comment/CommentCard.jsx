import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { deleteComment } from "@/redux/comment/Action";
import { TrashIcon } from "@radix-ui/react-icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const CommentCard = ({ comment }) => {
  const dispatch = useDispatch();
  const handleDeleteComment = (id) => {
    dispatch(deleteComment(id));
  };
  const { auth } = useSelector((store) => store);
  return (
    <div className="flex justify-between bg-gray-200 p-2 rounded-xl max-w-full sm:max-w-80">
      <div className="flex items-end justify-between gap-4 w-full">
        <div className="flex items-start gap-2 w-full">
          <Avatar>
            <AvatarFallback className="bg-blue-500 text-white font-semibold">
              {comment.user.fullName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1 py-1 w-full">
            <p className="font-semibold">{comment?.user?.fullName}</p>
            <p className="text-gray-600">{comment?.content}</p>
          </div>
        </div>
        {auth.user.id === comment.user.id && (
          <Button
            size="md"
            className="rounded-full cursor-pointer sm:top-2 sm:transform sm:translate-x-1 sm:translate-y-1"
            variant="red"
            onClick={() => handleDeleteComment(comment.id)}
          >
            <TrashIcon className="text-red-700" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
