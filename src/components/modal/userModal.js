import React, { useState, useEffect } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import FormTextField from "../textfield/textfield";
import './userModal.css'
import { showSnackbar } from "../../slices/snackbarSlice";
import { createUser, updateUser } from "../../slices/userSlice";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
}

const UserModal = ({ open, handleClose, userToEdit, isEditMode }) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [formValid, setFormValid] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        if (isEditMode && userToEdit) {
            setFirstName(userToEdit.first_name || '');
            setLastName(userToEdit.last_name || '');
            setEmail(userToEdit.email || '');
            setAvatarUrl(userToEdit.avatar || '');
        } else {
            setFirstName('');
            setLastName('');
            setEmail('');
            setAvatarUrl('');
        }
    }, [open, isEditMode, userToEdit]);

    useEffect(() => {
        const isValid =
            firstName.trim() !== '' &&
            lastName.trim() !== '' &&
            /^\S+@\S+\.\S+$/.test(email) &&
            /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(avatarUrl);
        setFormValid(isValid);
    }, [firstName, lastName, email, avatarUrl]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { first_name: firstName, last_name: lastName, email, avatar: avatarUrl };
        try {
            const action = isEditMode ? updateUser({ id: userToEdit.id, user }) : createUser(user);
            const response = await dispatch(action).unwrap();

            dispatch(
                showSnackbar({
                    message: response?.id
                        ? `${isEditMode ? 'User Updated' : 'User Created'} Successfully`
                        : 'An error occurred. Please try again.',
                    severity: response?.id ? 'success' : 'error',
                })
            );
            if (response?.id) handleClose();
        } catch (error) {
            console.error('Error during user creation/update:', error);
            dispatch(showSnackbar({ message: 'An error occurred. Please try again.', severity: 'error' }));
        }
    };



    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Typography className="subHeading" variant="h6">{isEditMode ? 'Edit User' : 'Create New User'}</Typography>
                <form onSubmit={handleSubmit}>
                    <FormTextField
                        label="First Name"
                        value={firstName}
                        onChange={(value) => setFirstName(value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <FormTextField
                        label="Last Name"
                        value={lastName}
                        onChange={(value) => setLastName(value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <FormTextField
                        label="Email"
                        value={email}
                        onChange={(value) => setEmail(value)}
                        fullWidth
                        margin="normal"
                        required
                        validateEmail
                    />
                    <FormTextField
                        label="Avatar"
                        value={avatarUrl}
                        onChange={(value) => setAvatarUrl(value)}
                        fullWidth
                        margin="normal"
                        required
                        validateUrl
                    />
                    <Button type="submit" variant="contained" className="updateButton" color="primary" fullWidth disabled={!formValid} >
                        {isEditMode ? 'Update' : 'Create'}
                    </Button>
                </form>
            </Box>
        </Modal>
    )
}
export default UserModal;