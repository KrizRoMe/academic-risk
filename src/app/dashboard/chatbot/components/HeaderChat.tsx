import Image from "next/image";
import React from "react";

function HeaderChat() {
  return (
    <div className="sticky flex items-center justify-between border-b border-stroke px-6 py-4.5 dark:border-strokedark">
      <div className="flex items-center">
        <div className="mr-4.5 h-13 w-full max-w-13 overflow-hidden rounded-full">
          <Image
            alt="avatar"
            loading="lazy"
            width="52"
            height="52"
            className="h-full w-full object-cover object-center"
            src="/images/user/user-03.svg"
          />
        </div>
        <div>
          <h5 className="font-medium text-black dark:text-white">Tutor IA</h5>
          <p className="text-sm">Estoy listo para ayudarte 🙂</p>
        </div>
      </div>
      <div>
        <div className="relative flex">
          <button>
            <Image
              src={"/images/form/points.svg"}
              alt="points"
              width={18}
              height={18}
              style={{
                width: "auto",
                height: "auto",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeaderChat;
