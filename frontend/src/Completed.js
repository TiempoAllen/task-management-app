import React from "react";
import Tasks from "./Components/Tasks";
import TaskIcon from "@mui/icons-material/Task";

const Completed = ({ tasks, handleDeleteTask, setTasks }) => {
  return (
    <>
      <div className="header d-flex flex-row align-items-center">
        <TaskIcon
          sx={{ height: "45px", width: "auto", margin: "0 5px 5px 0" }}
        />
        <h2>Completed Tasks</h2>
      </div>
      <Tasks
        tasks={tasks}
        handleDeleteTask={handleDeleteTask}
        setTasks={setTasks}
        status="completed"
      />
    </>
  );
};

export default Completed;
