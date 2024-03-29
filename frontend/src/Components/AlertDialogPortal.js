import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import "../App.css";

const AlertDialogPortal = ({ handleDeleteTask, handleCloseDialog, task }) => {
  return (
    <>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="AlertDialogOverlay" />
        <AlertDialog.Content className="AlertDialogContent">
          <AlertDialog.Title className="AlertDialogTitle">
            Are you absolutely sure?
          </AlertDialog.Title>
          <AlertDialog.Description className="AlertDialogDescription">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialog.Description>
          <div style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}>
            <AlertDialog.Cancel asChild>
              <button
                className="Button mauve"
                onClick={handleCloseDialog}
                style={{ backgroundColor: "#212529", color: "white" }}
              >
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                className="Button red"
                style={{ backgroundColor: "red", color: "white" }}
                onClick={() => {
                  handleDeleteTask(task.task_id);
                  handleCloseDialog();
                }}
              >
                Yes, delete task
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </>
  );
};

export default AlertDialogPortal;
