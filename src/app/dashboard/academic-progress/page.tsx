"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DonutChart from "./components/DonutChart";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import EmotionAnalysis from "./components/EmotionAnalysis";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Grade } from "@prisma/client";

function AcademicProgressPage() {
  const { data: session, status }: any = useSession();
  const codeStudent = session?.user?.username;
  const [emotionData, setEmotionData]: any = useState(null);
  const [gradeCourseList, setGradeCourseList] = useState<Grade[]>([]);
  const [gradeAverage, setGradeAverage] = useState<number>(0);

  const averageGradeByStudent = async (codeStudent: string) => {
    try {
      const response = await fetch(`/api/grade/${codeStudent}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setGradeCourseList(data.gradeList);
      setGradeAverage(data.average);
      return data;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  useEffect(() => {
    fetch(`/api/chatbot/intervention/${codeStudent}`)
      .then((response) => response.json())
      .then((data) => setEmotionData(data?.emotionCount))
      .catch((error) => console.error(error));

    averageGradeByStudent(codeStudent);
  }, [codeStudent]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Progreso Académico" />
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <LineChart gradeAverage={gradeAverage} />
        <DonutChart gradeCourseList={gradeCourseList} />
        <BarChart emotionData={emotionData} />
        <EmotionAnalysis emotionData={emotionData} />
      </div>
    </DefaultLayout>
  );
}

export default AcademicProgressPage;
