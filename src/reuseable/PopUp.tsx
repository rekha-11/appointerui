import React from "react";

import PrimaryButton from "./button/PrimaryButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography,
} from "@mui/material";

export default function Popup(props: any) {
  const { title, children, openPopup, setOpenPopup, maxWidth = "sm" } = props;

  return (
    <Dialog
      open={openPopup}
      maxWidth={maxWidth}
      disableAutoFocus={true}
      disableEnforceFocus={true}
    >
      <DialogTitle>
        <div style={{ display: "flex" }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Button color="primary" onClick={() => setOpenPopup(false)} />
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
