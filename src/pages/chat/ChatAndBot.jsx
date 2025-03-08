import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import Chatbox from "./Chatbox";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { BotIcon } from "lucide-react";
import Chatbot from "./Chatbot";

const ChatAndBot = () => {
  return (
    <div>
      <Tabs defaultValue="chatbox" className="w-[100%]">
        <TabsList className="w-full">
          <TabsTrigger value="chatbox">
            <ChatBubbleIcon />
            &nbsp;Chat Box
          </TabsTrigger>
          <TabsTrigger value="chatbot">
            <BotIcon />
            Chatbot
          </TabsTrigger>
        </TabsList>
        <TabsContent value="chatbox">
          <Chatbox />
        </TabsContent>
        <TabsContent value="chatbot">
          <Chatbot />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChatAndBot;
