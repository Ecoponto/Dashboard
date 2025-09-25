import { useEffect, useState } from 'react';
import api from '../services/api';
import './propriedades.css';
import { logout } from '../utils/auth';
import axios from 'axios';
import { LoadingScreen } from '../components/LoadingScreen';

type Propriedade = {
  id: string;
  name: string;
  description: string;
  parentTypeId: string;
  subtypeId: null;
  deepth: number
}

export default function ItemForm() {
  const [propriedades, setPropriedades] = useState<Propriedade[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [outraPropriedade, setOutraPropriedade] = useState('');
  const disabled = !file || !outraPropriedade

  useEffect(() => {
    api.get('/types')
      .then(response => {
        setPropriedades(response.data);
        setCarregando(false);
      })
      .catch(error => {
        console.error('Erro ao buscar subtipos:', error);
        setCarregando(false);
      });
  }, [])

  function resolvePropery(id: string) {
    if (id) {
      api.get(`/types/resolve/${id}`)
        .then(response => {
          if (response.data.parent) {
            alert(`Agrupado com: ${response.data.parent.name}`)
          }
          else {
            alert("Agrupado com: Nenhum")
          }
        })
    }
    else {
      console.error("Erro inesperado!")
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  };

  const handleAddProperty = async (id: string) => {
    if (outraPropriedade === id){
      setOutraPropriedade('')
    }
    else {
      setOutraPropriedade(id)
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const formData = new FormData()
    if (file && outraPropriedade) {
      formData.append("type", outraPropriedade)
      formData.append("trashId", "7cf116da-1748-49a4-af0a-215f0801b317")
      formData.append("image", file)
    }
    try {
      api.post("/itens", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        setOutraPropriedade('')
        alert("Objeto criado com sucesso!")
      } catch {
        alert("Erro ao criar objeto!")
      }
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
        <h1>Painel de Objetos</h1>
        <div className='top-panel'>
          <div className='teste'>
            <form onSubmit={handleAdd}>
              <input type='file' onChange={handleFileChange} />
              <input className={'button-add'} type="submit" value="Adicionar" disabled={disabled}/>
            </form>
          </div>
        </div>
   
        <h2>Escolha a propriedade:</h2>
        <div className='users-container'>
          {propriedades.map(item => (
            <div className={`user-card ${outraPropriedade === item.id ? "selected" : ""}`} key={item.id}>
              <div className='user-details'>
                <div className='user-info'>
                  <h4>{item.name}</h4>
                  <p>Descrição: {item.description}</p>
                </div>
                <div className='user-actions'>
                  <button className='info-btn' onClick={() => resolvePropery(item.id)}>Ver agrupamento</button>
                  <button className='info-btn' onClick={() => handleAddProperty(item.id)}>Escolher</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

