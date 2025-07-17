import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ParticipantList() {
    const [participants, setParticipant] = useState([]);

    useEffect(() => {
        fetchParticipants();
    }, [])


    const fetchParticipants = async () => {
        try {
            const response = await axios.get('http://localhost:5000/participants');
            setParticipant(response.data);
        } catch (error) {
            console.error('Error fetching participants:', error)
        }
    }
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/participants/delete/${id}`)
            window.alert('delete data berhasil');
            fetchParticipants();
        } catch (error) {
            console.error('Error deleting participant:', error);
        }
    }
    return (
        <div className="container">
            <h2>Contact List</h2>
            <Link to='/participants/add' className="btn">Tambah data</Link>
            <ul>
                {participants.map(participant => (
                    <li key={participant.id}>
                        <p>Name: {participant.name}</p>
                        <p>Score: {participant.score}</p>
                        <Link to={`/participants/edit/${participant.id}`} className="btn">Edit</Link>
                        <button onClick={() => handleDelete(participant.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ParticipantList;