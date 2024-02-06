import React, { useState } from 'react';

const FAQAccordion = ({ faqData }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full ">
      {faqData.map((faq, index) => (
        <div key={index} className="border-b border-gray-300">
          <div
            onClick={() => toggleAccordion(index)}
            className="flex justify-between items-center cursor-pointer p-4 hover:bg-gray-100"
          >
            <p className="font-semibold">{faq.question}</p>
            <svg
              className={`w-4 h-4 transition-transform transform ${
                activeIndex === index ? 'rotate-180' : ''
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6.293 5.293a1 1 0 0 1 1.414 0L10 8.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
              />
            </svg>
          </div>
          {activeIndex === index && (
            <div className="p-4 bg-gray-100">
              <p>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
