import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PatientList from './views/PatientList';
import PatientDetails from './views/PatientDetails';
import EditPatient from './views/EditPatient';
import AddPatient from './views/AddPatient';

function App() {
  const [newPatient, setNewPatient] = useState(null);

  const handleCreate = (patient) => {
    setNewPatient(patient);
  };

  const handleUpdate = (patient) => {
    setNewPatient(patient);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddPatient onUpdated={handleCreate} />} />

        <Route path="/patients" element={<PatientList onUpdated={handleCreate} />} />

        <Route path="/:id/details" element={<PatientDetails onUpdated={handleUpdate} />} />

        <Route path="/:id/edit" element={<EditPatient patient={newPatient} onUpdated={handleUpdate} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;