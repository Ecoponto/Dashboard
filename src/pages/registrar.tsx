import React from "react";
import './registrar.css';
import { logout } from "../utils/auth";
import api from "../services/api";


export default function Registrar() {

  const [nome , setNome] = React.useState('');
  const [data_de_nascimento , setDataDeNascimento] = React.useState('');
  // const [escolaridade , setEscolaridade] = React.useState('');
  const [email , setEmail] = React.useState('');
  const [telefone , setTelefone] = React.useState('');
  const [senha , setSenha] = React.useState('');

  function randomIntFromInterval(min: number, max: number) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const handleRegistrar = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append("name", nome)
    formData.append("email", email)
    formData.append("password", senha)
    formData.append("phone", telefone)
    formData.append("bornDate", data_de_nascimento)

    try {
      await api.post("/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      setNome('')
      setDataDeNascimento('')
      // setEscolaridade('')
      setEmail('')
      setTelefone('')
      setSenha('')
      alert("Usuário criado com sucesso!")
    } catch {
      alert("Erro ao criar usuário!")
    }
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

      <h1>Registrar Novo Usuário</h1>
      <form onSubmit={handleRegistrar}>
        <input 
          type="text" 
          placeholder="Nome" 
          value={nome} 
          onChange={e => setNome(e.target.value)} 
          required 
        />
        <input 
          type="date" 
          value={data_de_nascimento} 
          onChange={e => setDataDeNascimento(e.target.value)} 
          required 
        />
        {/* <select value={escolaridade} onChange={e => setEscolaridade(e.target.value)} required>
          <option value="">Escolha a escolaridade</option>
          <option value="fundamental_inc">Ensino fundamental incompleto</option>
          <option value="medio_inc">Ensino médio incompleto</option>
          <option value="superior_inc">Ensino superior incompleto</option>
          <option value="fundamental_com">Ensino fundamental completo</option>
          <option value="medio_com">Ensino médio completo</option>
          <option value="superior_com">Ensino superior completo</option>
        </select> */}
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
        />
        <input  
          placeholder="Telefone" 
          value={telefone} 
          onChange={e => setTelefone(e.target.value)} 
          required 
        />
        <input  
          type="password"
          placeholder="Senha" 
          value={senha} 
          onChange={e => setSenha(e.target.value)} 
          required 
        />
        <button type="submit">Registrar</button>
      </form>
    </div>


  )


}