import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";
import dayjs from "dayjs";
import Tasks from "./Components/Tasks";
import CreateArea from "./Components/CreateArea";

const App = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    due_date: null,
    user_id: 1,
  });
  const [checked, setChecked] = React.useState(true);
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

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const expand = () => {
    setExpanded(true);
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

  return (
    <div className="app d-flex flex-row">
      <div>
        <Sidebar />
      </div>
      <div className="home text-white">
        <div className="header d-flex flex-row align-items-center">
          <HomeIcon
            sx={{ height: "45px", width: "auto", margin: "0 5px 5px 0" }}
          />
          <h1>Tasks</h1>
        </div>
        <Tasks
          tasks={tasks}
          handleDeleteTask={handleDeleteTask}
          setTasks={setTasks}
        />
        <CreateArea
          openAddTask={openAddTask}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          handleInputChange={handleInputChange}
          newTask={newTask}
          handleAddTask={handleAddTask}
        />
      </div>
    </div>
  );
};

export default App;
