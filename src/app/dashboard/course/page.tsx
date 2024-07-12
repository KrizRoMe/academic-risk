import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableCustom from "@/components/Tables/TableCustom";
import { getCourses } from "@/app/services/course.service";

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
  name: string;
  code: string;
  semester: number;
  year: number;
  teacherId: number;
  teacher: string;
}

interface CoursePageProps {
  courses: Course[];
}

export default async function CoursePage() {
  let courses: Course[] = await getCourses();
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Cursos" />

      <div className="flex flex-col gap-10">
        <TableCustom columns={columns} data={courses}></TableCustom>
      </div>
    </DefaultLayout>
  );
}
