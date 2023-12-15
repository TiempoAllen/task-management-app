import React, { useState } from "react";
import * as ContextMenu from "@radix-ui/react-context-menu";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import AlertDialogPortal from "./AlertDialogPortal";

const ContextMenuPortal = ({ handleDeleteTask, task }) => {
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

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
