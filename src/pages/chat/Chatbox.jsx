import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  fetchChatByProject,
  fetchChatMessages,
  sendMessage,
} from "@/redux/chat/Action";
import { store } from "@/redux/Store";
import { ChatBubbleIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { map } from "zod";

const Chatbox = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [message, setMessage] = useState("");
  const auth = useSelector((store) => store.auth);
  const chat = useSelector((store) => store.chat);
  const project = useSelector((store) => store.project);
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleSendMessage = () => {
    dispatch(
      sendMessage({ senderId: auth.user?.id, projectId: id, content: message })
    );
    setMessage("");
  };

  useEffect(() => {
    dispatch(fetchChatByProject(id));
  }, [id]);

  useEffect(() => {
    if (chat.id) dispatch(fetchChatMessages(chat.id));
  }, [id]);

  return (
    <div className="sticky">
      <div className="border rounded-lg">
        <div className="border-b flex flex-wrap items-center p-5 font-semibold relative">
          <div
            className="truncate w-[100%] overflow-hidden whitespace-nowrap cursor-pointer"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            {project.projectDetails?.team?.map((team, index) => (
              <span key={index}>{team.fullName.split(" ")[0]},&nbsp;</span>
            ))}
          </div>

          {/* Tooltip */}
          {showTooltip && (
            <div className="absolute z-20 top-10 left-0 bg-gray-900 text-white text-sm p-2 rounded shadow-lg max-w-[90%] m-5">
              {project.projectDetails?.team?.map((member, idx) => (
                <span key={"sdnjsdnfndfn" + idx}>
                  {idx >= 1
                    ? ", " + member.fullName.split(" ")[0]
                    : member.fullName.split(" ")[0]}
                </span>
              ))}
            </div>
          )}
        </div>
        <ScrollArea className="h-[32rem] w-full px-5 py-2 flex gap-3 flex-col">
          {chat.messages &&
            chat.messages?.map((item, idx) =>
              auth.user.id !== item.sender?.id ? (
                <div
                  className="flex items-center justify-start gap-2 mb-2"
                  key={idx + idx}
                >
                  <Avatar>
                    <AvatarFallback className="font-semibold">
                      {item.sender?.fullName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2 py-1 px-2 border border-gray-200 bg-gray-200 rounded-ss-xl rounded-e-xl">
                    <div>
                      <p className="font-semibold text-xs border-b border-gray-600">
                        {item.sender?.fullName}
                      </p>
                      <p className="text-gray-800">{item.content}</p>{" "}
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="flex items-center justify-end gap-2 mb-2"
                  key={idx + item + idx + item}
                >
                  <div className="space-y-2 py-1 px-2 border bg-gray-800 text-gray-50 rounded-s-xl rounded-tr-xl">
                    <div>
                      <p className="font-semibold text-xs border-b border-gray-200">
                        {item.sender?.fullName}
                      </p>
                      <p className="text-gray-200">{item.content}</p>
                    </div>
                  </div>
                  <Avatar>
                    <AvatarFallback className="font-semibold">
                      {item.sender?.fullName[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )
            )}
        </ScrollArea>
        <div className="relative p-0">
          <Input
            placeholder="type message..."
            className="py-7 border-b-0 border-x-0 rounded-none outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 shadow-none"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <Button
            onClick={handleSendMessage}
            className="absolute right-2 top-3 rounded-full"
            size="icon"
            variant="ghost"
          >
            <PaperPlaneIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
