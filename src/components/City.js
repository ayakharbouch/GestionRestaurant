import React, { useState, useEffect } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import axios from 'axios';
import CityList from './CityList';
import { Table } from 'react-bootstrap';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const City = () => {
  const [cities, setCities] = useState([]);
  const [cityName, setCityName] = useState('');
  const [cityId, setCityId] = useState('');
  const [userId,setUserId] = useState('');

  const getCities = async () => {
    try {
      const response = await axios.get('/ville/all');
      setCities(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addCity = async () => {
    try {
      const response = await axios.post('/ville/save', { nom: cityName });
      setCities([...cities, response.data]);
      setCityName('');
    } catch (error) {
      console.error(error);
    }
    window.location.reload();
  };
  const getCityById = async (id) => {
    try {
        const response = await axios.get(`/ville/${id}`);
        setUserId(response.data.id);
        setCityName(response.data.nom);

    } catch (error) {
        console.error(error);
    }
};
  const updateCity = async () => {
    try {
      const response = await axios.put(`/ville/update/${userId}`, { nom: cityName });
      const updatedCities = cities.map((city) => {
        if (city.id === response.data.id) {
          return response.data;
        }
        return city;
      });
      setCities(updatedCities);
      setCityId('');
      setCityName('');
    } catch (error) {
      console.error(error);
    }
    window.location.reload();
  };


  const deleteCity = async (id) => {
    try {
      await axios.delete(`/ville/delete/${id}`);
      const updatedCities = cities.filter((city) => city.id !== id);
      setCities(updatedCities);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCities();
  }, []);

  return (
    <Container
      maxWidth="xl"
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url("https://www.escoffier.edu/wp-content/uploads/2016/04/Modern-restaurant-with-stylish-brown-interior--1024x681.jpeg")',
        backgroundSize: 'cover',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            border: '2px solid white',
            borderRadius: '8px',
            p: 3,
            width: '45%',
          }}
        >
          <Typography variant="h4" component="h1" sx={{ mb: 2, color: 'white' }}>
            Add a City
          </Typography>

           
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <TextField
        type="text"
        label="City Name"
        variant="outlined"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        sx={{
          mr: 2,
          flex: 1,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
          },
        }}
        InputLabelProps={{ style: { color: 'white' } }}
        InputProps={{ style: { color: 'white' } }}
      />

            {userId ? (
              <Button variant="contained" onClick={updateCity}>
                Update City
              </Button>
            ) : (
              <Button variant="contained" onClick={addCity}>
                Add City
              </Button>
            )}
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            border: '2px solid white',
            borderRadius: '8px',
            p: 3,
            width: '45%',
          }}
        >
          <Typography variant="h4" component="h1" sx={{ mb: 2, color: 'white' }}>
            List of Cities
          </Typography>
          <Table striped hover bordered>
            <thead>
              <tr>
                <th style={{ color: 'white' }}>ID</th>
                <th style={{ color: 'white' }}>Name</th>
                <th style={{ color: 'white' }}>Actions</th>
                {/* Add more column headers as needed */}
              </tr>
            </thead>
            <tbody>
              {cities.map((city, index) => (
                <tr key={city.id}>
                  <td style={{ color: 'white' }}>{city.id}</td>
                  <td style={{ color: 'white' }}>{city.nom}</td>
                  <td style={{ color: 'white' }}>
                  <Button variant="contained" sx={{ bgcolor: 'success.main', color: 'white', mr: 1 }} size="small" onClick={() => getCityById(city.id)}><EditIcon sx={{ mr: 0.5 }} /></Button>
                  <Button variant="contained" sx={{ bgcolor: 'error.main', color: 'white', mr: 1 }} size="small" onClick={() => deleteCity(city.id)}><DeleteIcon sx={{ mr: 0.5 }} /></Button>
                    </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
      </Box>
    </Container>
  );
};

export default City;
