"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
// import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import MailSuccess from "../mail-success/page";
import { useState } from "react";
import Loader from "@/components/common/Loader";

// export const metadata: Metadata = {
//   title: "AcamedicRisk | Profile",
// };

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: session, status }: any = useSession();
  const router = useRouter();

  const handleSendWhatsappNotification = () => {
    const phone = "+51986550234";

    setIsLoading(true);
    fetch("/api/whatsapp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone }),
    })
      .then((response) => response.json())
      .then((data) => {
        router.push("/dashboard/mail-success");
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <DefaultLayout>
          <div className="mx-auto max-w-242.5">
            <Breadcrumb pageName="Perfil" />

            <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="relative z-20 h-35 md:h-65">
                <Image
                  src={"/images/cover/cover-01.webp"}
                  alt="profile cover"
                  className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
                  width={970}
                  height={260}
                  style={{
                    width: "auto",
                    height: "auto",
                  }}
                />
                <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
                  <label
                    htmlFor="cover"
                    className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary px-2 py-1 text-sm font-medium text-white hover:bg-opacity-80 xsm:px-4"
                  >
                    <input
                      type="file"
                      name="cover"
                      id="cover"
                      className="sr-only"
                    />
                    <span>
                      <Image
                        src={"/images/user/camera.svg"}
                        width={14}
                        height={14}
                        style={{
                          width: "auto",
                          height: "auto",
                        }}
                        alt="camera"
                      />
                    </span>
                    <span>Edit</span>
                  </label>
                </div>
              </div>
              <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
                <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
                  <div className="relative drop-shadow-2">
                    <Image
                      src={"/images/user/user-02.png"}
                      width={160}
                      height={160}
                      style={{
                        width: "auto",
                        height: "auto",
                      }}
                      alt="profile"
                    />
                    <label
                      htmlFor="profile"
                      className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
                    >
                      <Image
                        src={"/images/user/camera.svg"}
                        width={14}
                        height={14}
                        style={{
                          width: "auto",
                          height: "auto",
                        }}
                        alt="camera"
                      />
                      <input
                        type="file"
                        name="profile"
                        id="profile"
                        className="sr-only"
                      />
                    </label>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="font-medium">👋 Bienvenido</p>
                  <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                    {status !== "loading" && session?.user?.username}
                  </h3>
                  <div className="mx-auto mb-5.5 mt-4.5 grid max-w-150 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
                    {status !== "loading" && session.user.role === "STUDENT" ? (
                      <>
                        <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                          <span className="me-1 text-sm">
                            Cursos en Riesgo:
                          </span>
                          <span className="font-semibold text-black dark:text-white">
                            8
                          </span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                          <span className="me-1 text-sm">
                            Calificación Promedio:
                          </span>
                          <span className="font-semibold text-black dark:text-white">
                            12
                          </span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                          <span className="me-1 text-sm">Tutorías:</span>
                          <span className="font-semibold text-black dark:text-white">
                            3
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                          <span className="me-1 text-sm">Alumnos:</span>
                          <span className="font-semibold text-black dark:text-white">
                            267
                          </span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                          <span className="me-1 text-sm">Docentes:</span>
                          <span className="font-semibold text-black dark:text-white">
                            9
                          </span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                          <span className="me-1 text-sm">Alumnos en RA:</span>
                          <span className="font-semibold text-black dark:text-white">
                            113
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                  <button
                    onClick={() => handleSendWhatsappNotification()}
                    className="inline-flex items-center justify-center gap-2.5 bg-primary px-6 py-3 text-center font-medium text-white hover:bg-opacity-90"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="icon icon-tabler icons-tabler-outline icon-tabler-bell"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                      <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                    </svg>
                    Notificar Riesgo Académico
                  </button>
                </div>
              </div>
            </div>
          </div>
        </DefaultLayout>
      )}
    </>
  );
};

export default ProfilePage;
