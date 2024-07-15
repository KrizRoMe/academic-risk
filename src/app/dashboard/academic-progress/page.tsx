import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DonutChart from "./components/DonutChart";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import LineChart from "./components/LineChart";

function AcademicProgressPage() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Progreso Académico" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <LineChart />
        <DonutChart />
      </div>
    </DefaultLayout>
  );
}

export default AcademicProgressPage;
