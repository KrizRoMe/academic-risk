import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableCustom from "@/components/Tables/TableCustom";
import {
  getCourses,
  getCoursesByStudentId,
} from "@/app/services/course.service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const metadata: Metadata = {
  title: "AcademicRisk | Cursos",
};

const columns = [
  { header: "Curso", field: "name" },
  { header: "Código", field: "code" },
  { header: "Docente", field: "teacher" },
];
interface Teacher {
  name: string;
}

interface Course {
  name?: string;
  code?: string;
  semester?: number;
  year?: number;
  teacherId?: number;
  teacher?: string;
}

interface CoursePageProps {
  courses: Course[];
}

export default async function CoursePage() {
  const session: any = await getServerSession(authOptions);
  const userCode = session?.user.username.toString();
  let courses: Course[] = await getCoursesByStudentId(userCode);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Cursos" />
      <div className="flex flex-col gap-10">
        {courses.length === 0 ? (
          <div>TODAVÍA NO TENEMOS ELEMENTOS</div>
        ) : (
          <TableCustom columns={columns} data={courses}></TableCustom>
        )}
      </div>
    </DefaultLayout>
  );
}
