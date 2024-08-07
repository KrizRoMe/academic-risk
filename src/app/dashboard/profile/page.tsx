"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
// import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { Intervention, RiskCourse, Grade, Student } from "@prisma/client";

// export const metadata: Metadata = {
//   title: "AcamedicRisk | Profile",
// };

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [interventionList, setInterventionList] = useState<Intervention[]>([]);
  const [allInterventionList, setAllInterventionList] = useState<Intervention[]>([]);
  const [riskCourseList, setRiskCourseList] = useState<RiskCourse[]>([]);
  const [lengthStudentList, setLengthStudentList] = useState<number>(0);
  const [lengthTeacherList, setLengthTeacherList] = useState<number>(0);
  const [gradeCourseList, setGradeCourseList] = useState<Grade[]>([]);
  const [gradeAverage, setGradeAverage] = useState<number>(0);
  const [riskCoursesCount, setRiskCoursesCount] = useState<number>(0);
  const [studentsAtRisk, setStudentsAtRisk] = useState<[]>([]);
  const [studentInformation, setStudentInformation] = useState<Student | null>(null)

  const { data: session, status }: any = useSession();
  const router = useRouter();
  const codeStudent = session?.user?.username;

  const handleUpdateStudentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget
    const formData = new FormData(form);
    const name = formData.get("username") as string;
    const surname = formData.get("surname") as string;
    const dni = formData.get("dni") as string;
    const phone = formData.get("phone") as string;

    const response = await fetch(`/api/student/${codeStudent}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, surname, dni, phone }),
    });

    if (!response.ok) {
      alert("Error al actualizar la información");
    }

    const updatedStudentInformation = await response.json();

    if (updatedStudentInformation) {
      setStudentInformation(updatedStudentInformation);
      alert("Información actualizada correctamente");
    }
  }

  const getStudentInformation = async () => {
    const response = await fetch(`/api/student/${codeStudent}`, {
      method: "GET",
    });

    if (!response.ok) {
      console.error("Error fetching student information");
      return;
    }

    const studentInformation = await response.json();

    console.log("studentInformation", studentInformation);

    if (studentInformation) {
      setStudentInformation(studentInformation);
    }
  }

  const handleSendWhatsappNotification = async () => {
    const phone = "+51986550234";

    setIsLoading(true);
    try {
      const response = await fetch("/api/whatsapp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });
      const data = await response.json();

      router.push("/dashboard/mail-success");
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const getInterventionList = async () => {
    const response = await fetch("/api/chatbot/intervention", {
      method: "POST",
      body: JSON.stringify({ userId: session?.user?.id }),
    });
    const interventionList = await response.json();
    setInterventionList(interventionList);
  };

  const getAllInterventionList = async () => {
    const response = await fetch("/api/chatbot/intervention", {
      method: "GET",
    });
    const allInterventionList = await response.json();
    setAllInterventionList(allInterventionList);
  }

  const getRiskCourses = async () => {
    const response = await fetch("/api/risk-course", {
      method: "GET",
    });
    const riskCourseList = await response.json();
    setRiskCourseList(riskCourseList);
  };

  const getListStudent = async () => {
    const response = await fetch("/api/student", {
      method: "GET",
    });

    if (!response.ok) {
      console.error("Error fetching student list");
      return;
    }

    const studentList = await response.json();

    if (studentList) {
      setLengthStudentList(studentList.length);
    }
  };

  const getListTeacher = async () => {
    const response = await fetch("/api/teacher", {
      method: "GET",
    });

    if (!response.ok) {
      console.error("Error fetching teacher list");
      return;
    }

    const teacherList = await response.json();

    if (teacherList) {
      setLengthTeacherList(teacherList.length);
    }
  };

  const averageGradeByStudent = async (codeStudent: string) => {
    try {
      const response = await fetch(`/api/grade/${codeStudent}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setGradeCourseList(data.gradeList);
      setGradeAverage(data.average);
      setStudentsAtRisk(data.studentsAtRisk);
      return data;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const getRiskCoursesCount = async (codeStudent: string) => {
    try {
      const response = await fetch(`/api/risk-course/${codeStudent}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const riskCoursesCount = data.riskCoursesCount;
      setRiskCoursesCount(riskCoursesCount);
    } catch (error) {
      console.error(
        "An error occurred while fetching the risk courses:",
        error,
      );
    }
  };

  useEffect(() => {
    getStudentInformation();
    getRiskCourses();
    getInterventionList();
    getListStudent();
    getListTeacher();
    averageGradeByStudent(codeStudent);
    getRiskCoursesCount(codeStudent);
    getAllInterventionList();
  }, []);

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
                    {status !== "loading" &&
                      session?.user &&
                      session?.user?.username}
                  </h3>
                  <div className="mx-auto mb-5.5 mt-4.5 grid max-w-150 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
                    {status !== "loading" &&
                    session?.user &&
                    session?.user?.role === "STUDENT" ? (
                      <>
                        <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                          <span className="me-1 text-sm">
                            Cursos en Riesgo:
                          </span>
                          <span className="font-semibold text-black dark:text-white">
                            {riskCoursesCount}
                          </span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                          <span className="me-1 text-sm">
                            Calificación Promedio:
                          </span>
                          <span className="font-semibold text-black dark:text-white">
                            {Math.round(gradeAverage)}
                          </span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                          <span className="me-1 text-sm">Tutorías:</span>
                          <span className="font-semibold text-black dark:text-white">
                            {interventionList.length ?? 0}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                          <span className="me-1 text-sm">Estudiantes:</span>
                          <span className="font-semibold text-black dark:text-white">
                            {lengthStudentList}
                          </span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                          <span className="me-1 text-sm">Docentes:</span>
                          <span className="font-semibold text-black dark:text-white">
                            {lengthTeacherList}
                          </span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                          <span className="me-1 text-sm">Total Tutorías:</span>
                          <span className="font-semibold text-black dark:text-white">
                            {allInterventionList.length ?? 0}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                  {session?.user && session?.user?.role === "ADMIN" && (
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
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-bell"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                        <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                      </svg>
                      Notificar Riesgo Académico
                    </button>
                  )}
                  {session?.user && session?.user?.role === "STUDENT" && (
                    <>
                      <h4 className="text-xl font-semibold text-black dark:text-white text-center my-3">
                      Datos Personales
                      </h4>
                      <form className="flex-col justify-center items-center gap-3 w-full" onSubmit={handleUpdateStudentSubmit}>
                        <section className="flex gap-2 mb-2">
                          <div className="flex-1">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white text-start">
                            Nombre
                            </label>
                            <input
                              type="text"
                              placeholder="Nombre"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              defaultValue={studentInformation?.name}
                              name="username"
                            />
                          </div>

                          <div className="flex-1">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white text-start">
                            Apellidos
                            </label>
                            <input
                              type="text"
                              placeholder="Enter your last name"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              defaultValue={studentInformation?.surname}
                              name="surname"
                            />
                          </div>
                        </section>

                        <section className="flex gap-2 mb-2">
                          <div className="flex-1">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white text-start">
                            Código de estudiante
                            </label>
                            <input
                              type="text"
                              placeholder="Nombre"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              defaultValue={studentInformation?.code}
                              disabled
                            />
                          </div>

                          <div className="flex-1">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white text-start">
                            DNI
                            </label>
                            <input
                              type="text"
                              placeholder="Enter your last name"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              defaultValue={studentInformation?.dni}
                              name="dni"
                            />
                          </div>
                        </section>

                        <section className="flex gap-2 mb-2">
                          <div className="flex-1">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white text-start">
                            Teléfono
                            </label>
                            <input
                              type="text"
                              placeholder="Teléfono"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              defaultValue={studentInformation?.phone}
                              name="phone"
                            />
                          </div>
                        </section>

                        <div>
                          <input
                            type="submit"
                            value="Actualizar"
                            className=" mt-2 w-50 cursor-pointer rounded-lg border border-primary bg-primary p-3 text-white transition hover:bg-opacity-90"
                          />
                        </div>
                      </form>
                    </>
                  )}
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
