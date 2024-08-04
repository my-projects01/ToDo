import React, { useState, useEffect, useContext } from "react";
import Modal from "../components/Model";
import { createTask, getTasks, updateTask, deleteTask } from "../api/Api";
import UserContext from '../context/UserContext';

const TodoList = () => {
  const { user } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [updatedDueDate, setUpdatedDueDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newStatus, setNewStatus] = useState("Pending");
  const [newDueDate, setNewDueDate] = useState("");
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  const [limit] = useState(10); // Number of tasks per page
  const [skip, setSkip] = useState(0); // Number of tasks to skip (for pagination)
  const [totalTasks, setTotalTasks] = useState(0); // Total number of tasks
  const [page, setPage] = useState(1); // Current page

  useEffect(() => {
    const fetchTasks = async () => {
      if (user) {
        const data = await getTasks(limit, skip);
        setTasks(data); 
        setTotalTasks(data); 
      }
    };
    fetchTasks();
  }, [user, skip]);

  const handleUpdateClick = (task) => {
    console.log(task)
    setSelectedTask(task);
    setUpdatedTitle(task.title);
    setUpdatedDescription(task.description);
    setUpdatedStatus(task?.status);
    setUpdatedDueDate(task.dueDate);
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!user) {
      alert("You need to be logged in to update a task.");
      return;
    }
    
    try {
      console.log("Updating task:", {
        title: updatedTitle,
        description: updatedDescription,
        status: updatedStatus,
        dueDate: updatedDueDate,
      });
      
      const updatedTask = await updateTask(selectedTask._id, {
        title: updatedTitle,
        description: updatedDescription,
        status: updatedStatus,
        dueDate: updatedDueDate,
      });
      
      console.log("Updated task:", updatedTask);
      
      setTasks(
        tasks?.map((task) =>
          task._id === selectedTask._id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleCreate = async () => {
    if (!user ) {
      alert("You need to be logged in to create a task.");
      return;
    }
    const newTask = await createTask({
      title: newTitle,
      description: newDescription,
      status: newStatus,
      dueDate: newDueDate,
    }, user.token);
    setTasks([...tasks, newTask]);
    setIsCreateModalOpen(false);
    setNewTitle("");
    setNewDescription("");
    setNewStatus("Pending");
    setNewDueDate("");
  };

  const handleDelete = async (_id) => {
    if (!user) {
      alert("You need to be logged in to delete a task.");
      return;
    }
    console.log(_id)
    await deleteTask(_id).then(() => {
      console.log("Task deleted");
    });
    setTasks(tasks.filter((task) => task._id !== _id));
  };

  const toggleTaskDetails = (taskId) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setSkip((newPage - 1) * limit);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Todo List</h1>
      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 mb-6"
      >
        Create Task
      </button>

      {/* Responsive Task List */}
      <div className="hidden md:block">
        {/* Table View for larger screens */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Due Date</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks?.map((task) => (
                <tr key={task._id} className="border-b">
                  <td className="px-4 py-2">{task?.title}</td>
                  <td className="px-4 py-2">{task?.description}</td>
                  <td
                    className={`px-4 py-2 ${
                      task.status === "Done"
                        ? "text-green-500"
                        : task.status === "Pending"
                        ? "text-blue-500"
                        : task.status === "Over Due"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {task?.status}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(task?.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 mr-2"
                      onClick={() => handleUpdateClick(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
                      onClick={() => handleDelete(task._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="md:hidden">
        {/* Card View for smaller screens */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {tasks?.map((task) => (
            <div
              key={task._id}
              className="bg-white shadow-lg rounded-lg p-4 border border-gray-200"
            >
              <h3
                className="text-xl font-semibold mb-2 cursor-pointer"
                onClick={() => toggleTaskDetails(task._id)}
              >
                {task?.title}
              </h3>
              <td
                className={`px-4 py-2 ${
                  task.status === "Done"
                    ? "text-green-500"
                    : task.status === "Pending"
                    ? "text-blue-500"
                    : task.status === "Over Due"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              >
                {task.status}
              </td>

              {/* Conditionally render description and buttons */}
              {expandedTaskId === task._id && (
                <>
                  <p className="text-gray-700 mb-2">{task.description}</p>
                  <p className="text-sm mb-4">
                    Due Date: {new Date(task?.dueDate).toLocaleDateString()}
                  </p>
                  <button
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 mr-2"
                    onClick={() => handleUpdateClick(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
        >
          Previous
        </button>
        <span className="py-2 px-4">Page {page} </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={limit > totalTasks}
          className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
        >
          Next
        </button>
      </div>

      {/* Update Task Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleUpdate}
          title="Update Task"
        >
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Status</label>
            <select
              value={updatedStatus}
              onChange={(e) => setUpdatedStatus(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
              <option value="Over Due">Over Due</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Due Date</label>
            <input
              type="date"
              value={updatedDueDate}
              onChange={(e) => setUpdatedDueDate(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
        </Modal>
      )}

      {/* Create Task Modal */}
      {isCreateModalOpen && (
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreate}
          title="Create Task"
        >
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Status</label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
              <option value="Over Due">Over Due</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Due Date</label>
            <input
              type="date"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TodoList;

