import { useEffect, useState } from 'react';
import './home.css'
import { logout } from '../utils/auth';
import api from '../services/api';

type Usuario = {
  id: string;
  name: string;
  email: string;
  phone: string;
  bornDate: string;
  score: number;
  lastLogin: string;
  imageUrl: string;
  hiCoin: number;
  role: number;
  isActive: boolean;
}

export default function Home() {
  
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    api.get('/users')
      .then(response => {
        setUsuarios(response.data);
        setCarregando(false);
      })
      .catch(error => {
        console.error('Erro ao buscar usuários:', error);
        setCarregando(false);
      });
  }, [])

  const deleteUser = (id: string) => {
    const confirmar = window.confirm("Tem certeza que deseja excluir este usuário?");
    if (!confirmar) return
    
    api.delete(`/users/${id}`)
      .then(response => {
        setUsuarios(usuarios.filter(usuario => usuario.id !== id));
      })
      .catch(error => {
        console.error('Erro ao buscar usuários:', error);
    });
  }

  if (carregando) {
    return <div>Carregando...</div>  
  }

  return (
    <div className='dashboard'>
      <div className='side-menu-container'>
        <h2>Ecoponto (Admin)</h2>
        <div className='side-menu-links'>
          <a href='/home'>
            <span className='menu-text'>Painel principal</span>
          </a>
        </div>
        <div className='side-menu-links'>
          <a href='/propriedades'>
            <span className='menu-text'>Propriedades</span>
          </a>
        </div>
        <div className='side-menu-links'>
          <a href='/objetos'>
            <span className='menu-text'>Objetos</span>
          </a>
        </div>
        <div className='side-menu-links'>
          <a href='/registrar'>
            <span className='menu-text'>Cadastrar usuários</span>
          </a>
        </div>
        <button onClick={logout}>Sair</button>
      </div>

      <div className='main-container'>
        <h1>Painel de usuários</h1>
        <div className='top-panel'>
          <div className='status-container'>
            <h3>Status do Serviço</h3>
            <p>🟢 Online</p>
          </div>
          <div className='total-users'>
            <h3>Total de Usuários</h3>
            <p>{usuarios.length}</p>
          </div>
        </div>

        <div className='users-container' style={usuarios.length > 3 ? {overflowY: 'scroll'} : {}}>
          {usuarios.map(usuario => (
            <div className='user-card' key={usuario.id}>
              <div className='user-details'>
                <div className='user-info'>
                  <h4>{usuario.name}</h4>
                  <p>Hicoins: {usuario.hiCoin}</p>
                  <p>Score: {usuario.score}</p>
                </div>
                <div className='user-actions'>
                  <button className='info-btn'>Info</button>
                  <button className='delete-btn' onClick={() => deleteUser(usuario.id)}>Expulsar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

