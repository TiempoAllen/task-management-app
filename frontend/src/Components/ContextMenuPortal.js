import React, { useState } from "react";
import * as ContextMenu from "@radix-ui/react-context-menu";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import AlertDialogPortal from "./AlertDialogPortal";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const ContextMenuPortal = ({ handleDeleteTask, task, handleEditTask }) => {
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description,
    due_date: task.due_date,
    status: task.status,
  });

  const handleEditDialogOpen = () => {
    setIsEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setIsEditDialogOpen(false);
  };

  const handleOpenDialog = () => {
    setIsAlertDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsAlertDialogOpen(false);
  };
  return (
    <>
      <ContextMenu.Portal>
        <ContextMenu.Content
          className="ContextMenuContent"
          sideOffset={5}
          align="end"
        >
          <ContextMenu.Item
            className="ContextMenuItem"
            id="ContextMenuItem-edit"
            onClick={handleEditDialogOpen}
          >
            Edit{" "}
            <div className="Edit">
              <EditIcon />
            </div>
          </ContextMenu.Item>
          <ContextMenu.Separator className="ContextMenuSeparator" />
          <ContextMenu.Item
            className="ContextMenuItem"
            id="ContextMenuItem-delete"
            onClick={handleOpenDialog}
          >
            Delete{" "}
            <div className="Delete">
              <DeleteIcon />
            </div>
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>

      <AlertDialog.Root open={isEditDialogOpen} onClose={handleEditDialogClose}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="AlertDialogOverlay" />
          <AlertDialog.Content
            className="AlertDialogContent"
            style={{ padding: "10px 0" }}
          >
            <AlertDialog.Title
              className="AlertDialogTitle"
              style={{ padding: "0 24px", fontSize: "20px", margin: "10px 0" }}
            >
              Edit Task
            </AlertDialog.Title>
            <div style={{ padding: "0 24px" }}>
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
                  value={editedTask.title}
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      title: e.target.value,
                    })
                  }
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
                  value={editedTask.description}
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      description: e.target.value,
                    })
                  }
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
                      value={
                        editedTask.due_date ? dayjs(editedTask.due_date) : null
                      }
                      name="due_date"
                      onChange={(date) =>
                        setEditedTask({
                          ...editedTask,
                          due_date: date.isValid() ? date.toISOString() : null,
                        })
                      }
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: 25,
                justifyContent: "flex-end",
                paddingRight: "24px",
              }}
            >
              <AlertDialog.Cancel asChild>
                <button
                  className="Button mauve"
                  onClick={handleEditDialogClose}
                  style={{ backgroundColor: "#212529", color: "white" }}
                >
                  Cancel
                </button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <button
                  className="Button red"
                  style={{ backgroundColor: "green", color: "white" }}
                  onClick={() => {
                    handleEditTask(task.task_id, editedTask);
                    handleEditDialogClose();
                  }}
                >
                  Save
                </button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>

      <AlertDialog.Root
        open={isAlertDialogOpen}
        onClose={() => setIsAlertDialogOpen(false)}
      >
        <AlertDialogPortal
          handleDeleteTask={handleDeleteTask}
          handleCloseDialog={handleCloseDialog}
          task={task}
        />
      </AlertDialog.Root>
    </>
  );
};

export default ContextMenuPortal;
