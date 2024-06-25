import Image from "next/image";
import React from "react";

function SidebarChat() {
  return (
    <div className="hidden h-full flex-col xl:flex xl:w-1/4">
      <div className="sticky border-b border-stroke px-6 py-7.5 dark:border-strokedark">
        <h3 className="text-lg font-medium text-black dark:text-white 2xl:text-xl">
          Intervenciones
          <span className="rounded-md border-[.5px] border-stroke bg-gray-2 px-2 py-0.5 text-base font-medium text-black dark:border-strokedark dark:bg-boxdark-2 dark:text-white 2xl:ml-4">
            4
          </span>
        </h3>
      </div>
      <div className="flex max-h-full flex-col overflow-auto p-5">
        <form className="sticky mb-7">
          <input
            className="w-full rounded border border-stroke bg-gray-2 py-2.5 pl-5 pr-10 text-sm outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark-2"
            placeholder="Search..."
            type="text"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2">
            <Image
              src={"/images/form/search.svg"}
              alt="search"
              width={18}
              height={18}
              style={{
                width: "auto",
                height: "auto",
              }}
            />
          </button>
        </form>
        <div className="no-scrollbar max-h-full space-y-2.5 overflow-auto">
          {[
            {
              name: "Turoría Psicológica",
              message: "I cam across your profile and...",
            },
            {
              name: "Tutoría Social",
              message: "I like your confidence 💪",
            },
            {
              name: "Tutoría Académica",
              message: "Can you share your offer?",
              imgSrc: "/images/user/user-05.png",
            },
            {
              name: "Tutoría de Salud",
              message: "I'm waiting for you response!",
              imgSrc: "/images/user/user-01.png",
            },
          ].map((user, index) => (
            <div
              key={index}
              className="flex cursor-pointer items-center rounded px-4 py-2 hover:bg-gray-2 dark:hover:bg-strokedark"
            >
              <div className="w-full">
                <h5 className="text-sm font-medium text-black dark:text-white">
                  {user.name}
                </h5>
                <p className="text-sm">{user.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SidebarChat;
