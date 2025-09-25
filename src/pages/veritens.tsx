import { useEffect, useState } from 'react';
import './home.css'
import { logout } from '../utils/auth';
import api from '../services/api';
import axios from 'axios';

type Itens = {
  id: string;
  createdAt: string;
  trashId: string;
  imageUrl: string; 
  typeId: string;
}

type ItemWithSignedUrl = Itens & {
  signedUrl: string; 
}

const fetchItems = async (): Promise<Itens[]> => {
  const response = await api.get<Itens[]>('/itens');
  return response.data;
};

const fetchSignedUrl = async (imagePath: string): Promise<{ url: string }> => {
  const response = await api.get<{ url: string }>(`/objects/${imagePath}`);
  console.log(imagePath)
  return response.data;
};

export default function VerItens() {
  
  const [carregando, setCarregando] = useState(true);
  const [itens, setItens] = useState<ItemWithSignedUrl[]>([]);
  const [error, setError] = useState<string | null>(null);

  
  useEffect(() => {
    const loadData = async () => {
      try {
        setCarregando(true);
        setError(null);

        const initialItems = await fetchItems();
        const signedUrlPromises = initialItems.map(item => fetchSignedUrl(item.imageUrl));
        const signedUrlResponses = await Promise.all(signedUrlPromises);
        const itemsWithUrls = initialItems.map((item, index) => ({
          ...item,
          signedUrl: signedUrlResponses[index].url,
        }));
        setItens(itemsWithUrls);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(`Erro na API: ${err.response?.data?.message || err.message}`);
        } else {
          setError('Ocorreu um erro desconhecido.');
        }
      } finally {
        setCarregando(false);
      }
    };

    loadData();
  }, []);

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
        <h1>Painel de itens</h1>
        <div className='users-container' style={itens.length > 3 ? {overflowY: 'scroll'} : {}}>
          {itens.map(item => (
            <div className='user-card' key={item.id}>
              <div className='user-details'>
                <div className='user-info'>
                  <img src={item.signedUrl}  />
                  <p>Id: {item.id}</p>
                  <p>Type: {item.typeId}</p>
                </div>
                <div className='user-actions'>
                  <button className='delete-btn'>Excluir</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

