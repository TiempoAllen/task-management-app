import React, { useEffect, useState } from "react";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import HomeIcon from "@mui/icons-material/Home";
import TaskIcon from "@mui/icons-material/Task";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Pending from "./Pending";
import Completed from "./Completed";
import axios from "axios";
import dayjs from "dayjs";

const Sidebar = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    due_date: null,
    user_id: 1,
  });
  const [openAddTask, setOpenAddTask] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/tasks");
        console.log(response.data);
        const tasksArray = response.data.tasks;
        setTasks(tasksArray);
      } catch (error) {
        console.error(error);
      }
    };
    getTasks();
  }, []);

  const handleClickOpen = () => {
    setOpenAddTask(true);
  };

  const handleClose = () => {
    setOpenAddTask(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target || e;

    // If the input is a date picker, handle it differently
    if (name === "due_date") {
      setNewTask((prevTask) => ({
        ...prevTask,
        [name]: value,
      }));
    } else {
      setNewTask((prevTask) => ({
        ...prevTask,
        [name]: value,
      }));
    }
  };

  const handleAddTask = () => {
    // Format the due_date using dayjs
    const formattedDueDate = newTask.due_date
      ? dayjs(newTask.due_date).format()
      : null;

    // Create a new task object with the formatted due_date
    const taskData = {
      ...newTask,
      due_date: formattedDueDate,
    };

    fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create task");
        }
        return response.json();
      })
      .then((data) => {
        // Update the local state with the new task
        setTasks([...tasks, data.task]);
        handleClose();
      })
      .catch((error) => console.error("Error creating task:", error));

    // Clear the new task form
    setNewTask({
      title: "",
      description: "",
      due_date: null,
      user_id: 1, // Set the user_id as needed
    });
  };

  const handleDeleteTask = (taskId) => {
    fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete task");
        }
      })
      .then(() => {
        // Update the local state by removing the deleted task
        setTasks(tasks.filter((task) => task.task_id !== taskId));
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  const handleEditTask = async (taskId, editedTask) => {
    try {
      const formattedDueDate = dayjs(editedTask.due_date).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      // Assuming editedTask contains the updated task details
      const updatedTask = {
        title: editedTask.title,
        description: editedTask.description,
        due_date: formattedDueDate,
        status: editedTask.status, // Make sure this is included
      };

      const response = await axios.put(
        `http://localhost:5000/tasks/${taskId}`,
        updatedTask
      );

      // Handle success response as needed
      console.log(response.data.message);
      window.location.reload();
    } catch (error) {
      // Handle error response
      console.error("Error updating task:", error.response.data.error);
    }
  };
  return (
    <div className="app d-flex flex-row">
      <div
        className="sidebar d-flex flex-column flex-shrink-0 p-3 text-white"
        style={{
          width: "240px",
          borderRadius: "10px 0 0 10px",
          height: "100%",
        }}
      >
        <h1 className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none text-center">
          <span className="fs-4">Task Manager</span>
        </h1>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link text-white" aria-current="page">
              <HomeIcon
                className="sidebar-icon bi me-2"
                sx={{ height: "21px" }}
              />
              Home
            </Link>
          </li>
          <li>
            <Link to="/pending" className="nav-link text-white">
              <PendingActionsIcon
                className="sidebar-icon bi me-2"
                sx={{ height: "21px" }}
              />
              Pending
            </Link>
          </li>
          <li>
            <Link to="/completed" className="nav-link text-white">
              <TaskIcon
                className="sidebar-icon bi me-2"
                sx={{ height: "21px" }}
              />
              Completed
            </Link>
          </li>
        </ul>
        <hr />
      </div>
      <div className="home text-white">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                tasks={tasks}
                handleDeleteTask={handleDeleteTask}
                setTasks={setTasks}
                openAddTask={openAddTask}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                handleInputChange={handleInputChange}
                newTask={newTask}
                handleAddTask={handleAddTask}
                handleEditTask={handleEditTask}
              />
            }
          />
          <Route
            path="/pending"
            element={
              <Pending
                tasks={tasks}
                handleDeleteTask={handleDeleteTask}
                setTasks={setTasks}
                openAddTask={openAddTask}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                handleInputChange={handleInputChange}
                newTask={newTask}
                handleAddTask={handleAddTask}
              />
            }
          />
          <Route
            path="/completed"
            element={
              <Completed
                tasks={tasks}
                handleDeleteTask={handleDeleteTask}
                setTasks={setTasks}
                openAddTask={openAddTask}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                handleInputChange={handleInputChange}
                newTask={newTask}
                handleAddTask={handleAddTask}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Sidebar;
