// Import necessary libraries and components.
import React, { useState } from "react"; // Import React and useState hook for managing component state.
import { CheckSquare, Square, Plus, Trash2 } from "lucide-react"; // Import icons for task completion, addition, and deletion.
import { Task, Widget } from "../../types"; // Import type definitions for Task and Widget.
import { useDashboardStore } from "../../store"; // Import the custom hook to access the dashboard store.
import { format } from "date-fns"; // Import date-fns for formatting dates.

// Define the props interface for the TaskWidget component.
interface Props {
  widget: Widget; // Expect a widget prop of type Widget.
}

// Define the TaskWidget functional component.
export const TaskWidget: React.FC<Props> = () => {
  // State to hold the new task input value.
  const [newTask, setNewTask] = useState(""); // Initialize newTask state as an empty string.

  // Destructure tasks and action functions from the dashboard store.
  const { tasks, addTask, updateTask, removeTask } = useDashboardStore();

  // Function to handle adding a new task.
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior.
    if (!newTask.trim()) return; // If the input is empty or only whitespace, do nothing.

    // Create a new task object.
    const task: Task = {
      id: `task-${Date.now()}`, // Generate a unique ID based on the current timestamp.
      title: newTask.trim(), // Set the title to the trimmed input value.
      completed: false, // Set the initial completion status to false.
      createdAt: new Date().toISOString(), // Set the creation date to the current date in ISO format.
    };

    addTask(task); // Call the addTask function to add the new task to the store.
    setNewTask(""); // Clear the input field after adding the task.
  };

  // Function to toggle the completion status of a task.
  const toggleTask = (task: Task) => {
    updateTask({ ...task, completed: !task.completed }); // Update the task with the opposite completion status.
  };

  // Render the TaskWidget component.
  return (
    <div className="p-6">
      {" "}
      {/* Main container for the task widget. */}
      <div className="flex items-center justify-between mb-6">
        {" "}
        {/* Flex container for the title and completed tasks count. */}
        <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 text-transparent bg-clip-text">
          {" "}
          {/* Title of the widget with gradient text. */}
          Tasks
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {" "}
          {/* Display the count of completed tasks. */}
          {tasks.filter((t) => t.completed).length}/{tasks.length} completed
        </span>
      </div>
      {/* Form to add a new task. */}
      <form onSubmit={handleAddTask} className="mb-4">
        {" "}
        {/* Handle form submission with handleAddTask. */}
        <div className="flex gap-2">
          {" "}
          {/* Flex container for input and button. */}
          <input
            type="text" // Input type for text.
            value={newTask} // Bind the input value to newTask state.
            onChange={(e) => setNewTask(e.target.value)} // Update newTask state on input change.
            placeholder="Add a new task..." // Placeholder text for the input.
            className="flex-1 px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400" // Styling for the input.
          />
          <button
            type="submit" // Button type for submitting the form.
            className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors" // Styling for the submit button.
          >
            <Plus className="w-5 h-5" /> {/* Icon for adding a task. */}
          </button>
        </div>
      </form>
      {/* Container for the list of tasks with scrollable overflow. */}
      <div className="space-y-2 max-h-[300px] overflow-y-auto scrollbar-hide">
        {" "}
        {/* Set max height and hide scrollbar. */}
        {tasks.map(
          (
            task // Map through the tasks array to render each task.
          ) => (
            <div
              key={task.id} // Unique key for each task based on its ID.
              className="flex items-center justify-between p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 group" // Styling for each task item.
            >
              <div className="flex items-center gap-3">
                {" "}
                {/* Flex container for task completion button and title. */}
                <button
                  onClick={() => toggleTask(task)} // Toggle task completion on button click.
                  className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400" // Styling for the toggle button.
                >
                  {task.completed ? ( // Conditional rendering based on task completion status.
                    <CheckSquare className="w-5 h-5" /> // Icon for completed task.
                  ) : (
                    <Square className="w-5 h-5" /> // Icon for incomplete task.
                  )}
                </button>
                <span
                  className={`${
                    task.completed
                      ? "text-gray-400 line-through" // Style for completed task title.
                      : "text-gray-900 dark:text-white" // Style for incomplete task title.
                  }`}>
                  {task.title}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {" "}
                {/* Flex container for task creation date and delete button. */}
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {" "}
                  {/* Display the task creation date. */}
                  {format(new Date(task.createdAt), "MMM d")} 
                </span>
                <button
                  onClick={() => removeTask(task.id)} // Remove task on button click.
                  className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-600 transition-opacity" // Styling for the delete button with hover effect.
                >
                  <Trash2 className="w-4 h-4" />{" "}
                  {/* Icon for deleting a task. */}
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
