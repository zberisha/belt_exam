import PatientForm from "../components/PatientForm"
import { Link } from "react-router-dom";
import '../styles/styles.css';
const EditPatient = () => {
    return (<>
    <div className="header">
        <Link to="/patients">   
            <button className="style-button">
                Home
            </button>
        </Link>
        <h1>Update </h1>
        <Link to="/patients/:id/details">
            <button className="style-button">
                Details
            </button>
        </Link>
    </div>
    <PatientForm />
    </>);
    }

    export default EditPatient;