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
import { Intervention } from "@prisma/client";

interface ChatContextProps {
  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
  chatContainerRef: React.RefObject<HTMLDivElement>;
  handleSubmit: (e: FormEvent) => void;
  addMessage: (message: string, isUser: boolean) => void;
  setIntervention: React.Dispatch<React.SetStateAction<Intervention | undefined>>;
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
  const [intervention, setIntervention] = useState<Intervention>();

  const addMessage = (content: string, is_user_sender: boolean) => {
    const id = Math.floor(Math.random() * 1000);
    const currentTime = new Date()

    setChats((prevChats) => [
      ...prevChats,
      { id, content, is_user_sender, updatedAt: currentTime },
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
    const isUser = true;

    inputMessage.disabled = true;
    addMessage(userMessage, isUser);
    form.reset();

    const response = await fetch("/api/chatbot", {
      method: "POST",
      body: JSON.stringify({ userMessage, intervention, isUser }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    addMessage(data, false);
    inputMessage.disabled = false;
  };

  const getChatMessageList = async (interventionId: number) => {
    const response = await fetch("/api/chat-message", {
      method: "POST",
      body: JSON.stringify({ interventionId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Error fetching chat messages");
      return;
    }

    const {chatMessageList} = await response.json();

    console.log("chatMessageList", chatMessageList);

    if (chatMessageList) {
      setChats(chatMessageList);
    }
  }

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

  useEffect(() => {
    if (!intervention) {
      return
    }

    getChatMessageList(intervention.id);
  }, [intervention]);

  return (
    <ChatContext.Provider
      value={{ chats, setChats, chatContainerRef, handleSubmit, addMessage, setIntervention }}
    >
      {children}
    </ChatContext.Provider>
  );
};
