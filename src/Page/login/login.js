import React, { useEffect, useState } from "react";
import FormTextField from "../../components/textfield/textfield";
import Container from '@mui/material/Container';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import './login.css';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../slices/snackbarSlice";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [credentials, setCredentials] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("/credentials.json")
      .then((response) => response.json())
      .then((data) => setCredentials(data))
      .catch((error) => console.error("Error loading credentials:", error));
  })

  const handleLogin = () => {
    const isValidUser = credentials.some(
      (user) => user.email === email && user.password === password
    );

    if (isValidUser) {
      navigate("/dashboard");
    } else {
      dispatch(
        showSnackbar({
          message: "Invalid email or password. Please try again.",
          severity: "error",
        })
      )
    }
  };

  return (
    <>
      <Container className="bgContainer" maxWidth="xl">
        <Container className="loginForm" maxWidth="xs">
          <div className="logoDiv">
            <img src="Assets/Logo.svg" alt="Logo" />
          </div>
          <h3>Login</h3>
          <FormTextField
            label="Name"
            value={email}
            margin="normal"
            onChange={(value) => setEmail(value)}
            validateEmail
            startIcon={<AccountCircle />}
          />
          <FormTextField
            label="Password"
            type={"password"}
            value={password}
            margin="normal"
            onChange={(value) => setPassword(value)}
            startIcon={<LockIcon />}
          />
          <FormControlLabel control={<Checkbox defaultChecked />} label="Remember Me" />
          <Button variant="contained" fullWidth className="buttonFullWidth" onClick={handleLogin}>
            Login
          </Button>
        </Container>
      </Container>
    </>
  )
}