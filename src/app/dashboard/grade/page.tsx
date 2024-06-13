import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableCustom from "@/components/Tables/TableCustom";

export const metadata: Metadata = {
  title: "AcademicRisk | Grade",
};

const columns = [
  { header: "Curso", field: "curso" },
  { header: "Nota 1", field: "nota1" },
  { header: "Nota 2", field: "nota2" },
  { header: "Nota 3", field: "nota3" },
  { header: "Promedio", field: "promedio" },
];
const data = [
  {
    curso: "Calculo Diferencial",
    nota1: 12.5,
    nota2: 12.5,
    nota3: 12.5,
    promedio: 12.5,
  },
  {
    curso: "Calculo integral",
    nota1: 12.5,
    nota2: 12.5,
    nota3: 12.5,
    promedio: 12.5,
  },
  {
    curso: "Fisica",
    nota1: 12.5,
    nota2: 12.5,
    nota3: 12.5,
    promedio: 12.5,
  },
  {
    curso: "Fisica Moderna",
    nota1: 12.5,
    nota2: 12.5,
    nota3: 12.5,
    promedio: 12.5,
  },
];

const Grade = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Calificaciones" />

      <div className="flex flex-col gap-10">
        <TableCustom columns={columns} data={data}></TableCustom>
      </div>
    </DefaultLayout>
  );
};

export default Grade;
