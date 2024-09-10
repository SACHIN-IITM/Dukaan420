import React from 'react';

const FeedbackCard = ({ feedbacks, onReply }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-black mb-4">Customer Feedback</h2>
      {feedbacks.map((feedback) => (
        <div key={feedback.id} className="mb-4 p-4 bg-white rounded-lg shadow-sm">
          <p className="text-gray-700">{feedback.message}</p>
          <button onClick={() => onReply(feedback.id)} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg">Reply</button>
        </div>
      ))}
    </div>
  );
};

export default FeedbackCard;
