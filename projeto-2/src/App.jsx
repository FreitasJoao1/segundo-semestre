import { useState } from 'react'
import './App.css'

function App() {
  const [pagina, setPagina] = useState('home'); 
  const [nome, setNome] = useState('');
  const [time, setTime] = useState('Bahia');

  const itens = ["Camisa", "Meias", "Shorts", "Casacos"];
  const isBahia = time === 'Bahia';
  const frase = isBahia ? "BBMP! " : "BORA AVANTE LEÃO! ";

  const confirmar = () => {
    if (nome.trim() !== "") {
      setPagina('time');
    } else {
      alert("Por favor, digite seu nome primeiro.");
    }
  };

  if (pagina === 'home') {
    return (
      <div className="home-wrapper">
        <div className="bg-image-container"></div> {/* Espaço para sua imagem de fundo */}
        
        <div className="home-container">
          <div className="card-login-premium">
            <div className="card-header">
              <h1>Arena Ba-Vi</h1>
              <p>Escolha seu lado na história</p>
            </div>

            <div className="input-group">
              <div className="field">
                <input 
                  type="text" 
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                <label>Nome do Torcedor</label>
              </div>

              <div className="field">
                <select value={time} onChange={(e) => setTime(e.target.value)}>
                  <option value="Bahia">Esporte Clube Bahia</option>
                  <option value="Vitoria">Esporte Clube Vitória</option>
                </select>
                <label className="select-label">Seu Time do Coração</label>
              </div>
            </div>

            <button className="btn-entrar" onClick={confirmar}>
              <span>ENTRAR NO ESTÁDIO</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // TELA DO TIME (Continua a mesma lógica, mas agora com o novo CSS)
  return (
    <div className={`time-page ${isBahia ? 'tema-bahia' : 'tema-vitoria'}`}>
      <div className="bg-animado">
        <div className="marquee">
          <span>{Array(10).fill(frase).join(' ')}</span>
        </div>
      </div>

      <div className="conteudo">
        <button className="btn-voltar" onClick={() => setPagina('home')}>← Sair</button>
        <h2>Bem-vindo, {nome}!</h2>
        <div className="escudo-container">
          <div className="escudo">
            {isBahia ? "🔵🔴⚪" : "🔴⚫"}
            <h3>{time.toUpperCase()}</h3>
          </div>
        </div>
        <div className="grid-quadrados">
          {itens.map((item) => (
            <div key={item} className="quadrado">{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;