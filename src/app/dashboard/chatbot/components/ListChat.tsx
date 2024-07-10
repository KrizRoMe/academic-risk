"use client";

import { useChat } from "@/context/chatbot.context";
import { Chat } from "@/types/chat";
import InterventionTypeList from "./InterventionTypeList";

function ListChat() {
  const { chats, chatContainerRef } = useChat();

  return (
    <div className="h-full overflow-y-auto p-6" ref={chatContainerRef}>
      <InterventionTypeList />

      {chats.map((chat: Chat) => (
        <div
          key={chat.id}
          className={`mb-5 flex ${chat.isUser ? "justify-end" : ""}`}
        >
          <div
            className={`max-w-[80%] rounded border border-stroke bg-gray-2 p-3.5 text-black shadow-md dark:border-strokedark dark:bg-boxdark-2 dark:text-white ${chat.isUser && "bg-primary text-white dark:bg-primary dark:text-white"}`}
          >
            <p
              className="text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: chat.message }}
            />
            <span
              className={`mt-1.5 flex justify-between text-xs text-black dark:text-white ${chat.isUser ? "bg-primary text-white" : ""}`}
            >
              {chat.time}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListChat;
