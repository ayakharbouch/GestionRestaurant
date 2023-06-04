import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, TextField, Box, Typography } from '@mui/material';
import axios from 'axios';

function AddSpecialite() {
  const [nom, setNom] = useState('');

  const addSerie = async () => {
    try {
      const response = await axios.post('http://localhost:8093/specialite/save', { nom: nom });
      console.log(response.data); // Optional: Log the response data
      setNom('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ backgroundImage: "url('https://www.escoffier.edu/wp-content/uploads/2016/04/Modern-restaurant-with-stylish-brown-interior--1024x681.jpeg')", color: 'white', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Container>
        <Box mt={3} p={2} bgcolor="rgba(0, 0, 0, 0.5)">
          <Typography variant="h4" component="h2" sx={{ mb: 2, color: 'white' }}>
            Add Speciality
          </Typography>
          <Box sx={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', border: '2px solid white', borderRadius: '8px', p: 3, width: '45%' }}>
            <Typography variant="h5" component="h3" sx={{ mb: 2, color: 'white' }}>
              Nom:
            </Typography>
            <TextField
              type="text"
              label="Nom"
              variant="outlined"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white',
                  },
                },
              }}
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{ style: { color: 'white' } }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button variant="contained" onClick={addSerie} sx={{ mr: 1 }}>
                Save
              </Button>
              <Button variant="contained" color="secondary" component={Link} to="/admin/series">
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default AddSpecialite;
