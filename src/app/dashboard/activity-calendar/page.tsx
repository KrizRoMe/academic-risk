import Calendar from "@/components/Calender";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "AcademicRisk | Calendar",
};

const ActivityCalendarPage = () => {
  return (
    <DefaultLayout>
      <Calendar />
    </DefaultLayout>
  );
};

export default ActivityCalendarPage;
