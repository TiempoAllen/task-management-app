import React from "react";
import Tasks from "./Components/Tasks";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

const Pending = ({ tasks, handleDeleteTask, setTasks }) => {
  return (
    <>
      <div className="header d-flex flex-row align-items-center">
        <PendingActionsIcon
          sx={{ height: "45px", width: "auto", margin: "0 5px 5px 0" }}
        />
        <h2>Pending Tasks</h2>
      </div>
      <Tasks
        tasks={tasks}
        handleDeleteTask={handleDeleteTask}
        setTasks={setTasks}
        status="pending"
      />
    </>
  );
};

export default Pending;
