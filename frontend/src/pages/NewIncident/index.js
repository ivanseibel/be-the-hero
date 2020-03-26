import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function NewIncident() {
  const ngoId = localStorage.getItem('ngoId');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState(0);

  const history = useHistory();

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value
    };

    try {
      await api.post('incidents', data, {
        headers: {
          authorization: ngoId
        }
      });

      history.push('/profile');
    } catch (error) {
      alert('Incident register fails');
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Register a new incident</h1>
          <p>
            Describe the incident in detail to find a hero to solve it.
          </p>

          <Link to="/profile" className="back-link">
            <FiArrowLeft size={16} color="#e02041" />
            Back to Home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Incident title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            placeholder="Value"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button
            type="submit"
            className="button"
            onClick={handleNewIncident}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
