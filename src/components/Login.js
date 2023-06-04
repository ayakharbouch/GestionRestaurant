import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  let imageStyle = {
    height: "100vh",
    width: "100vw",
    backgroundImage: 'url("https://www.countryandtownhouse.com/wp-content/uploads/2020/02/BALABAYA_Mix3-Crushed-Potatoes-Tea-Smoked-Aubergine-Beef-Onion-Peppers-Yoghurt-Burrata-Quince.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
  };

  return (
    <Container disableGutters maxWidth={false} style={imageStyle}>
      <Box sx={styles.container}>
        <Box sx={styles.loginBox}>
          <Typography variant="h4" sx={styles.heading}>
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
            <TextField
              type="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
              required
              fullWidth
              sx={styles.input}
              InputProps={{
                style: { color: 'white' },
              }}
              InputLabelProps={{
                style: { color: 'white' },
              }}
            />
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={handlePasswordChange}
              required
              fullWidth
              sx={styles.input}
              InputProps={{
                style: { color: 'white' },
              }}
              InputLabelProps={{
                style: { color: 'white' },
              }}
            />
            <Button type="submit" variant="contained" sx={styles.button}>
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    color: 'white',
  },
  loginBox: {
    border: '2px solid white',
    borderRadius: '8px',
    padding: '32px',
    background: 'rgba(0, 0, 0, 0.7)',
    width: '400px', // Increase the width value as per your requirement
  },
  heading: {
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
  },
  input: {
    marginBottom: '15px',
    '& input': {
      color: 'white',
      border: '1px solid white', // Add white border
    },
    '& label': {
      color: 'white', // Set label color to white
    },
  },
  button: {
    marginTop: '20px',
    backgroundColor: '#007bff',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#0069d9',
    },
  },
};

export default Login;
