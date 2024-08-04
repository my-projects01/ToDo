import React from 'react';

const TaskCard = ({ task }) => (
  <div className="bg-white shadow-md rounded-lg p-4 mb-4">
    <h3 className="text-xl font-semibold mb-2">{task?.title}</h3>
    <p className="text-gray-700 mb-2">{task?.description}</p>
    {task?.dueDate && (
        <p className={`text-sm ${(new Date(task.dueDate)>new Date())?'text-gray-500': 'text-red-500' }`}>
        Due Date: {new Date(task?.dueDate).toLocaleDateString()}
      </p>
    )}
    <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${task?.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
      {task?.status}
    </span>
  </div>
);

export default TaskCard;