import React from 'react';

const Question = ({ question }) => {
  

  return (
    <div className='bg-green-300 w-full h-auto rounded-md p-4'>
      <p className="font-bold">{question?.title}</p>
      <ul className="mt-2">
        {question?.options?.map((opt, idx) => (
          <li key={idx}>{opt}</li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
