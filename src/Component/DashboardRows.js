import React from 'react';

const DashboardRows = ({ items }) => {
    const renderContent = (item) => {
        if (item.type === 'button') {
          return (
            <button onClick={item.action} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded">
              {item.content}
            </button>
          );
        } else {
          return <div>{item.content}</div>;
        }
      };
  return (
    <div className="bg-white py-4 w-full">
      <div className="flex flex-col  w-full">
        {/* Mapping through rows */}
        {items.map((row, rowIndex) => (
          <div key={rowIndex} className={rowIndex===1 ? `bg-gray-200 flex justify-between  p-4 rounded shadow-md `: `flex justify-between bg-white p-4 rounded shadow-md`}>
            {/* Mapping through items in each row */}
            {row.map((item, itemIndex) => (
              <div key={itemIndex}>{renderContent(item)}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardRows;
// "flex justify-between bg-white p-4 rounded shadow-md"