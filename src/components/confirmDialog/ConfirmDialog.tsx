import React from "react";
import { Button, Dialog } from "@material-ui/core";
import { DialogTitle } from "../dialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

type Props = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  isDangerous?: boolean;
  confirmContent?: string;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
};
export const ConfirmDialog: React.FC<Props> = ({
  open,
  description,
  title,
  onCancel,
  onConfirm,
  isDangerous,
  confirmContent,
  maxWidth,
}) => {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth={maxWidth}>
      <DialogTitle onClose={onCancel}>{title}</DialogTitle>
      <DialogContent>{description}</DialogContent>
      <DialogActions disableSpacing style={{ justifyContent: "Center" }}>
        <Button
          onClick={onConfirm}
          color={isDangerous ? "inherit" : "primary"}
          style={{ color: isDangerous ? "red" : undefined }}
        >
          {confirmContent ?? "Confirm"}
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};
