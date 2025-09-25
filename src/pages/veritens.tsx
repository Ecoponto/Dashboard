import { useEffect, useState } from 'react';
import './home.css'
import { logout } from '../utils/auth';
import api from '../services/api';
import axios from 'axios';
import { url } from 'inspector';
import { LoadingScreen } from '../components/LoadingScreen';

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

  const deleteItem = (id: string) => {
    const confirmar = window.confirm("Tem certeza que deseja excluir este item?");
    if (!confirmar) return
    
    api.delete(`/itens/${id}`)
      .then(response => {
        setItens(itens.filter(itens => itens.id !== id));
      })
      .catch(error => {
        console.error('Erro ao buscar usuários:', error);
    });
  }

  if (carregando) {
    return <LoadingScreen /> 
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
        <div className='side-menu-links'>
          <a href='/ver-itens'>
            <span className='menu-text'>Visualizar itens</span>
          </a>
        </div>
        <button onClick={logout}>Sair</button>
      </div>

      <div className='main-container'>
        <h1>Painel de itens</h1>
        <div className='users-container'>
          {itens.map(item => (
            <div className='user-card' key={item.id}>
              <div className='user-details'>
                <div className='user-info'>
                  <img src={`https://ecotank.hirameki.me/objects/${item.imageUrl}`}  style={{width:150, height:150}}/>
                  <p>Id: {item.id}</p>
                  <p>Tipo: {item.typeId}</p>
                </div>
                <div className='user-actions'>
                  <button className='delete-btn' onClick={() => deleteItem(item.id)}>Excluir</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

