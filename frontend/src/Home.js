import React from "react";
import Tasks from "./Components/Tasks";
import CreateArea from "./Components/CreateArea";
import HomeIcon from "@mui/icons-material/Home";

const Home = ({
  tasks,
  handleDeleteTask,
  setTasks,
  openAddTask,
  handleClickOpen,
  handleClose,
  handleInputChange,
  newTask,
  handleAddTask,
  handleEditTask,
}) => {
  return (
    <>
      <div className="header d-flex flex-row align-items-center">
        <HomeIcon
          sx={{ height: "45px", width: "auto", margin: "0 5px 5px 0" }}
        />
        <h2>Tasks</h2>
      </div>
      <Tasks
        tasks={tasks}
        handleDeleteTask={handleDeleteTask}
        setTasks={setTasks}
        handleEditTask={handleEditTask}
        status="pending"
      />
      <CreateArea
        openAddTask={openAddTask}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        handleInputChange={handleInputChange}
        newTask={newTask}
        handleAddTask={handleAddTask}
      />
    </>
  );
};

export default Home;
