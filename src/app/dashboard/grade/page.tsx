import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableCustom from "@/components/Tables/TableCustom";
import { getGradesByStudentId } from "@/app/services/grade.service";
import { getServerSession } from "next-auth";

import { authOptions } from "@/libs/authOptions";

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
  const session: any = await getServerSession(authOptions);
  const userCode = session?.user?.username?.toString();
  const grades = await getGradesByStudentId(userCode);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Notas" />
      <div className="flex flex-col gap-10">
        {grades.length === 0 ? (
          <div>TODAVÍA NO TENEMOS ELEMENTOS</div>
        ) : (
          <TableCustom columns={columns} data={grades}></TableCustom>
        )}
      </div>
    </DefaultLayout>
  );
}
