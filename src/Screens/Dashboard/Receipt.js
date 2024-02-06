import React from 'react';

const Receipt = () => {
  // Mock data for the purchased course
  const purchasedCourse = {
    name: 'Cleaning Course',
    price: '$29.99',
    purchaseDate: new Date().toLocaleDateString(),
    // Add more details as needed
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-2xl text-main font-semibold mb-4">Purchase Receipt</h1>
      <div className="bg-white p-6 shadow-md rounded-md">
        <div className="mb-4">
          <h2 className="text-lg font-bold">{purchasedCourse.name}</h2>
          <p className="text-gray-600">Course Purchase</p>
        </div>
        <div className="mb-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Price:</span>
            <span className="font-bold">{purchasedCourse.price}</span>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Purchase Date:</span>
            <span>{purchasedCourse.purchaseDate}</span>
          </div>
        </div>
        {/* Add more details as needed */}
        <hr className="my-4" />
        <p className="text-gray-600">
          Thank you for your purchase. You now have access to the course content.
        </p>
      </div>
    </div>
  );
};

export default Receipt;
