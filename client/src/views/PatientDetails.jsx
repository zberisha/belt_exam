import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom'; 
import '../styles/styles.css';

const PatientDetails = ({ onUpdated }) => {
    const { id } = useParams(); // Get patient ID from URL
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        setLoading(true);
        setError(null);
        
        axios.get(`http://localhost:5000/api/patients/${id}`) 
            .then(response => {
                setPatient(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching patient details:", err);
                setError("Failed to load patient details.");
                setLoading(false);
            });

    }, [id]);

    const handleDelete = () => {
        axios.delete(`http://localhost:5000/api/patients/${id}`) 
            .then(() => {
                console.log("Patient deleted successfully");
                navigate('/'); 
            })
            .catch(err => {
                console.error("Error deleting patient:", err);
                setError("Failed to delete patient.");
            });
    };

    if (loading) return <p className='error-message'>Loading...</p>;
    if (error) return <p className='error-message'>{error}</p>;

    return (
        <div className='container'>
            <div className="header">
                <Link to="/">   
                    <button className="style-button">Home</button>
                </Link>
                <h1>{patient.name} Details</h1>
                <Link to={`/patients/${id}/edit`}>  {/* Link to Edit Page */}
                    <button className="style-button">Edit</button>
                </Link>
            </div>

            {patient ? (
                <div className='individual-card'>
                    <p className='age'>{patient.age} years of age</p>
                    <p className='symptoms'>Symptoms: {patient.symptoms}</p>
                    <button className='style-button' onClick={handleDelete}>Discharge patient</button> 
                </div>
            ) : (
                <p className='error-message'>Patient not found.</p>
            )}
        </div>
    );
};

export default PatientDetails;
