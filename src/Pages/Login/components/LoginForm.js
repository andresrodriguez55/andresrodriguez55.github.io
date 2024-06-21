import React, { useState } from 'react';
import { Grid, Avatar, TextField, Button } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AuthenticateUserRequest from '../../../data/dto/request/authentication/AuthenticateUserRequest';

export default function LoginForm({ onSubmit, disableButton }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new AuthenticateUserRequest(username, password);
        onSubmit(data);
    };

    const avatarStyle = {
        backgroundColor: '#1bbd7e',
    };
    const textFieldStyle = {
        marginBottom: '10px',
    };
    const passwordTextFieldStyle = {
        marginBottom: '35px',
    };

    return (
        <form onSubmit={handleSubmit} autoComplete="off">
            <Grid align="center">
                <Avatar style={avatarStyle}>
                    <LockOpenIcon />
                </Avatar>
                <h2>Login</h2>
            </Grid>
            <TextField
                id="adminUsername"
                label="Username"
                placeholder="Enter username"
                variant="standard"
                style={textFieldStyle}
                fullWidth
                autoComplete="off"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                inputProps={{ minLength: 3, maxLength: 20 }}
            />
            <TextField
                id="adminPassword"
                label="Password"
                placeholder="Enter password"
                type="password"
                variant="standard"
                style={passwordTextFieldStyle}
                fullWidth
                autoComplete="off"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                inputProps={{ minLength: 3, maxLength: 20 }}
            />
            <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={disableButton}
                fullWidth
            >
                Sign in
            </Button>
        </form>
    );
}