import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableCustom from "@/components/Tables/TableCustom";
import { getStudents } from "@/app/services/student.service";

export const metadata: Metadata = {
  title: "AcademicRisk | Cursos",
};

const columns = [
  { header: "Nombre", field: "name" },
  { header: "Apellidos", field: "surname" },
  { header: "Código de Alumno", field: "code" },
  { header: "DNI", field: "dni" }
];

interface Student {
    name: string;
    surname: string;
    code: string;
    dni: string;
}


export default async function StudentListPage() {
  let students: Student[] = await getStudents();
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Cursos" />

      <div className="flex flex-col gap-10">
        <TableCustom columns={columns} data={students}></TableCustom>
      </div>
    </DefaultLayout>
  );
}
