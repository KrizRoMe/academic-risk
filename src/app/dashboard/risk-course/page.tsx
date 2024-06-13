import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableCustom from "@/components/Tables/TableCustom";

export const metadata: Metadata = {
  title: "AcademicRisk | Risk Course",
};

const columns = [
  { header: "ID", field: "id", span: 3 },
  { header: "Nombre", field: "name", span: 3 },
  { header: "Curso", field: "course", span: 3 },
  { header: "N° Desapbrobados", field: "failed", span: 3 },
];
const data = [
  {
    id: 1,
    name: "Juan Perez",
    course: "Matematica",
    failed: 2,
  },
  {
    id: 2,
    name: "Maria Garcia",
    course: "Fisica",
    failed: 3,
  },
  {
    id: 3,
    name: "Pedro Rodriguez",
    course: "Quimica",
    failed: 1,
  },
];

const RiskCoursePage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Cursos en Riesgo" />

      <div className="flex flex-col gap-10">
        <TableCustom columns={columns} data={data}></TableCustom>
      </div>
    </DefaultLayout>
  );
};

export default RiskCoursePage;
