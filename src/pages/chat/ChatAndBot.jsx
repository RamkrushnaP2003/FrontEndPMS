import React, { useState } from "react";
import Chatbox from "./Chatbox";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { BotIcon } from "lucide-react";
import Chatbot from "./Chatbot";
import Chatroom from "./Chatroom";

const ChatAndBot = () => {
  const [activeTab, setActiveTab] = useState("chatbox");

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Custom Tab Navigation */}
      <div className="flex w-full bg-blue-400 rounded-lg p-1 shadow-md">
        <button
          onClick={() => setActiveTab("chatbox")}
          className={`flex-1 py-2 cursor-pointer text-sm font-medium rounded-md flex items-center justify-center transition-all 
            ${
              activeTab === "chatbox"
                ? "bg-white text-blue-600 shadow-md"
                : "text-white hover:bg-blue-600"
            } focus:outline-none`}
        >
          <ChatBubbleIcon className="mr-2 w-5 h-5" />
          ChatRoom
        </button>

        <button
          onClick={() => setActiveTab("chatbot")}
          className={`flex-1 py-2 cursor-pointer text-sm font-medium rounded-md flex items-center justify-center transition-all 
            ${
              activeTab === "chatbot"
                ? "bg-white text-blue-600 shadow-md"
                : "text-white hover:bg-blue-600"
            } focus:outline-none`}
        >
          <BotIcon className="mr-2 w-5 h-5" />
          Bot
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-gray-50 rounded-lg mt-3 shadow-sm">
        {activeTab === "chatbox" ? <Chatroom /> : <Chatbot />}
      </div>
    </div>
  );
};

export default ChatAndBot;
