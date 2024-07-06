import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableCustom from "@/components/Tables/TableCustom";
import { getRiskCourses } from "@/app/services/riskcourse.service";

export const metadata: Metadata = {
  title: "AcademicRisk | Risk Course",
};

const columns = [
  { header: "ID", field: "id", span: 3 },
  { header: "Curso", field: "course", span: 3 },
  { header: "N° Desapbrobados", field: "failures", span: 3 },
];


export default async function RiskCoursePage() {

  const risk = await getRiskCourses();

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Cursos en Riesgo" />

      <div className="flex flex-col gap-10">
        <TableCustom columns={columns} data={risk}></TableCustom>
      </div>
    </DefaultLayout>
  );
};

