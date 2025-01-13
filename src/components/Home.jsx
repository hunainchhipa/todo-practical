import React, { useEffect, useState } from "react";
import GetTasks from "./GetTasks";

const Home = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [newTaskIndex, setNewTaskIndex] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("Tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("Tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (newTaskIndex !== null) {
      const timeout = setTimeout(() => setNewTaskIndex(null), 500);
      return () => clearTimeout(timeout);
    }
  }, [newTaskIndex]);

  const handleInputChange = (e) => {
    setTask(e.target.value);
    if (e.target.value.trim() !== "") {
      setError("");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (task.trim() === "") {
      setError("Task cannot be empty!");
      return;
    }

    const newTask = { name: task.trim(), isChecked: false };
    setTasks([...tasks, newTask]);

    setNewTaskIndex(tasks.length);

    setTask("");
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks?.map((task, i) => {
      return i === index ? { ...tasks, isDeleting: true } : task;
    });
    setTasks(updatedTasks);

    setTimeout(() => {
      setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
    }, 300);
  };

  const updateTaskStatus = (index, isChecked) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, isChecked } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="wrapper">
      <div className="card status-card">
        <div className="card-body">
          <div className="task-status-otr">
            <div>
              <h2>Task Status!</h2>
              <h3>Keep it up!</h3>
            </div>
            <div className="task-status">
              <h1>
                {tasks.filter((task) => task.isChecked).length}/{tasks.length}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleFormSubmit}>
            <div className="add-items">
              <input
                type="text"
                name="task"
                className="text-input"
                placeholder="Add your task"
                onChange={handleInputChange}
                autoComplete="off"
                value={task}
              />
              <button type="submit" className="add-button">
                Add
              </button>
            </div>
            {error && <p className="error-message">{error}</p>}
          </form>

          <GetTasks
            tasks={tasks}
            deleteTask={deleteTask}
            updateTaskStatus={updateTaskStatus}
            newTaskIndex={newTaskIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
