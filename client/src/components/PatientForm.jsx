import React, { useReducer, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
    name: "",
    age: "",
    symptoms: "",
    loading: false,
    error: null,
    isEditMode: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_FIELD":
        return { ...state, [action.field]: action.value };
        case "SUBMIT_START":
        return { ...state, loading: true, error: null };
        case "SUBMIT_SUCCESS":
        return { ...initialState };
        case "SUBMIT_ERROR":
        return { ...state, loading: false, error: action.error };
        case "SET_EDIT_MODE":
        return { ...state, isEditMode: true, ...action.payload };
        default:
        return state;
    }
};

const PatientForm = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
        axios
            .get(`http://localhost:5000/api/patients/${id}`)
            .then((response) => {
                dispatch({
                type: "SET_EDIT_MODE",
                payload: {
                name: response.data.name,
                age: response.data.age,
                symptoms: response.data.symptoms,
                },
                });
            })
            .catch((error) => {
                dispatch({ type: "SUBMIT_ERROR", error: "Error fetching patient data" });
            });
        }
    }, [id]);

const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SUBMIT_START" });

const patientData = {
    name: state.name,
    age: state.age,
    symptoms: state.symptoms,
    };

const request = state.isEditMode
    ? axios.put(`http://localhost:5000/api/patients/${id}`, patientData)
    : axios.post("http://localhost:5000/api/patients", patientData);

    request
        .then(() => {
            dispatch({ type: "SUBMIT_SUCCESS" });
            if (state.isEditMode) {
                navigate(`/${id}/details`);
            } else {
                navigate("/patients");
            }
        
      })
      .catch((error) => {
        dispatch({ type: "SUBMIT_ERROR", error: `Error ${state.isEditMode ? "updating" : "admitting"} patient` });
        alert(`Error ${state.isEditMode ? "updating" : "admitting"} patient`);
      });
  };

  return (
    <form className="patient-form" onSubmit={handleSubmit}>
            <label htmlFor="age">
                Age
            </label>
                <input
                    type="number"
                    name="age"
                    id="age"
                    placeholder="Age"
                    value={state.age}
                    onChange={(e) =>
                    dispatch({ type: "SET_FIELD", field: "age", value: e.target.value })
                    }
                    required
                />
            <label htmlFor="name"> Name </label>
                <input
                    name="name"
                    id="name"
                    type="text"
                    placeholder="Name"
                    value={state.name}
                    onChange={(e) =>
                    dispatch({ type: "SET_FIELD", field: "name", value: e.target.value })
                    }
                    required
                />
            <label htmlFor="symptoms">Symptoms</label>
                <textarea
                    name="symptoms"
                    id="symptoms"
                    type="textarea"
                    placeholder="Symptoms"
                    value={state.symptoms}
                    onChange={(e) =>
                    dispatch({
                        type: "SET_FIELD",
                        field: "symptoms",
                        value: e.target.value,
                    })
                    }
                    required
                ></textarea>
                <button type="submit" className="style-button" disabled={state.loading}>
            {state.loading
            ? state.isEditMode
                ? "Updating..."
                : "Admitting..."
            : state.isEditMode
            ? "Update"
            : "Admit"}
        </button>
        {state.error && <p style={{ color: "red" }}>{state.error}</p>}
        </form>
    );
};

export default PatientForm;