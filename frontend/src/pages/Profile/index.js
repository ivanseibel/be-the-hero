import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import './styles.css';

export default function Profile() {
  const [incidents, setIncidents] = useState([]);

  const ngoId = localStorage.getItem('ngoId');
  const ngoName = localStorage.getItem('ngoName');
  const history = useHistory();

  if (!ngoId) {
    history.push('/');
  }

  useEffect(() => {
    if (ngoId) {
      api.get('ngo/incidents', {
        headers: {
          authorization: ngoId
        }
      }).then(response => {
        setIncidents(response.data);
      });
    }
  }, [ngoId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: { authorization: ngoId }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (error) {
      alert('Fail deleting the incident');
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Welcome back, {ngoName}</span>

        <Link className="button" to="/incidents/new">Register a new incident</Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Registered incidents</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>INCIDENT:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIPTION:</strong>
            <p>{incident.description}</p>

            <strong>VALUE:</strong>
            <p>{Intl.NumberFormat('us', { style: 'currency', currency: 'USD' }).format(incident.value)}</p>

            <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
