import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table, TextField, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Serie() {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [serieName, setSerieName] = useState('');
  const [nom, setNom] = useState(null);

  const getSeries = async () => {
    try {
      const response = await axios.get('/series/all');
      setSeries(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSerie = async (id) => {
    try {
      await axios.delete(`/series/delete/${id}`);
      const updatedSeries = series.filter((serie) => serie.id !== id);
      setSeries(updatedSeries);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSeries();
  }, []);

  const filteredData = series.filter((item) =>
    item.nom?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const addSerie = async () => {
    try {
      const response = await axios.post('/series/save', { nom: nom });
      setSeries([...series, response.data]);
      setNom(null);
    } catch (error) {
      console.error(error);
    }
  };

  const serieList = filteredData.map((serie) => (
    <tr key={serie.id}>
      <td style={{ whiteSpace: 'nowrap', color: 'white' }}>{serie.id}</td>
      <td style={{ color: 'white' }}>{serie.nom}</td>
      <td>
        <ButtonGroup>
          <Button size="small" color="primary" component={Link} to={"" + serie.id}>
            Edit
          </Button>
          <Button size="small" color="error" onClick={() => deleteSerie(serie.id)}>
            Delete
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  ));

  return (
    <div style={{ backgroundImage: "url('https://www.escoffier.edu/wp-content/uploads/2016/04/Modern-restaurant-with-stylish-brown-interior--1024x681.jpeg')", color: 'white', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Container>
        <Box mt={3} p={2} bgcolor="rgba(0, 0, 0, 0.5)">
          {/* Add Serie Box */}
          <Box mb={2}>
            <Typography variant="h4" component="h2" sx={{ mb: 2, color: 'white' }}>
              Liste Serie
            </Typography>
            {/* Add serie form */}
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
                Add a Serie
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TextField
                  type="text"
                  label="Serie Name"
                  variant="outlined"
                  value={serieName}
                  onChange={(e) => setSerieName(e.target.value)}
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

                <Button variant="contained" onClick={addSerie}>
                  Add Serie
                </Button>
              </Box>
            </Box>
          </Box>
          <Box>
            <TextField
              className='mt-2'
              type='text'
              value={searchTerm}
              onChange={handleSearch}
              placeholder='Search By Name'
              InputProps={{
                style: { color: 'white' },
                className: 'search-input',
              }}
              InputLabelProps={{
                style: { color: 'white' },
              }}
              variant='outlined'
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white',
                  },
                },
              }}
            />
            
            <Table striped hover bordered>
  <thead>
    <tr>
      <th style={{ color: 'white' }}>ID</th>
      <th style={{ color: 'white' }}>NOM</th>
      <th style={{ color: 'white' }}>Actions</th>
    </tr>
  </thead>
  <tbody>
    {serieList.map((serie) => (
      <React.Fragment key={serie.id}>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        {serie}
      </React.Fragment>
    ))}
  </tbody>
</Table>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Serie;
