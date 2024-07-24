"use client";

import { useChat } from "@/context/chatbot.context";
import { Chat } from "@/types/chat";
import InterventionTypeList from "./InterventionTypeList";

function ListChat() {
  const { chats, chatContainerRef } = useChat();

  const getFormattedDate = (date: Date) => {
    const newDate = new Date(date);
    const day = String(newDate.getDate()).padStart(2, '0');
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const year = newDate.getFullYear();
    const hours = String(newDate.getHours()).padStart(2, '0');
    const minutes = String(newDate.getMinutes()).padStart(2, '0');
    const seconds = String(newDate.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const chatToDisplay = chats.slice(1)

  return (
    <div className="h-full overflow-y-auto p-6" ref={chatContainerRef}>
      <InterventionTypeList />

      {chatToDisplay.map((chat: Chat) => (
        <div
          key={chat.id}
          className={`mb-5 flex ${chat.is_user_sender ? "justify-end" : ""}`}
        >
          <div
            className={`max-w-[80%] rounded border border-stroke bg-gray-2 p-3.5 text-black shadow-md dark:border-strokedark dark:bg-boxdark-2 dark:text-white ${chat.is_user_sender && "bg-primary text-white dark:bg-primary dark:text-white"}`}
          >
            <p
              className="text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: chat.content }}
            />
            <span
              className={`mt-1.5 flex justify-between text-xs text-black dark:text-white ${chat.is_user_sender ? "bg-primary text-white" : ""}`}
            >
              {getFormattedDate(chat.updatedAt)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListChat;
