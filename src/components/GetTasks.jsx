import React from "react";
import { ImBin2 } from "react-icons/im";

const GetTasks = ({ tasks, deleteTask, updateTaskStatus, newTaskIndex }) => {
  const handleCheckboxChange = (index) => {
    const isChecked = !tasks[index].isChecked;
    updateTaskStatus(index, isChecked);
  };

  return (
    <div
      className="items-otr"
      style={{ marginTop: tasks.length <= 0 && "0px" }}
    >
      {tasks.length > 0 ? (
        <>
          {tasks?.map((task, index) => (
            <div
              key={index}
              className={`items-inr ${
                newTaskIndex === index ? "new-task-animation" : ""
              } ${task.isDeleting ? "deleting" : ""}`}
            >
              <div className="task-completion">
                <div className="checkbox-wrapper-15">
                  <input
                    className="inp-cbx"
                    id={`cbx-${index}`}
                    type="checkbox"
                    style={{ display: "none" }}
                    checked={task.isChecked || false}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <label className="cbx" htmlFor={`cbx-${index}`}>
                    <span>
                      <svg width="12px" height="9px" viewBox="0 0 12 9">
                        <polyline points="1 5 4 8 11 1"></polyline>
                      </svg>
                    </span>
                    <span>{task.name}</span>
                  </label>
                </div>
              </div>
              <div className="task-actions">
                <ImBin2
                  className="cursor-pointer delete-icon"
                  onClick={() => deleteTask(index)}
                />
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="no-data">
          <p>No task found!</p>
        </div>
      )}
    </div>
  );
};

export default GetTasks;
