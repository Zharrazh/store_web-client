import React from "react";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

type Props = {
  onClose?: () => void;
};
export const DialogTitle: React.FC<Props> = ({ onClose, children }) => {
  return (
    <MuiDialogTitle
      disableTypography
      style={{
        margin: 0,
        padding: "16px 24px",
      }}
    >
      <Typography
        variant="h6"
        style={{ overflow: "hidden", textOverflow: "ellipsis" }}
      >
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          style={{
            position: "absolute",
            right: "8px",
            top: "8px",
            color: "#c7c7c7",
          }}
          onClick={onClose}
          size={"medium"}
        >
          <CloseIcon fontSize={"inherit"} />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};
