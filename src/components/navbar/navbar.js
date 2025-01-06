import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import './navbar.css'

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  }
  return (
    <AppBar position="static" className="navbar">
      <Toolbar>
        <Typography variant="h6" component="div" className="centeredContent">
          <img
            src="/Assets/Logo.svg"
            className="logo"
            alt="Logo"
          />
        </Typography>

        <IconButton color="inherit" onClick={handleLogout}>
          <span className="navText">Elon Musk</span>
          <LogoutIcon className="logOut" />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
export default NavBar;