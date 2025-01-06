import React from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { hideSnackbar } from "../../slices/snackbarSlice";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})
const SnackbarAlert = () => {
    const { open, message, severity } = useSelector((state) => state.snackbar);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(hideSnackbar());
    }
    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
            <Alert onClose={handleClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default SnackbarAlert;