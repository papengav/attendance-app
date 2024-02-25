import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@material-ui/core';
import { useState, useEffect } from 'react';

export default function Userlogin() {
    const paperStyle={padding: '50px 20px', width:600, margin:'20px auto'}
    const[username,setUsernamer]=useState('')
    const[password,setPassword]=useState('')
    const[user, setUser]=useState([])
    const handleClick=(e)=>{
        e.preventDefault()
        const User={username, password}
        console.log(User)
        fetch("http://localhost:8080/user/add",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(User)
        }).then(()=>{
        console.log("User Logged In")
    })
}
   // useEffect(()=>{
     //   fetch("http://localhost:8080/user/getAll")
       // .then(res=>res.json())
        //.then((result)=>{
          //  setUser(result);}
        //)
//},[])
  return (
    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1>User Login</h1>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Username" variant="outlined" fullWidth
      value={username} onChange={(e)=>setUsernamer(e.target.value)}/>
      <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth
      value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <Button variant="contained" color="secondary" onClick={handleClick}>
        Submit
        </Button>
    </Box>
    </Paper>
    <h1>Users</h1>
    <Paper elevation={3} style={paperStyle}>

        {user.map(user=>(
            <Paper eleveation={6} style={{margin:"10px",padding:"15px",textAlign:"left"}} key={user.id}>
        Id:{user.id}<br/>
        Username:{user.username}<br/>
        Password:{user.password}
        </Paper>
        ))}
    </Paper>
    </Container>
  );
}
