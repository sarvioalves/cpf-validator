import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from "styled-components";


const PesquisaContainer = styled.section`
    background-image: linear-gradient(90deg, #053999 35%, #001625 165%);
    color: #3a3939;
    width: 100%;
    min-height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Titulo = styled.h1`
    color: #fff;
    font-size: 36px;
    text-align: center;
    width: 100%;
`
const Input = styled.input`
    background: #fff;
    border: 1px solid #fff;
    padding: 20px 140px;
    border-radius: 50px;
    width: 200px;
    color: #2b2a2a;
    text-align: center;
    font-size: 16px;
    margin-bottom: 10px;

    &::placeholder {
        color: #474141;
        font-size: 25px;
        text-align: center;
    }
`
const TextResultado = styled.h3`
    color: #fff;
    font-size: 21px;
    text-align: center;
    width: 100%;
`
const Botao = styled.button`
    color: #e4e4e4;
    background: #177c3e;
    border: none;
    padding: 12px 25px;
    border-radius: 25px;
    cursor: pointer;
    font-size: 16px;
    display: flex;
`
const cpfAPI = axios.create({ baseURL: "http://localhost:8000/cpf" })

async function postCPF(cpf) {
  const resposta = await cpfAPI.post('/', { cpf })
  return resposta.data
}

function App() {
  useEffect(() => {
    document.title = "CPF VALIDATOR"
  }, []);

  const [cpf, setCpf] = useState("")

  const [resultado, setResultado] = useState("")

  async function enviarCPF() {
    try {
      const resposta = await postCPF(cpf)
      setResultado(resposta)
    } catch (error) {
      setResultado(error.response?.data || "Erro ao conectar com o servidor")
    }
  }

  return (
    <PesquisaContainer>
      <Titulo>Valide o cpf aqui:</Titulo>
      <Input
        type="text"
        placeholder="Digite seu CPF"
        value={cpf}
        onChange={(event) => setCpf(event.target.value)}
      />
      <Botao onClick={enviarCPF}>
        Validar CPF
      </Botao>

      <TextResultado>{resultado}</TextResultado>
    </PesquisaContainer>
  );
}

export default App;
