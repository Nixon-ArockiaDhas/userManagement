import React, { useState } from "react";
import FormTextField from "../../components/textfield/textfield";
import Container from '@mui/material/Container';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import './login.css';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showSnackbar } from "../../slices/snackbarSlice";
import { loginUser } from "../../slices/authSlice";
import { CircularProgress } from "@mui/material";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      dispatch(showSnackbar({ message: 'Email & Password Required', severity: 'warning' }));
      return;
    }
    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      if (result?.token) {
        dispatch(showSnackbar({ message: 'Login Successful', severity: 'success' }));
        navigate('/dashboard');
      } else {
        dispatch(showSnackbar({ message: 'Incorrect Credentials', severity: 'error' }));
      }
    } catch (error) {
      console.log(error)
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
          <Button variant="contained" fullWidth className="buttonFullWidth" disabled={loading} onClick={handleLogin}>
            {loading ? <CircularProgress /> : 'Login'}
          </Button>
        </Container>
      </Container>
    </>
  )
}