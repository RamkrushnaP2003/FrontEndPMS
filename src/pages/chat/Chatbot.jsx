import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  fetchChatByProject,
  fetchChatMessages,
  sendMessage,
} from "@/redux/chat/Action";
import { createChatbot, fetchChatbotByProjectId } from "@/redux/chatbot/Action";
import { store } from "@/redux/Store";
import { ChatBubbleIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { BotIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { map } from "zod";

const Chatbot = () => {
  const auth = useSelector((store) => store.auth);
  const chatbot = useSelector((store) => store.chatbot);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();

  const generateContent = async () => {
    setLoading(true);
    try {
      // Send the user's message to the chatbot (createChatbot action)
      await dispatch(
        createChatbot({
          content: message,
          userId: auth.user.id,
          projectId: id,
        })
      );
      // Fetch the current chatbot messages once
      await dispatch(fetchChatbotByProjectId(id));

      const apiKey = "AIzaSyDTqI37_ZFU2GUS2bWFVZd2BbIjWAn7ckg"; // Replace with your API key
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
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

      // Dispatch the generated chatbot message
      await dispatch(
        createChatbot({
          content: response.data.candidates[0].content.parts[0].text,
          userId: 999999,
          projectId: id,
        })
      );
      await dispatch(fetchChatbotByProjectId(id)); // first reload
      setTimeout(() => {
        dispatch(fetchChatbotByProjectId(id)); // second reload after 1 second
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

  return (
    <div className="sticky">
      <div className="border rounded-lg">
        <ScrollArea className="h-[32rem] w-full px-5 py-2 flex gap-3 flex-col">
          {chatbot.chatbots?.map((item, idx) =>
            item.userId !== auth.user.id ? (
              <div
                className="flex items-end justify-start gap-2 mb-2"
                key={idx + idx + idx + " " + idx}
              >
                <Avatar>
                  <AvatarFallback className="font-semibold">
                    <BotIcon className="h-5 w-5 " />
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2 py-1 px-2 border border-gray-200 bg-gray-200 rounded-ss-xl rounded-e-xl max-w-[60%]">
                  <div>
                    <p className="text-gray-800 text-x">{item.content}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="flex items-end justify-end gap-2 mb-2"
                key={idx + item + idx + item}
              >
                <div className="space-y-2 py-1 px-2 border bg-gray-700 text-white rounded-s-xl rounded-tr-xl max-w-[60%]">
                  <div>
                    <p className="text-gray-200 text-x">{item.content}</p>
                  </div>
                </div>
                <Avatar>
                  <AvatarFallback className="font-semibold">
                    {auth.user.fullName[0]}
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
