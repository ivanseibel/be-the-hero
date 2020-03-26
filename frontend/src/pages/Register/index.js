import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setwhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      state
    };

    try {
      const response = await api.post('ngos', data);
      alert(`Your access ID is: ${response.data.id}`)
      history.push('/');
    } catch (error) {
      alert('Register fails');
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Register</h1>
          <p>
            Do your register, go inside the platform and help people to find the incidents of your NGO.
          </p>

          <Link to="/" className="back-link">
            <FiArrowLeft size={16} color="#e02041" />
            Back to Logon
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder="NGO Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="emails"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={e => setwhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input
              placeholder="City"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input
              placeholder="State"
              style={{ width: 95 }}
              value={state}
              onChange={e => setState(e.target.value)}
            />
          </div>

          <button type="submit" className="button">Register</button>
        </form>
      </div>
    </div>
  );
}
