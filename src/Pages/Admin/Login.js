import React from 'react';

import {Paper, Grid, Avatar, TextField, Button} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { deleteToken, getToken, setToken } from '../../Tools/auth-helper';
import {useHistory} from "react-router-dom";
import { prefixURLBackend } from '../../Tools/PrefixURLBackend/PrefixURLBackend';

export default function login()
{
    const [disableButton, setDisableButton] = React.useState(false);
    const history=useHistory();

    const submit=async(e)=>
    {
        e.preventDefault();
        setDisableButton(true);

        const data = {
            "adminUsername": document.getElementById("adminUsername").value,
            "adminPassword": document.getElementById("adminPassword").value,
        };

        const urlToFetch = prefixURLBackend + "BlogAdmin/Authenticate";
        await fetch((urlToFetch),
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(data)
        }).then(async(response) => await response.text().then(token=>
        {
            if(response.status != 200) 
                alert("User does not exist...");
            else if(response.status == 200)
            {   
                deleteToken();
                setToken("Bearer "+token);
                setTimeout(function(){
                    history.push("/admin");
                }, 600);
            }
            else
                console.log(response);
        })).catch(e => alert('Database connection error...'));
        
        setDisableButton(false);
    }

    const paperStyle=
    {
        padding: "30px", 
        height: "380px", 
        width: "50%", 
        margin: "100px auto"
    };
    const avatarStyle=
    {
        backgroundColor: "#1bbd7e"
    };
    const usernameTexFieldStyle = 
    {
        marginBottom: "10px"
    };
    const passwordTexFieldStyle = 
    {
        marginBottom: "35px"
    };

    return(
        <div className="mainDiv">
            <Grid>
                <Paper elevation={12} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}>
                            <LockOpenIcon/>
                        </Avatar>
                        <h2>Login</h2>
                    </Grid>

                    <form onSubmit={(e)=>submit(e)} autoComplete="off">
                        <TextField id='adminUsername' label='Username' placeholder="Enter username" variant="standard" 
                            style={usernameTexFieldStyle} fullWidth autoComplete='off' required/>
                        <TextField id="adminPassword" label="Password" placeholder="Enter password" type="password" 
                            variant="standard" style={passwordTexFieldStyle} fullWidth autoComplete='off' required/>

                        <Button type='submit' color='primary' variant="contained" disabled={disableButton} fullWidth>
                            Sign in
                        </Button>
                    </form>
                </Paper>
            </Grid>
        </div>
    );
}