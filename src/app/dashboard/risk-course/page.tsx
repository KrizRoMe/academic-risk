import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableCustom from "@/components/Tables/TableCustom";
import {
  getRiskCourses,
  getRiskGradesByStudentId,
} from "@/app/services/riskcourse.service";
import { authOptions } from "@/libs/authOptions";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "AcademicRisk | Risk Course",
};

const columns = [
  { header: "ID", field: "id", span: 3 },
  { header: "Curso", field: "course", span: 3 },
  { header: "N° Desapbrobados", field: "failures", span: 3 },
];

export default async function RiskCoursePage() {
  const session: any = await getServerSession(authOptions);
  const userCode = session?.user?.username?.toString();
  const risk = await getRiskGradesByStudentId(userCode);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Cursos en Riesgo" />
      <div className="flex flex-col gap-10">
        {risk.length === 0 ? (
          <div>TODAVÍA NO TENEMOS ELEMENTOS</div>
        ) : (
          <TableCustom columns={columns} data={risk}></TableCustom>
        )}
      </div>
    </DefaultLayout>
  );
}
