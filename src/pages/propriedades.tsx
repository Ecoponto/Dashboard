import { useEffect, useState } from 'react';
import api from '../services/api';
import { logout } from '../utils/auth';

type Propriedade = {
  id: string;
  name: string;
  description: string;
  parentTypeId: string;
  subtypeId: null;
  deepth: number
}


export default function Propriedades() {
  const [propriedades, setPropriedades] = useState<Propriedade[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [descricaoPropriedade, setDescricaoPropriedade] = useState('');
  const [nomePropriedade, setNomePropriedade] = useState('');
  const [outraPropriedade, setOutraPropriedade] = useState('');
  const [nullable, setNullable] = useState(Boolean);

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


  const handleDelete = (id: string) => {
    api.delete(`/types/${id}`)
      .then(() => {
        setPropriedades(propriedades.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error('Erro ao excluir subtipo:', error);
      });
  }
  
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (outraPropriedade == ""){
      setNullable(true)
    }
    console.log({
      name: nomePropriedade,
      description: descricaoPropriedade,
      parentTypeId: nullable ? null : outraPropriedade 
    })
    api.post('/types', {
      name: nomePropriedade,
      description: descricaoPropriedade,
      parentTypeId: nullable ? null : outraPropriedade
    })
    .then(response => {
      setPropriedades([...propriedades, response.data]);
      setDescricaoPropriedade('');
      setNomePropriedade('');
      setOutraPropriedade('');
    })
    .catch(error => {
      alert('Erro ao adicionar subtipo:');
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
        <h1>Painel de propriedades</h1>
        <div className='top-panel'>
          <div className='teste'>
            <form onSubmit={handleAdd}>
              <input 
                type="text" 
                placeholder="Nome" 
                value={nomePropriedade} 
                onChange={(text) => setNomePropriedade(text.target.value)}
                required
              />
              <input 
                type="text" 
                placeholder="Descrição" 
                value={descricaoPropriedade} 
                onChange={(text) => setDescricaoPropriedade(text.target.value)}
                required
              />
              <label>Agrupar com outra propriedade</label>
              <select 
                value={outraPropriedade} 
                onChange={(text) => setOutraPropriedade(text.target.value)}
              >
                <option value="">Nenhuma</option>
                {propriedades.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <input className='button-add' type="submit" value="Adicionar" />
            </form>
          </div>
        </div>

        <div className='users-container'>
          {propriedades.map(usuario => (
            <div className='user-card' key={usuario.id}>
              <div className='user-details'>
                <div className='user-info'>
                  <h4>{usuario.name}</h4>
                  <p>Descrição: {usuario.description}</p>
                </div>
                <div className='user-actions'>
                  <button className='info-btn'>Info</button>
                  <button className='delete-btn' onClick={() => handleDelete(usuario.id)}>Remover</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
)
};

