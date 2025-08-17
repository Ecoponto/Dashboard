import { useEffect, useState } from 'react';
import api from '../services/api';
import './propriedades.css';
import { logout } from '../utils/auth';

type SubTipo = {
    idSubtype: string;
    nameSubtype: string;
    descriptionSubtype: string;
}


export default function Propriedades() {
  const [subtipos, setSubtipos] = useState<SubTipo[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [descricaoPropriedade, setDescricaoPropriedade] = useState('');
  const [tipoDaPropriedade, setTipoDaPropriedade] = useState('');

  useEffect(() => {
    api.get('/subtypes')
      .then(response => {
        setSubtipos(response.data);
        setCarregando(false);
      })
      .catch(error => {
        console.error('Erro ao buscar subtipos:', error);
        setCarregando(false);
      });
  }, [])


  const handleDelete = (id: string) => {
    api.delete(`/subtypes/${id}`)
      .then(() => {
        setSubtipos(subtipos.filter(item => item.idSubtype !== id));
      })
      .catch(error => {
        console.error('Erro ao excluir subtipo:', error);
      });
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()

    api.post('/subtypes', {
      nameSubtype: tipoDaPropriedade,
      descriptionSubtype: descricaoPropriedade
    })
    .then(response => {
      setSubtipos([...subtipos, response.data]);
      setDescricaoPropriedade('');
      setTipoDaPropriedade('');
    })
    .catch(error => {
      console.error('Erro ao adicionar subtipo:', error);
    });
  }

  if (carregando) {
    return <div>Carregando...</div>  
  }

  return (
    <div>
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

      <div className="form-wrapper">
        <form onSubmit={handleAdd}>
          <p>Adicionar nova propriedade</p>
          <input 
            type="text" 
            placeholder="Descrição" 
            value={descricaoPropriedade} 
            onChange={(text) => setDescricaoPropriedade(text.target.value)}
          />

          <select 
            value={tipoDaPropriedade} 
            onChange={(text) => setTipoDaPropriedade(text.target.value)}
          >
            <option value="Marca">Marca</option>
            <option value="Material">Material</option>
            <option value="Cor">Cor</option>
            <option value="Tamanho">Tamanho</option>
            <option value="Estado">Estado</option>
          </select>
          <input type="submit" value="Adicionar" />
        </form>
      </div>

      <h1>Lista de Propriedades</h1>
      <div className="propriedades-container">
        {subtipos.map(item => ( 
          <div className="propriedade-card" key={item.idSubtype}>
            <h2>{item.nameSubtype}</h2>
            <p>Descrição: {item.descriptionSubtype}</p>
            <button onClick={() => handleDelete(item.idSubtype)}>Excluir</button>
          </div>
        ))}
      </div>
    </div>
  );
};

