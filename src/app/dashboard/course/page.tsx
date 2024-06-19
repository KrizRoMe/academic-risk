"use client"; 

import { useEffect, useState } from 'react';
import Head from 'next/head';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableCustom from "@/components/Tables/TableCustom";

const columns = [
  { header: "Codigo", field: "code" },
  { header: "Nombre", field: "name" },
];

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/course');
        if (!response.ok) throw new Error("Error fetching data");
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <Head>
        <title>AcademicRisk | Cursos</title>
      </Head>
      <Breadcrumb pageName="Cursos" />
      <div className="flex flex-col gap-10">
        <TableCustom columns={columns} data={courses} />
      </div>
    </DefaultLayout>
  );
};

export default CourseList;

