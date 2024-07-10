import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableCustom from "@/components/Tables/TableCustom";
import { getGrades } from "@/app/services/grade.service";

export const metadata: Metadata = {
  title: "AcademicRisk | Grade",
};

const columns = [
  { header: "Curso", field: "course" },
  { header: "Nota 1", field: "value1" },
  { header: "Nota 2", field: "value2" },
  { header: "Nota 3", field: "value3" },
  { header: "Promedio", field: "promedio" },
];

export default async function GradePage() {
  const grades = await getGrades();

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Notas" />

      <div className="flex flex-col gap-10">
        <TableCustom columns={columns} data={grades}></TableCustom>
      </div>
    </DefaultLayout>
  );
}
