import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PatientList = ({ onUpdated }) => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        
        axios.get("http://localhost:5000/api/patients") // Full backend URL
            .then(response => {
                console.log("Fetched patients:", response.data);
                setPatients(response.data);
            })
            .catch(err => {
                console.error("Error fetching patients:", err);
                setError("Failed to load patient data.");
            })
            .finally(() => {
                setLoading(false);
            });  
    
    }, [onUpdated]);
    
    return (
        <div>
            <div className="header">
                <Link to="/patients">
                    <button className='style-button' >Home</button>
                </Link>
                <h1>Displaying {patients.length} patients</h1>
                <Link to="/">
                    <button className='style-button'>Admit</button>
                </Link>
            </div>

            {loading && <p className='error-message'>Loading patients...</p>}

            {error && <p className='error-message'>{error}</p>}

            {!loading && !error && patients.length === 0 && <p className='error-message'>No patients found.</p>}

            {!loading && !error && patients.map(patient => (

                <div className='cards'>
                    <div key={patient._id} className="patient-card">
                        <Link to={`/${patient._id}/details`}>
                            {patient.name}  
                        </Link>
                        <Link to={`/${patient._id}/edit`}><button className='style-button'>edit</button></Link>
                        <p className='bold-text'>Age: {patient.age}</p>
                        <p className='bold-text'>{patient.symptoms}</p>
                        
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PatientList;
