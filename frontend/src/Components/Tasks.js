import React from "react";
import Checkbox from "@mui/material/Checkbox";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as ContextMenu from "@radix-ui/react-context-menu";
import ContextMenuPortal from "./ContextMenuPortal";
import axios from "axios";

const Tasks = ({
  handleDeleteTask,
  tasks,
  setTasks,
  status,
  handleEditTask,
}) => {
  const handleToggleComplete = async (task_id) => {
    try {
      const currentTask = tasks.find((task) => task.task_id === task_id);
      const newStatus =
        currentTask?.status === "completed" ? "pending" : "completed";

      await axios.patch(`http://localhost:5000/tasks/${task_id}/complete`, {
        status: newStatus,
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.task_id === task_id
            ? {
                ...task,
                status: newStatus,
              }
            : task
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ScrollArea.Root className="ScrollAreaRoot">
        <ScrollArea.Viewport className="ScrollAreaViewport">
          <ul>
            {tasks
              .filter((task) => task.status === `${status}`)
              .map((task) => (
                <ContextMenu.Root key={task.task_id}>
                  <ContextMenu.Trigger>
                    <li className="tasks d-flex flex-row align-items-start">
                      <Checkbox
                        inputProps={{ "aria-label": "controlled" }}
                        onChange={() => handleToggleComplete(task.task_id)}
                        checked={task.status === "completed"}
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
                  </ContextMenu.Trigger>
                  <ContextMenuPortal
                    handleDeleteTask={handleDeleteTask}
                    handleEditTask={handleEditTask}
                    task={task}
                  />
                </ContextMenu.Root>
              ))}
          </ul>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="ScrollAreaScrollbar"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="ScrollAreaThumb" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Scrollbar
          className="ScrollAreaScrollbar"
          orientation="horizontal"
        >
          <ScrollArea.Thumb className="ScrollAreaThumb" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner className="ScrollAreaCorner" />
      </ScrollArea.Root>
    </>
  );
};

export default Tasks;
