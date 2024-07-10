import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FormChat from "./components/FormChat";
import ListChat from "./components/ListChat";
import SidebarChat from "./components/SidebarChat";
import { ChatbotProvider } from "@/context/chatbot.context";
import HeaderChat from "./components/HeaderChat";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AcademicRisk | Chatbot",
};

const ChatbotPage = () => {
  return (
    <ChatbotProvider>
      <DefaultLayout>
        <Breadcrumb pageName="Tutor IA" />

        <div className="h-[calc(100vh-186px)] overflow-hidden sm:h-[calc(100vh-174px)]">
          <div className="h-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:flex">
            <SidebarChat />
            <div className="flex h-full flex-col border-l border-stroke dark:border-strokedark xl:w-3/4">
              <HeaderChat />
              <ListChat />
              <FormChat />
            </div>
          </div>
        </div>
      </DefaultLayout>
    </ChatbotProvider>
  );
};

export default ChatbotPage;
