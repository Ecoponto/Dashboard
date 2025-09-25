import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import './login.css'
import { ErrorBox } from '../components/ErrorBox';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const dadosLogin = {
      username: email,
      password: password,
    };

    try {
      const response = await api.post('/sessions/login', dadosLogin);
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate('/home');
    
    } catch (err: any) {
      setError('Credenciais inválidas');
      setIsError(true)
      console.error(err);
    }
  };

  return (
    <div className='screen'>
      <div className='main-container'>
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          {isError && <ErrorBox message={error} onClose={() => setIsError(false)}/>}
          <label style={{marginBottom:-25}}>Email</label>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
            />
          <label style={{marginBottom:-25}}>Senha</label>
          <input  
            type="password"
            placeholder="Senha" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
            />
          <button className='button-add' type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};

