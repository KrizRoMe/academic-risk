interface Props {
  columns: {
    header: string;
    field: string;
    span: number;
  }[];
  data: {
    [key: string]: any;
  }[];
}

const TableCustom = ({ columns, data }: Props) => {
  return (
    <div className="max-w-full overflow-x-auto">
      <div className="min-w-[1170px]">
        <div className="grid grid-cols-12 rounded-t-[10px] bg-primary px-5 py-4 lg:px-7.5 2xl:px-11">
          {columns.map((column, index) => (
            <div key={index} className={`col-span-${column.span}`}>
              <h5 className="font-medium text-white">{column.header}</h5>
            </div>
          ))}
        </div>
        <div className="rounded-b-[10px] bg-white dark:bg-boxdark">
          {data.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-12 border-t border-[#EEEEEE] px-5 py-4 dark:border-strokedark lg:px-7.5 2xl:px-11"
            >
              {columns.map((col, colIndex) => (
                <div key={colIndex} className={`col-span-${col.span}`}>
                  <p className="text-[#637381] dark:text-bodydark">
                    {row[col.field]}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableCustom;
