const express = require("express");
const {
    createPatient,
    updatePatient,
    deletePatient,
    getPatient,
    getAllPatients,
} = require("../controllers/patientController");

const router = express.Router();

router.post("/", createPatient); 
router.put("/:id", updatePatient); 
router.delete("/:id", deletePatient); 
router.get("/:id", getPatient);
router.get("/", getAllPatients);

module.exports = router;