import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogon(e) {
    e.preventDefault();

    const data = {
      id
    }

    try {
      const response = await api.post('sessions', data);

      localStorage.setItem('ngoId', data.id);
      localStorage.setItem('ngoName', response.data.name);

      history.push('/profile')
    } catch (error) {
      alert('Logon fails');
    }

  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />

        <form onSubmit={handleLogon}>
          <h1>Do your logon</h1>

          <input
            placeholder="Your ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button type="submit" className="button">Submit</button>

          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#e02041" />
            I'm not registered
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}
