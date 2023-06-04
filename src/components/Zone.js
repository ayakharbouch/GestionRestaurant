import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { Table } from 'react-bootstrap';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Zone = ({ onZoneAdded }) => {
  const [nom, setName] = useState("");
  const [cityId, setCityId] = useState("");
  const [cities, setCities] = useState([]);
  const [userId, setUserId] = useState('');
  const [zones, setZones] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8093/ville/all")
      .then(response => {
        setCities(response.data);
      })
      .catch(error => {
        console.error(error);
      });
      
    getZones();
  }, []);

  const getZoneById = async (id) => {
    try {
      const response = await axios.get(`/Zone/${id}`);
      setUserId(response.data.id);
      setName(response.data.nom);
    } catch (error) {
      console.error(error);
    }
  };

  const getZones = async () => {
    try {
      const response = await axios.get('/Zone/all');
      setZones(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteZone = async (id) => {
    try {
      await axios.delete(`/Zone/delete/${id}`);
      const updatedZones = zones.filter((zone) => zone.id !== id);
      setZones(updatedZones);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8093/Zone/save", {
        nom,
        ville: {
          id: cityId,
        },
      })
      .then((response) => {
        setName("");
        setCityId("");
        getZones();
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
            Add Zone
          </Typography>

          <form onSubmit={handleSubmit}>
           <Box sx={{ mb: 2 }}>
            <TextField
              type="text"
              label="Name"
              variant="outlined"
              value={nom}
              onChange={(event) => setName(event.target.value)}
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
              InputProps={{
                style: { color: 'white' },
              }}
            />
          </Box>
          <FormControl sx={{ mb: 2 }} style={{ width: '50%' }}>
            <InputLabel id="city-label" style={{ color: 'white' }}>
              City
            </InputLabel>
            <Select
              labelId="city-label"
              id="city-select"
              value={cityId}
              onChange={(event) => setCityId(event.target.value)}
              label="City"
              inputProps={{
                style: { color: 'white' },

              }}
              InputLabelProps={{ style: { color: 'white' } }}
              renderValue={(selected) => (
                <Box sx={{ color: 'white' }}>
                  {cities.find((city) => city.id === selected)?.nom}
                </Box>
              )}
              
              sx={{
                '& .MuiSelect-root': {
                  color: 'white',
                  },
                
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
              }}
            >
              <MenuItem value="">Select a city</MenuItem>
              {cities &&
                cities.map((city) => (
                  <MenuItem key={city.id} value={city.id}  >
                    {city.nom}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
       
       <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      ></Box>

          <Button variant="contained" type="submit" sx={{ color: 'white' }}>
            Add Zone
          </Button>
        </form>
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
            List of Zones
          </Typography>
          <Table striped hover bordered>
            <thead>
              <tr>
                <th style={{ color: 'white' }}>ID</th>
                <th style={{ color: 'white' }}>Name</th>
                <th style={{ color: 'white' }}>City</th>
                <th style={{ color: 'white' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {zones.map((zone) => (
                <tr key={zone.id}>
                  <td style={{ color: 'white' }}>{zone.id}</td>
                  <td style={{ color: 'white' }}>{zone.nom}</td>
                  <td style={{ color: 'white' }}>{zone.ville && zone.ville.nom}</td>
                  <td style={{ color: 'white' }}>
                    <Button variant="contained" sx={{ bgcolor: 'success.main', color: 'white', mr: 1 }} size="small" onClick={() => getZoneById(zone.id)}><EditIcon sx={{ mr: 0.5 }} /></Button>
                    <Button variant="contained" sx={{ bgcolor: 'error.main', color: 'white', mr: 1 }} size="small" onClick={() => deleteZone(zone.id)}><DeleteIcon sx={{ mr: 0.5 }} /></Button>
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

export default Zone;
