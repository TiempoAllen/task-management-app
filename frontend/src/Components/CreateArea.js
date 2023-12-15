import React from "react";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import "../App.css";

const CreateArea = ({
  openAddTask,
  handleClickOpen,
  handleClose,
  handleInputChange,
  newTask,
  handleAddTask,
}) => {
  return (
    <>
      <React.Fragment>
        <Fab
          aria-label="add"
          className="position-absolute bottom-0 end-0"
          sx={{
            height: "70px",
            width: "70px",
            margin: "20px 20px",
            backgroundColor: "#212529",
            "&:hover": {
              backgroundColor: "#2c3033",
            },
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
    </>
  );
};

export default CreateArea;
