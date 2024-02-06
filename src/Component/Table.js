


  
  import React from "react";
  import { twMerge } from "tailwind-merge";

  function Table({
    columns,
    rows,
    selectedRows = [],
    onRowSelect,
    isCheckbox = false,
    extraClasses = "",
    onRowClick,
    rowExtraClasses,
    isLoading = false,
    idKey = "_id",
    noDataMessage = "No Data Found",
    disableRowClick = false,
  }) {
    return (
      <div className={twMerge(`min-w-fit relative flex flex-col  ${extraClasses}`)}>
        {/* Columns */}
        <div className="flex items-center py-2 px-2 border-b sticky top-0 border-slate-300 bg-slate-50 z-10 ">
          {/* Checkbox */}
          {rows.length && rows.length  &&  isCheckbox ? (
            <div className={`w-[20px]`}>
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 "
                checked={selectedRows.length === rows.length}
                onChange={(e) => {
                  e.stopPropagation();
                  selectedRows.length === rows.length
                    ? onRowSelect && onRowSelect([])
                    : onRowSelect && onRowSelect(rows);
                }}
              />
            </div>
          ) : null}

          {columns.map((column, index) => {
            return (
              !column.hidden && (
                <div
                  key={column.field}
                  className={`${
                    column.flex
                  } text-sm text-primary-dark font-semibold px-2 flex justify-${
                    column.align || "start"
                  }  ${column.extraClasses}`}
                >
                  {column.headerName}
                </div>
              )
            );
          })}
        </div>

        {isLoading ? (
          Array(10)
            .fill(0)
            .map((_, index) => {
              return (
                <div key={index} className="animate-pulse  h-[50px] p-2">
                  <div className="bg-slate-200 h-full rounded"> </div>
                </div>
              );
            })
        ) : rows.length ? (
          rows.map((row, rowIndex) => (
            <div
              onClick={() => !disableRowClick && onRowClick?.(row)}
              key={row[idKey] || rowIndex}
              className={`flex items-center px-2 hover-bg-slate-100  ${
                rowIndex % 2 === 0 ? "bg-white" : "bg-stone-50"
              }  ${!disableRowClick && onRowClick && "cursor-pointer"} ${
                rowExtraClasses && rowExtraClasses(row)
              } ${rowIndex !== rows.length - 1 && "border-b"}`}
            >
              {/* Checkbox */}
              {isCheckbox ? (
                <div className={`w-[20px]`}>
                  <input
                    type="checkbox"
                    checked={
                      selectedRows.findIndex((ele) => ele._id === row._id) !== -1
                    }
                    onChange={(e) => {
                      e.stopPropagation();
                      onRowSelect &&
                        onRowSelect((selectedRows) =>
                          selectedRows.findIndex((ele) => ele._id === row._id) === -1
                            ? [...selectedRows, row]
                            : selectedRows.filter((selectedRow) => selectedRow._id !== row._id)
                        );
                    }}
                    className=" w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300"
                  />
                </div>
              ) : null}

              {columns.map((column, index) => {
                return (
                  !column.hidden && (
                    <div
                      key={column.field}
                      className={`${
                        column.flex
                      } text-sm overflow-hidden text-ellipsis text-slate-600 px-2 flex justify-${
                        column.align || "start"
                      } ${column.extraClasses}`}
                    >
                      {column.renderCell
                        ? column.renderCell(row)
                        : row[column.field]}
                    </div>
                  )
                );
              })}
            </div>
          ))
        ) : (
          <div className="w-full flex justify-center py-5 text-slate-500">
            {noDataMessage}
          </div>
        )}
      </div>
    );
  }

  export default Table;
