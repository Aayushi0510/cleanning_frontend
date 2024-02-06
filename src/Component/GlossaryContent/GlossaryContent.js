// GlossaryContent.js
import React from 'react';

const GlossaryContent = ({ summary }) => {
  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4">Glossary</h2>
      <p>{summary}</p>
    </div>
  );
};

export default GlossaryContent;
