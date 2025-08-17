import { useEffect, useState } from 'react';
import './home.css'
import { logout } from '../utils/auth';
import axios from 'axios';
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
    <body>
      <header>
        <nav>
          <ul>
            <li><a href='/'>Usuários</a></li>
            <li><a href='/registrar'>Cadastrar usuário</a></li>
            <li><a href='/propriedades'>Propriedades</a></li>
            <li><a href='/objetos'>Objetos</a></li>
            <li><button onClick={logout}>Sair</button></li>
          </ul>
        </nav>
      </header>
      <main>
        <h1>Métrica dos usuários</h1>
        <div className="usuario-container">
          {usuarios.map(usuario => (
            <div className="usuario-card" key={usuario.id}>
              <h2>{usuario.name}</h2>
              <p>Moedas: {usuario.hiCoin}</p>
              <p>Confiança: {usuario.score}</p>
              <button onClick={() => deleteUser(usuario.id)}>Excluir</button>
            </div>
          ))}
        </div>
      </main>
    </body>
  );
}

