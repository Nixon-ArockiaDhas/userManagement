import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../slices/userSlice";
import Container from '@mui/material/Container'
import { Button } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import CardView from "../../components/card/cardView";
import TableView from "../../components/table/tableView";
import './dashboard.css'
import NavBar from "../../components/navbar/navbar";
import FormTextField from "../../components/textfield/textfield";
import SearchIcon from '@mui/icons-material/Search';
import UserModal from "../../components/modal/userModal";
import axios from 'axios';
import { showSnackbar } from "../../slices/snackbarSlice";
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';


export default function Dashboard() {
    const dispatch = useDispatch();
    const { users, loading, error, setUsers } = useSelector((state) => state.users);
    const [localUsers, setLocalUsers] = useState([]);
    const [cardView, setCardView] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        if (users) {
            setLocalUsers(users);
        }
    }, [users]);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    const filteredUser = localUsers.filter(
        (user) =>
            user.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
            user.last_name.toLowerCase().includes(searchText.toLowerCase()) ||
            user.email.toLowerCase().includes(searchText.toLowerCase())
    );
    const handleOpenModal = (user) => {
        setIsEditMode(!!user);
        setSelectedUser(user);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedUser(null);
        setIsEditMode(false);
    };
    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            await axios.delete(`https://reqres.in/api/users/${userId}`);
            setLocalUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
            dispatch(
                showSnackbar({
                    message: "User Deleted Succesfully",
                    severity: "error"
                })
            )
        }
    };

    const handleUserUpdate = (updatedUser) => {
        setLocalUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === updatedUser.id ? { ...user, ...updatedUser } : user
            )
        );
    };

    return (
        <>
            <NavBar />
            <Container className="dashboardbg" maxWidth="xl">
                <Container className="table">
                    <div className="headingDiv">
                        <h1>Users</h1>
                        <div className="filter">
                            <FormTextField style={{ Margin: '0' }}
                                endIcon={<SearchIcon />}
                                value={searchText}
                                onChnage={(e) => { setSearchText(e.target.value) }}
                                label="Search"
                            />
                            <Button variant="contained" size="small" fullWidth onClick={() => handleOpenModal(null)}>
                                Create User
                            </Button>
                        </div>
                    </div>
                    <div className="toggleButtons">
                        <div onClick={() => setCardView(false)} className={`toggleIconContainer ${!cardView ? 'selected' : ''} listIcon`} >
                            <ViewListIcon className="toggleIcon" />
                            <span>Table</span>
                        </div>
                        <div onClick={() => setCardView(true)} className={`toggleIconContainer ${cardView ? 'selected' : ''} cardIcon`} >
                            <ViewModuleIcon className="toggleIcon" />
                            <span>Card</span>
                        </div>
                    </div>
                    {loading &&
                        <div className="indicator">
                            <CircularProgress />
                        </div>}
                    {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                    {!loading && !error && (
                        <>
                            {cardView ? (
                                <CardView
                                    users={filteredUser}
                                    onEdit={handleOpenModal}
                                    onDelete={handleDeleteUser}
                                />
                            ) : (
                                <TableView
                                    users={filteredUser}
                                    onEdit={handleOpenModal}
                                    onDelete={handleDeleteUser}
                                />
                            )}
                            <UserModal
                                open={openModal}
                                handleClose={handleCloseModal}
                                userToEdit={selectedUser}
                                isEditMode={isEditMode}
                                onUserUpdate={handleUserUpdate}
                                onUserCreate={(newUser) => setLocalUsers((prevUsers) => [newUser, ...prevUsers])}
                            />
                        </>
                    )}
                </Container>
            </Container>
        </>
    )
}