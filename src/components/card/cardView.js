import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import './cardView.css'
import { Container, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CardView = ({ users, onEdit, onDelete }) => {
    return (
        <Container className="cardContainer">
            {users.map((user) => (
                <Card key={user.id} className="cards">
                    <div className="cardOverlay">
                        <div className="iconContainer">
                            <IconButton className="icon">
                                <EditIcon onClick={() => onEdit(user)} />
                            </IconButton>
                            <IconButton className="icon">
                                <DeleteIcon onClick={() => onDelete(user.id)} />
                            </IconButton>
                        </div>
                    </div>
                    <CardMedia
                        component="img"
                        height="140"
                        image={user.avatar}
                        alt={user.first_name}
                    />
                    <CardContent>
                        <h3>{user.first_name} {user.last_name}</h3>
                        <p>{user.email}</p>
                    </CardContent>
                </Card>
            ))}
        </Container>
    )
}

export default CardView