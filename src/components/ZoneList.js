import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "react-modal";

const ZoneList = ({ cityId }) => {
    const [zones, setZones] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedZone, setSelectedZone] = useState(null);
    const [cities, setCities] = useState([]);
    const [zoneName, setZoneName] = useState("");
    const [selectedCityId, setSelectedCityId] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`http://localhost:9099/api/zones`);
            setZones(result.data);
        };
        fetchData();
    }, [cityId]);

    useEffect(() => {
        const fetchCities = async () => {
            const result = await axios(`http://localhost:9099/api/cities`);
            setCities(result.data);
        };
        fetchCities();
    }, []);

    const handleDelete = (zoneId) => {
        if (window.confirm("Are you sure you want to delete this zone?")) {
            axios.delete(`http://localhost:9099/api/zones/${zoneId}`).then(() => {
                setZones(zones.filter((zone) => zone.id !== zoneId));
            });
        }
    };

    const handleOpenModal = (zone) => {
        setSelectedZone(zone);
        setZoneName(zone.name);
        setSelectedCityId(zone.city && zone.city.id);
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedZone(null);
        setZoneName("");
        setSelectedCityId("");
        setModalIsOpen(false);
    };

    const handleSave = () => {
        if (!selectedZone) return;
        
        const updatedZone = {
          ...selectedZone,
          name: zoneName,
          city: { id: selectedCityId }
        };
      
        axios.put(`localhost:8093/Zone/all/{id}`, updatedZone)
          .then(response => {
            // Handle successful update
            // You can update the zones state or perform any necessary actions
            // For example:
            // - Update the zones state with the updated zone
            // - Refresh the zones list from the API to reflect the changes
      
            // Update the zones state with the updated zone
            setZones(zones.map(zone => zone.id === selectedZone.id ? response.data : zone));
      
            handleCloseModal();
          })
          .catch(error => {
            // Handle error
            // Display an error message or perform any necessary error handling
          });
      };
      
      

    return (
        <div>
            <h2>Zones</h2>
            <Link to={`/create-zone`} className="btn btn-primary">
                Add Zone
            </Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>City</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {zones.map((zone) => (
                        <tr key={zone.id}>
                            <td>{zone.id}</td>
                            <td>{zone.name}</td>
                            <td>{zone.city && zone.city.name}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDelete(zone.id)}>
                                    Delete
                                </button>
                                <button className="btn btn-primary" onClick={() => handleOpenModal(zone)}>
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal}>
                <h3>Modification de la zone</h3>
                <ul>
                    <li>
                        <label>Nom de la zone:</label>
                        <input type="text" value={zoneName} onChange={(e) => setZoneName(e.target.value)} />
                    </li>
                    <li>
                        <label>Ville:</label>
                        <select value={selectedCityId} onChange={(e) => setSelectedCityId(e.target.value)}>
                            {cities.map((city) => (
                                <option key={city.id} value={city.id}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </li>
                </ul>
                <button className="btn btn-primary" onClick={handleCloseModal}>
                    Annuler
                </button>
                <button className="btn btn-success" onClick={handleSave}>
                    Sauvegarder
                </button>
            </Modal>

        </div>
    );
};

export default ZoneList;