import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

const Chatbox = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    setMessage("");
  };
  return (
    <div className="sticky">
      <div className="border rounded-lg">
        <h1 className="border-b p-5">Chat Box</h1>
        <ScrollArea className="h-[32rem] w-full px-5 py-2 flex gap-3 flex-col">
          {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, idx) =>
            idx % 2 == 0 ? (
              <div
                className="flex items-center justify-start gap-2 mb-2"
                key={idx + item + idx + item}
              >
                <Avatar>
                  <AvatarFallback>R</AvatarFallback>
                </Avatar>
                <div className="space-y-2 py-1 px-2 border border-gray-200 bg-gray-200 rounded-ss-xl rounded-e-xl">
                  <div>
                    <p className="font-semibold">ram</p>
                    <p className="text-gray-800">How are your</p>{" "}
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="flex items-center justify-end gap-2 mb-2"
                key={idx + item + idx + item}
              >
                <div className="space-y-2 py-1 px-2 border bg-black text-gray-50 rounded-s-xl rounded-tr-xl">
                  <div>
                    <p className="font-semibold">ram</p>
                    <p className="text-gray-200">How are your</p>{" "}
                  </div>
                </div>
                <Avatar>
                  <AvatarFallback>R</AvatarFallback>
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
