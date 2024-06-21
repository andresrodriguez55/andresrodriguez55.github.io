import React, { useState, useEffect } from 'react';
import { Grid, Paper } from '@mui/material';
import LoginForm from './components/LoginForm';
import ApiSessionService from '../../api/ApiSessionService';
import { useHistory } from 'react-router-dom';
import { deleteToken, setToken } from '../../Tools/auth-helper';

export default function Login() {
    const apiSessionService = new ApiSessionService(process.env.REACT_APP_BACKEND_URL);
    const [disableButton, setDisableButton] = useState(false);
    const history = useHistory();

    useEffect(() => {
        deleteToken();
    }, []);

    const handleSubmit = async (data) => {
        setDisableButton(true);
        try {
            const authenticateResponseDto = await apiSessionService.authenticate(data);
            const token = authenticateResponseDto.token;
            setToken(`Bearer ${token}`);
            setTimeout(() => {
                history.push('/admin');
            }, 600);
        } catch (error) {
            alert(error.message);
        } finally {
            setDisableButton(false);
        }
    };

    const paperStyle = {
        padding: '30px',
        height: '380px',
        width: '50%',
        margin: '100px auto',
    };

    return (
        <div className="mainDiv">
            <Grid>
                <Paper elevation={12} style={paperStyle}>
                    <LoginForm onSubmit={handleSubmit} disableButton={disableButton} />
                </Paper>
            </Grid>
        </div>
    );
}