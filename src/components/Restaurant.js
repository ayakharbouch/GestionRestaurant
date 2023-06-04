import React, { useState, useEffect } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AddRestaurant() {
  const [nom, setNom] = useState('');
  const [restaurants, setRestaurants] = useState([]);

  const [adresse, setAdresse] = useState('');
  const [lattitude, setLattitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [week, setWeek] = useState('');
  const [rank, setRank] = useState('');
  const [openHour, setOpenHour] = useState('');
  const [closeHour, setCloseHour] = useState('');

  useEffect(() => {
    getRestaurants();
  }, []);

  const getRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:8093/restaurant/all');
      setRestaurants(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addRestaurant = async () => {
    try {
      const response = await axios.post('http://localhost:8093/restaurants/save', {
        nom: nom,
        adresse: adresse,
        lattitude: lattitude,
        longitude: longitude,
        week: week,
        rank: rank,
        open_hour: openHour,
        close_hour: closeHour
      });

      console.log(response.data);
      // Handle successful response here

    } catch (error) {
      console.error(error);
      // Handle error here
    }
  };

  return (
    <Container
      style={{
        backgroundImage: `url('https://www.escoffier.edu/wp-content/uploads/2016/04/Modern-restaurant-with-stylish-brown-interior--1024x681.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '24px' }}>
        <Typography variant="h5" component="h3" gutterBottom>
          Add Restaurant:
        </Typography>

        {/* Rest of the form inputs */}

        <Button variant="contained" color="primary" onClick={addRestaurant} style={{ marginTop: '16px' }}>
          Save
        </Button>
        <Button variant="contained" color="secondary" component={Link} to="/admin/restaurants" style={{ marginTop: '16px', marginLeft: '8px' }}>
          Cancel
        </Button>

        <div style={{ marginTop: '24px' }}>
          <Typography variant="h6" component="h4" gutterBottom>
            Restaurant List:
          </Typography>
          {restaurants.map((restaurant) => (
            <div key={restaurant.id}>
              <Typography variant="subtitle1">{restaurant.nom}</Typography>
              <Typography variant="body2">Adresse: {restaurant.adresse}</Typography>
              {/* Render other restaurant details */}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default AddRestaurant;
