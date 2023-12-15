import React, { useEffect, useState } from "react";
import "./App.css";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Zoom from "@mui/material/Zoom";
import Sidebar from "./Sidebar";
import HomeIcon from "@mui/icons-material/Home";
import Checkbox from "@mui/material/Checkbox";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import axios from "axios";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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
    const formattedDueDate = newTask.due_date
      ? dayjs(newTask.due_date).format("ddd, MMM D, YYYY")
      : null;

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
        setTasks([...tasks, data.task]);
      })
      .catch((error) => console.error("Error creating task:", error));

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
        <ul>
          {tasks.map((task) => (
            <li
              className="tasks d-flex flex-row align-items-start"
              key={task.task_id}
            >
              <Checkbox
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
              <div className="bottom my-1">
                <p className="fs-5">
                  <span className="fw-bold">{task.title} :</span>{" "}
                  {task.description}
                </p>
                <div className="d-flex flex-row align-items-center">
                  <CalendarTodayIcon
                    className="me-2"
                    sx={{ height: "16px", width: "auto" }}
                  />
                  <p>{task.due_date}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <React.Fragment>
          <Fab
            aria-label="add"
            className="position-absolute bottom-0 end-0"
            sx={{
              height: "70px",
              width: "70px",
              margin: "20px 20px",
              backgroundColor: "#212529",
            }}
            onClick={handleClickOpen}
          >
            <AddIcon sx={{ color: "#ffffff", height: "40px", width: "40px" }} />
          </Fab>
          <Dialog open={openAddTask} onClose={handleClose}>
            <DialogTitle id="alert-dialog-title" className="fw-bold">
              Add Task
            </DialogTitle>
            <DialogContent sx={{ padding: "0 24px" }}>
              <div
                className="d-flex flex-column align-items-start justify-content-start"
                style={{ marginBottom: "15px" }}
              >
                <label className="Label" htmlFor="event-title">
                  Title
                </label>
                <TextField
                  className="dialog-input"
                  name="title"
                  id="event-title"
                  value={newTask.title}
                  onChange={handleInputChange}
                  size="small"
                  // autoComplete="off"
                  required
                />
              </div>
              <div
                className="d-flex flex-column align-items-start justify-content-start"
                style={{ marginBottom: "15px" }}
              >
                <label className="Label" htmlFor="description">
                  Description
                </label>
                <TextField
                  className="dialog-input"
                  name="description"
                  id="outlined-multiline-static"
                  value={newTask.description}
                  onChange={handleInputChange}
                  multiline
                  rows={3}
                  // autoComplete="off"
                  required
                />
              </div>

              <div
                className="d-flex flex-column align-items-start justify-content-start"
                style={{ marginBottom: "15px" }}
              >
                <label className="Label" htmlFor="date">
                  Date
                </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={["DatePicker"]}
                    sx={{ width: "100%", margin: "0" }}
                  >
                    <DatePicker
                      value={newTask.due_date}
                      name="due_date"
                      onChange={(date) =>
                        handleInputChange({
                          target: { name: "due_date", value: date },
                        })
                      }
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </DialogContent>

            <DialogActions sx={{ padding: "0 24px", margin: "10px 0" }}>
              <button
                className="Button green"
                id="cancel-button"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button className="Button green" onClick={handleAddTask}>
                Save
              </button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      </div>
    </div>
  );
};

export default App;
