import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import './login.css'

export default function Login() {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    const dadosLogin = {
      username: username,
      password: password,
    };

    try {
      const response = await api.post('/sessions/login', dadosLogin);
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate('/home');
    
    } catch (err: any) {
      setErro('Credenciais inválidas');
      console.error(err);
    }
  };

  return (
    <div className='main-container'>
      <div className='login-container'>
        <h1 className='tittle'>Seja, bem-vindo(a)!</h1>
        <form onSubmit={handleLogin}>
          <div className='input-container'>
            <input
              className='input-username'
              type="username"
              placeholder="Email"
              value={username}
              onChange={e => setusername(e.target.value)}
              required
            />
          </div>
          <div className='input-container'>
            <input
              className='input-password'
              type="password"
              placeholder="Senha"
              value={password}
              onChange={e => setpassword(e.target.value)}
              required
            />
          </div>
          <div className='button-container'>
            <button className='button-submit' type="submit">Entrar</button>
          </div>
          {erro && <p style={{ color: 'red' }}>{erro}</p>}
        </form>
      </div>
    </div>
  );
};

