import PatientForm from "../components/PatientForm"
import { Link } from "react-router-dom";
import '../styles/styles.css';
const AddPatient = () => {
    return (<>
    <div className="header">
        <Link to="/patients">   
            <button className="style-button">
                Home
            </button>
        </Link>
        <h1 className="align-center">Update </h1>
    </div>
    <PatientForm />
    </>);
    }

    export default AddPatient;