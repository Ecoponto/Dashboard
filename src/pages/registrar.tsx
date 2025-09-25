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
      setEmail('')
      setTelefone('')
      setSenha('')
      alert("Usuário criado com sucesso!")
    } catch {
      alert("Erro ao criar usuário!")
    }
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

        <h1>Registrar Novo Usuário</h1>
        <form onSubmit={handleRegistrar}>
          <input 
            type="text" 
            placeholder="Nome" 
            value={nome} 
            onChange={e => setNome(e.target.value)} 
            required 
          />
          <div style={{display: "flex", gap: "20px", flexDirection:'row'}}>
            <input 
              style={{width:"50%"}}
              type="date" 
              value={data_de_nascimento} 
              onChange={e => setDataDeNascimento(e.target.value)} 
              required 
            />
            <input  
              style={{width:"50%"}}
              placeholder="Telefone" 
              value={telefone} 
              onChange={e => setTelefone(e.target.value)} 
              required 
            />
          </div>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
          />
          <input  
            type="password"
            placeholder="Senha" 
            value={senha} 
            onChange={e => setSenha(e.target.value)} 
            required 
          />
          <button className='button-add' type="submit">Registrar</button>
        </form>
      </div>
    </div>


  )
}