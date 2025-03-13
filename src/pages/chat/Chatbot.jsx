import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CHAT_GPT_API_KEY } from "@/config/api";
import {
  fetchChatByProject,
  fetchChatMessages,
  sendMessage,
} from "@/redux/chat/Action";
import { createChatbot, fetchChatbotByProjectId } from "@/redux/chatbot/Action";
import { fetchProjectById } from "@/redux/project/Action";
import { store } from "@/redux/Store";
import { ChatBubbleIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { BotIcon } from "lucide-react";
import React, { useEffect, useState, useRef } from "react"; // Added useRef
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { map } from "zod";

const Chatbot = () => {
  const auth = useSelector((store) => store.auth);
  const { chatbot } = useSelector((store) => store);
  const { project } = useSelector((store) => store);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const messagesEndRef = useRef(null); // Added useRef

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    dispatch(fetchProjectById(id));
  }, [id]);

  const generateContent = async () => {
    setLoading(true);
    try {
      await dispatch(
        createChatbot({
          content: message,
          userId: auth.user.id,
          projectId: id,
        })
      );
      await dispatch(fetchChatbotByProjectId(id));

      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${CHAT_GPT_API_KEY}`;
      const payload = {
        contents: [
          {
            parts: [{ text: message }],
          },
        ],
      };

      setMessage("");

      const response = await axios({
        url: endpoint,
        method: "post",
        data: payload,
        headers: { "Content-Type": "application/json" },
      });

      await dispatch(
        createChatbot({
          content: response.data.candidates[0].content.parts[0].text,
          userId: 999999,
          projectId: id,
        })
      );
      await dispatch(fetchChatbotByProjectId(id));
      setTimeout(() => {
        dispatch(fetchChatbotByProjectId(id));
      }, 1000);
    } catch (error) {
      console.error("Error generating content:", error);
      setMessage("Error generating content");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(fetchChatbotByProjectId(id));
  }, [id, dispatch]);

  useEffect(() => {
    scrollToBottom();
  }, [chatbot.chatbots]); // Scroll to bottom when chat updates

  console.log(chatbot);

  return (
    <div className="sticky">
      <div className="rounded-lg">
        <ScrollArea
          className="h-[30.5rem] w-full px-5 py-2 flex gap-3 flex-col"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {chatbot.chatbots?.map((item, idx) =>
            item.userId == "999999" ? (
              <div
                className="flex items-end justify-start gap-2 mb-2"
                key={idx + idx + idx + " " + idx}
              >
                <Avatar>
                  <AvatarFallback className="font-semibold bg-gray-200 text-gray-950">
                    <BotIcon className="h-5 w-5 " />
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2 py-1 px-2 border border-gray-200 bg-gray-200 rounded-ss-xl rounded-e-xl max-w-[60%]">
                  <div>
                    <p
                      className="text-gray-800 text-x"
                      dangerouslySetInnerHTML={{
                        __html: item.content.replace(
                          /\*\*(.*?)\*\*/g,
                          "<strong>$1</strong>"
                        ),
                      }}
                    ></p>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="flex items-end justify-end gap-2 mb-2"
                key={idx + item + idx + item}
              >
                <div className="max-w-[60%]">
                  {project.projectDetails?.team?.map(
                    (user) =>
                      user.id === item.userId && (
                        <span className="text-xs">{user.fullName}</span>
                      )
                  )}
                  <div className="space-y-2 py-1 px-2 border bg-blue-500 text-white rounded-s-xl rounded-tr-xl">
                    <div>
                      <p className="text-white text-x">{item.content}</p>
                    </div>
                  </div>
                </div>
                <Avatar>
                  <AvatarFallback className="font-semibold bg-blue-50 text-blue-600">
                    {auth.user.fullName[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
            )
          )}
          <div ref={messagesEndRef} /> {/* Added scroll target */}
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
            className="absolute right-2 top-3 rounded-full cursor-pointer"
            size="icon"
            variant="ghost"
            onClick={generateContent}
            disabled={loading}
          >
            <PaperPlaneIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
