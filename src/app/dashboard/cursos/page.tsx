import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableCustom from "@/components/Tables/TableCustom";

export const metadata: Metadata = {
  title: "AcademicRisk | Cursos",
};

const columns = [
  { header: "Curso", field: "curso", span: 3},
  { header: "Docente", field: "docente", span: 2 },
  
];
const data = [
  {
    curso: "Calculo Diferencial",
    docente:"Roberto Perales",
   
    
  },
  {
    curso: "Calculo integral",
    docente:"Roberto Perales",
    
    
  },
  {
    curso: "Fisica",
    docente:"Victor Cabrera Abanto",
    
    
  },
  {
    curso: "Fisica Moderna",
    docente:"Victor Cabrera Abanto",
   
    
  },
 
];

const Curso = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Curso" />

      <div className="flex flex-col gap-10">
        <TableCustom columns={columns} data={data}></TableCustom>
      </div>
    </DefaultLayout>
  );
};

export default Curso;