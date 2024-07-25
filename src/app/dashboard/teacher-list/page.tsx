import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableCustom from "@/components/Tables/TableCustom";
import { getTeachers } from "@/app/services/teacher.service";

export const metadata: Metadata = {
  title: "AcademicRisk | Cursos",
};

const columns = [
  { header: "Nombre", field: "name" },
  { header: "Apellidos", field: "lastname" },
  { header: "DNI", field: "dni" }
];

interface Teacher {
    name: string;
    lastname: string;
    dni: string;
}


export default async function StudentListPage() {
  let teachers: Teacher[] = await getTeachers();
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Cursos" />

      <div className="flex flex-col gap-10">
        <TableCustom columns={columns} data={teachers}></TableCustom>
      </div>
    </DefaultLayout>
  );
}
