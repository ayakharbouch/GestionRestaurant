import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

const CityList = () => {
    const [villes, setVilles] = useState([]);
    const getVilles = async () => {
        try {
          const response = await axios.get(`localhost:8093/ville/all`);
          setVilles(response.data);
        } catch (error) {
          console.log(error);
        }
      }
      useEffect(() => {
        getVilles();
    
    
      }, []);
 return (
 <Table striped bordered hover>
 <thead>
 <tr>
 <th>#</th>
 <th>Name</th>
 {/* Ajoutez d'autres en-têtes de colonne selon vos besoins */}
 </tr>
 </thead>
 <tbody>
 {villes.map((city, index) => (
 <tr key={city.id}>
 <td>{city.id}</td>
 <td>{city.nom}</td>
 {/* Ajoutez d'autres cellules de données selon vos besoins */}
 </tr>
 ))}
 </tbody>
 </Table>
 );
};

export default CityList; 