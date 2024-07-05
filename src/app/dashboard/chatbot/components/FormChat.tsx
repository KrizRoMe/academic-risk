"use client";

import { useChat } from "@/context/chatbot.context";

function FormChat() {
  const { handleSubmit } = useChat();

  return (
    <div className="sticky bottom-0 w-full border-t border-stroke bg-white px-6 py-5 dark:border-strokedark dark:bg-boxdark">
      <form
        className="flex items-center justify-between space-x-4"
        onSubmit={handleSubmit}
      >
        <div className="relative w-full">
          <input
            placeholder="Escribe un mensaje..."
            className="h-13 w-full rounded-md border border-stroke bg-gray pl-5 pr-19 text-black placeholder-body outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark-2 dark:text-white"
            type="text"
            name="userMessage"
          />
        </div>
        <button
          className="flex h-13 w-full max-w-13 items-center justify-center rounded-md bg-primary text-white hover:bg-opacity-90"
          type="submit"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 2L11 13"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M22 2L15 22L11 13L2 9L22 2Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
      </form>
    </div>
  );
}

export default FormChat;
