const Patient = require('../models/Patient');

module.exports.createPatient = (req, res) => {
    const newPatient = new Patient(req.body);
    newPatient.save()
        .then(patient => res.status(201).json(patient))
        .catch(err => res.status(400).json({ error: err.message }));
};

module.exports.updatePatient = (req, res) => {
    Patient.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then(patient => {
            if (!patient) {
                return res.status(404).json({ message: 'Patient not found' });
            }
            res.json(patient);
        })
        .catch(err => res.status(400).json({ error: err.message }));
};

module.exports.deletePatient = (req, res) => {
    Patient.findByIdAndDelete(req.params.id)
        .then(patient => {
            if (!patient) {
                return res.status(404).json({ message: 'Patient not found' });
            }
            res.json({ message: 'Patient deleted successfully' });
        })
        .catch(err => res.status(500).json({ error: err.message }));
};

module.exports.getPatient = (req, res) => {
    Patient.findById(req.params.id)
        .then(patient => {
            if (!patient) {
                return res.status(404).json({ message: 'Patient not found' });
            }
            res.json(patient);
        })
        .catch(err => res.status(500).json({ error: err.message }));
};

module.exports.getAllPatients = (req, res) => {
    Patient.find()
        .then(patients => res.json(patients))
        .catch(err => res.status(500).json({ error: err.message }));
};