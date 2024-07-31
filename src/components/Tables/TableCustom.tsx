"use client";

import { useStore } from "@/libs/zustand/store";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Column {
  header: string;
  field: string;
}

interface Data {
  [key: string]: any;
}

const TableCustom = ({
  columns,
  data,
}: {
  columns: Column[];
  data: Data[];
}) => {
  const { data: session, status }: any = useSession();

  const columnWidth = `${100 / columns.length}%`;
  const [searchText, setSearchText] = useState("");
  const { setSelectedSemester } = useStore();
  const { setSelectedYear } = useStore();
  const selectedSemester = useStore((state) => state.selectedSemester);

  const selectedYear = useStore((state) => state.selectedYear);
  const setActualPage = useStore((state) => state.setActualPage);
  const actualPage = useStore((state) => state.actualPage);

  const handleClick = (semester: string) => {
    if (selectedYear !== "Todos") {
      setSelectedSemester(semester);
    } else {
      setSelectedSemester("Todos");
    }
  };

  const filteredData = data.filter((row) => {
    let semester;
    let year;

    if ("semester" in row) {
      semester = row.semester === 1 ? "1" : "2";
    } else {
      const date = new Date(row.createdAt);
      semester = date.getMonth() < 7 ? "I" : "II";
    }

    if ("year" in row) {
      year = row.year.toString();
    } else {
      year = "Todos";
    }

    const yearMatches =
      selectedYear === "Todos" || year === selectedYear || year === "Todos";
    const semesterMatches =
      selectedSemester === "Todos" || semester === selectedSemester;

    const searchTextMatches = columns.some((column) =>
      row[column.field]
        ?.toString()
        .toLowerCase()
        .includes(searchText.toLowerCase()),
    );

    return yearMatches && semesterMatches && searchTextMatches;
  });

  useEffect(() => {
    if (filteredData[0].year) {
      setActualPage("grade");
    } else {
      setActualPage("other");
      setSelectedYear("Todos");
      setSelectedSemester("Todos");
    }
  }, [actualPage]);

  return (
    <section className="data-table-common data-table-two rounded-sm border border-stroke bg-white py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="max-w-full overflow-x-auto px-6">
        <div className="flex flex-wrap justify-between gap-2 border-b border-stroke pb-4 dark:border-strokedark">
          <div className="w-100">
            <input
              className="w-full rounded-md border border-stroke px-5 py-2.5 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
              placeholder="Search..."
              type="text"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          {session?.user?.role === "STUDENT" && (
            <div className="flex items-center rounded-lg border border-slate-300">
              <a
                onClick={() => handleClick("Todos")}
                className={`inline-flex rounded-l-lg px-2 py-1 font-medium ${selectedSemester === "Todos" || selectedYear === "Todos" ? " bg-primary text-white" : " text-black"} hover:border-primary hover:bg-primary hover:text-white dark:hover:border-primary sm:px-6 sm:py-3 ${selectedYear === "Todos" ? "rounded-e-lg" : "rounded-e-none"}`}
              >
                Todos
              </a>

              {selectedYear !== "Todos" && (
                <>
                  {" "}
                  <a
                    onClick={() => handleClick("1")}
                    className={`inline-flex  px-2 py-1 font-medium ${selectedSemester === "1" ? "bg-primary text-white" : "text-black"} hover:border-primary hover:bg-primary hover:text-white dark:hover:border-primary sm:px-6 sm:py-3`}
                    href="#"
                  >
                    {selectedYear} - I
                  </a>
                  <a
                    onClick={() => handleClick("2")}
                    className={`inline-flex rounded-r-lg  px-2 py-1 font-medium ${selectedSemester === "2" ? "bg-primary text-white" : "text-black"} hover:border-primary hover:bg-primary hover:text-white dark:border-strokedark dark:text-white dark:hover:border-primary sm:px-6 sm:py-3`}
                    href="#"
                  >
                    {selectedYear} - II
                  </a>
                </>
              )}
            </div>
          )}

          <div className="flex items-center font-medium">
            <select className="bg-transparent pl-2">
              <option value="5">10</option>
              <option value="10">20</option>
              <option value="20">30</option>
              <option value="50">40</option>
            </select>
            <p className="pl-2 text-black dark:text-white">Entries Per Page</p>
          </div>
        </div>
        <div className="min-w-[1170px]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-primary">
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="px-5 py-4 text-left text-white"
                    style={{ width: columnWidth }}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-t border-[#EEEEEE] dark:border-strokedark"
                >
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-5 py-4 text-[#637381] dark:text-bodydark"
                      style={{ width: columnWidth }}
                    >
                      {row[col.field]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between border-t border-stroke pb-1 pt-5 dark:border-strokedark">
          <p className="font-medium">Showing 1 of 3 pages</p>
          <div className="flex">
            <button className="flex cursor-pointer items-center justify-center rounded-md p-1 px-2 hover:bg-primary hover:text-white">
              <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.1777 16.1156C12.009 16.1156 11.8402 16.0593 11.7277 15.9187L5.37148 9.44995C5.11836 9.19683 5.11836 8.80308 5.37148 8.54995L11.7277 2.0812C11.9809 1.82808 12.3746 1.82808 12.6277 2.0812C12.8809 2.33433 12.8809 2.72808 12.6277 2.9812L6.72148 8.99995L12.6559 15.0187C12.909 15.2718 12.909 15.6656 12.6559 15.9187C12.4871 16.0312 12.3465 16.1156 12.1777 16.1156Z"
                  fill=""
                ></path>
              </svg>
            </button>
            <button className="mx-1 flex cursor-pointer items-center justify-center rounded-md bg-primary p-1 px-3 text-white hover:bg-primary hover:text-white">
              1
            </button>
            <button className="mx-1 flex cursor-pointer items-center justify-center rounded-md p-1 px-3 hover:bg-primary hover:text-white">
              2
            </button>
            <button className="mx-1 flex cursor-pointer items-center justify-center rounded-md p-1 px-3 hover:bg-primary hover:text-white">
              3
            </button>
            <button className="flex cursor-pointer items-center justify-center rounded-md p-1 px-2 hover:bg-primary hover:text-white">
              <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.82148 16.1156C5.65273 16.1156 5.51211 16.0593 5.37148 15.9468C5.11836 15.6937 5.11836 15.3 5.37148 15.0468L11.2777 8.99995L5.37148 2.9812C5.11836 2.72808 5.11836 2.33433 5.37148 2.0812C5.62461 1.82808 6.01836 1.82808 6.27148 2.0812L12.6277 8.54995C12.8809 8.80308 12.8809 9.19683 12.6277 9.44995L6.27148 15.9187C6.15898 16.0312 5.99023 16.1156 5.82148 16.1156Z"
                  fill=""
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TableCustom;
