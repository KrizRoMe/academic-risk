"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  FormEvent,
  ReactNode,
} from "react";
import { Chat } from "@/types/chat";
import { getCurrentTime } from "@/utils/getCurrentTime";

interface ChatContextProps {
  chats: Chat[];
  chatContainerRef: React.RefObject<HTMLDivElement>;
  handleSubmit: (e: FormEvent) => void;
  addMessage: (message: string, isUser: boolean) => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

export const ChatbotProvider = ({ children }: { children: ReactNode }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const addMessage = (message: string, isUser: boolean) => {
    const id = Math.floor(Math.random() * 1000);
    const currentTime = getCurrentTime();

    setChats((prevChats) => [
      ...prevChats,
      { id, message, isUser, time: currentTime },
    ]);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const userMessage = formData.get("userMessage") as string;
    const inputMessage = form.querySelector(
      "input[name=userMessage]",
    ) as HTMLInputElement;

    inputMessage.disabled = true;
    addMessage(userMessage, true);
    form.reset();

    const response = await fetch("/api/chatbot", {
      method: "POST",
      body: JSON.stringify({ userMessage }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    addMessage(data, false);
    inputMessage.disabled = false;
  };

  useEffect(() => {
    if (!chatContainerRef.current) {
      return;
    }

    const { scrollHeight } = chatContainerRef.current;

    chatContainerRef.current.scrollTo({
      top: scrollHeight,
      behavior: "smooth",
    });
  }, [chats]);

  return (
    <ChatContext.Provider
      value={{ chats, chatContainerRef, handleSubmit, addMessage }}
    >
      {children}
    </ChatContext.Provider>
  );
};
