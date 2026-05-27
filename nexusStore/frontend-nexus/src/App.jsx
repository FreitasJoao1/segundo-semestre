import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000';

export default function App() {
  const [abaAtiva, setAbaAtiva] = useState('dashboard');
  
  const [produtos, setProdutos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);

  const buscarTodosDados = async () => {
    try {
      const resProd = await fetch(`${API_URL}/produtos`);
      if (resProd.ok) setProdutos(await resProd.json());

      const resCli = await fetch(`${API_URL}/clientes`);
      if (resCli.ok) setClientes(await resCli.json());

      const resFunc = await fetch(`${API_URL}/funcionarios`);
      if (resFunc.ok) setFuncionarios(await resFunc.json());
    } catch (erro) {
      console.error("Erro ao conectar com o backend:", erro);
    }
  };

  useEffect(() => {
    buscarTodosDados();
  }, []);

  // Cadastros (POST)
  const cadastrarProduto = async (e) => {
    e.preventDefault();
    const form = e.target;
    const novo = {
      nome: form.nome.value,
      preco: parseFloat(form.preco.value),
      quantidade: parseInt(form.quantidade.value),
      lote: form.lote.value
    };
    await fetch(`${API_URL}/produtos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novo)
    });
    form.reset();
    buscarTodosDados();
  };

  const cadastrarCliente = async (e) => {
    e.preventDefault();
    const form = e.target;
    const novo = {
      nome: form.nome.value,
      cpf: form.cpf.value,
      email: form.email.value
    };
    await fetch(`${API_URL}/clientes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novo)
    });
    form.reset();
    buscarTodosDados();
  };

  const cadastrarFuncionario = async (e) => {
    e.preventDefault();
    const form = e.target;
    const novo = {
      nome: form.nome.value,
      cargo: form.cargo.value,
      salario: parseFloat(form.salario.value)
    };
    await fetch(`${API_URL}/funcionarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novo)
    });
    form.reset();
    buscarTodosDados();
  };

  // Exclusão (DELETE)
  const deletarItem = async (rota, id) => {
    if (confirm("Tem certeza que deseja excluir permanentemente?")) {
      await fetch(`${API_URL}/${rota}/${id}`, { method: 'DELETE' });
      buscarTodosDados();
    }
  };

  // Cálculos do Dashboard
  const totalItensEstoque = produtos.reduce((acc, item) => acc + (item.quantidade || 0), 0);
  
  // Regra de Negócio do Gráfico: Pega os 5 produtos com maior estoque
  const topProdutosGrafico = [...produtos]
    .sort((a, b) => (b.quantidade || 0) - (a.quantidade || 0))
    .slice(0, 5);

  // Encontra o maior valor para calibrar o tamanho máximo das barras do gráfico
  const maiorQuantidade = Math.max(...topProdutosGrafico.map(p => p.quantidade || 0), 10);

  return (
    <div className="app-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo-container">
          <h1>NEXUS STORE</h1>
        </div>
        <ul className="nav-menu">
          <li className={`nav-item ${abaAtiva === 'dashboard' ? 'active' : ''}`} onClick={() => setAbaAtiva('dashboard')}>📊 Dashboard</li>
          <li className={`nav-item ${abaAtiva === 'produtos' ? 'active' : ''}`} onClick={() => setAbaAtiva('produtos')}>📦 Produtos</li>
          <li className={`nav-item ${abaAtiva === 'clientes' ? 'active' : ''}`} onClick={() => setAbaAtiva('clientes')}>👥 Clientes</li>
          <li className={`nav-item ${abaAtiva === 'funcionarios' ? 'active' : ''}`} onClick={() => setAbaAtiva('funcionarios')}>💼 Funcionários</li>
        </ul>
      </aside>

      {/* CONTEÚDO */}
      <main className="main-content">
        
        {/* INDICADORES SUPERIORES */}
        <div className="kpi-grid">
          <div className="kpi-card">
            <div>
              <h3>Total no Estoque</h3>
              <p className="kpi-numero">{totalItensEstoque} un.</p>
            </div>
            <div className="kpi-icon">📦</div>
          </div>
          <div className="kpi-card">
            <div>
              <h3>Clientes Base</h3>
              <p className="kpi-numero">{clientes.length}</p>
            </div>
            <div className="kpi-icon">🤝</div>
          </div>
          <div className="kpi-card">
            <div>
              <h3>Quadro de Equipe</h3>
              <p className="kpi-numero">{funcionarios.length}</p>
            </div>
            <div className="kpi-icon">💼</div>
          </div>
        </div>

        {/* ABA: DASHBOARD PRINCIPAL */}
        {abaAtiva === 'dashboard' && (
          <div className="dashboard-grid">
            
            {/* CARD DO GRÁFICO */}
            <div className="painel">
              <h2>📊 Top 5 Produtos com Maior Estoque</h2>
              {topProdutosGrafico.length === 0 ? (
                <p style={{ color: '#7a8b9b', textAlign: 'center', padding: '40px' }}>Nenhum produto cadastrado para exibir no gráfico.</p>
              ) : (
                <div className="chart-container">
                  <svg width="100%" height="280" viewBox="0 0 600 280">
                    <defs>
                      <linearGradient id="laranjaGradiente" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#F78D1E" />
                        <stop offset="100%" stopColor="#ff6a00" />
                      </linearGradient>
                      <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#ff6a00" floodOpacity="0.3"/>
                      </filter>
                    </defs>

                    {topProdutosGrafico.map((prod, index) => {
                      const yPos = 20 + index * 52;
                      const larguraBarra = ((prod.quantidade || 0) / maiorQuantidade) * 400;

                      return (
                        <g key={prod.id}>
                          <text x="10" y={yPos + 16} fill="#2a3b4c" fontWeight="600" fontSize="13">
                            {prod.nome.length > 15 ? prod.nome.substring(0, 13) + '..' : prod.nome}
                          </text>

                          <rect x="130" y={yPos} width="400" height="22" rx="4" fill="#f1f3f5" />

                          <rect 
                            x="130" 
                            y={yPos} 
                            width={larguraBarra > 0 ? larguraBarra : 5} 
                            height="22" 
                            rx="4" 
                            fill="url(#laranjaGradiente)" 
                            filter="url(#neonGlow)"
                            style={{ transition: 'width 0.8s ease-out' }}
                          />

                          <text x={140 + larguraBarra} y={yPos + 16} fill="#ff6a00" fontWeight="bold" fontSize="13">
                            {prod.quantidade} un.
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              )}
            </div>

            {/* CARD DE AUDITORIA */}
            <div className="painel">
              <h2>🔍 Auditoria Rápida</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ padding: '10px', borderBottom: '1px solid #f1f3f5' }}>
                  <span style={{ display: 'block', color: '#7a8b9b', fontSize: '0.85rem' }}>Status do Servidor</span>
                  <strong style={{ color: '#00e622' }}>● Online (Porta 3000)</strong>
                </div>
                <div style={{ padding: '10px', borderBottom: '1px solid #f1f3f5' }}>
                  <span style={{ display: 'block', color: '#7a8b9b', fontSize: '0.85rem' }}>Variedade de Itens</span>
                  <strong>{produtos.length} categorias</strong>
                </div>
                <div style={{ padding: '10px' }}>
                  <span style={{ display: 'block', color: '#7a8b9b', fontSize: '0.85rem' }}>Operador Ativo</span>
                  <strong>Administrador Nexus</strong>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ABA: PRODUTOS */}
        {abaAtiva === 'produtos' && (
          <>
            <div className="painel">
              <h2>➕ Cadastrar Produto</h2>
              <form onSubmit={cadastrarProduto}>
                <div className="form-grid">
                  <div className="form-grupo"><label>Nome</label><input type="text" name="nome" required /></div>
                  <div className="form-grupo"><label>Preço</label><input type="number" step="0.01" name="preco" required /></div>
                  <div className="form-grupo"><label>Quantidade</label><input type="number" name="quantidade" required /></div>
                  <div className="form-grupo"><label>Lote</label><input type="text" name="lote" required /></div>
                </div>
                <button type="submit" className="btn-adicionar">SALVAR PRODUTO</button>
              </form>
            </div>
            <div className="painel">
              <h2>📦 Estoque Disponível</h2>
              <div className="tabela-container">
                <table>
                  <thead>
                    <tr><th>ID</th><th>Nome</th><th>Lote</th><th>Qtd</th><th>Preço</th><th>Ações</th></tr>
                  </thead>
                  <tbody>
                    {produtos.map(p => (
                      <tr key={p.id}>
                        <td>#{p.id}</td>
                        <td style={{ fontWeight: 'bold', color: 'var(--laranja-lucid)' }}>{p.nome}</td>
                        <td>{p.lote}</td>
                        <td>{p.quantidade} un.</td>
                        <td>R$ {parseFloat(p.preco).toFixed(2)}</td>
                        <td><button className="btn-deletar" onClick={() => deletarItem('produtos', p.id)}>Excluir</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ABA: CLIENTES */}
        {abaAtiva === 'clientes' && (
          <>
            <div className="painel">
              <h2>➕ Cadastrar Cliente</h2>
              <form onSubmit={cadastrarCliente}>
                <div className="form-grid">
                  <div className="form-grupo"><label>Nome Completo</label><input type="text" name="nome" required /></div>
                  <div className="form-grupo"><label>CPF</label><input type="text" name="cpf" placeholder="000.000.000-00" required /></div>
                  <div className="form-grupo" style={{ gridColumn: 'span 2' }}><label>E-mail</label><input type="email" name="email" required /></div>
                </div>
                <button type="submit" className="btn-adicionar">SALVAR CLIENTE</button>
              </form>
            </div>
            <div className="painel">
              <h2>👥 Clientes Registrados</h2>
              <div className="tabela-container">
                <table>
                  <thead>
                    <tr><th>ID</th><th>Nome</th><th>CPF</th><th>E-mail</th><th>Ações</th></tr>
                  </thead>
                  <tbody>
                    {clientes.map(c => (
                      <tr key={c.id}>
                        <td>#{c.id}</td>
                        <td>{c.nome}</td>
                        <td>{c.cpf}</td>
                        <td>{c.email}</td>
                        <td><button className="btn-deletar" onClick={() => deletarItem('clientes', c.id)}>Excluir</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ABA: FUNCIONÁRIOS */}
        {abaAtiva === 'funcionarios' && (
          <>
            <div className="painel">
              <h2>➕ Registrar Funcionário</h2>
              <form onSubmit={cadastrarFuncionario}>
                <div className="form-grid">
                  <div className="form-grupo"><label>Nome</label><input type="text" name="nome" required /></div>
                  <div className="form-grupo"><label>Cargo</label><input type="text" name="cargo" required /></div>
                  <div className="form-grupo" style={{ gridColumn: 'span 2' }}><label>Salário (R$)</label><input type="number" step="0.01" name="salario" required /></div>
                </div>
                <button type="submit" className="btn-adicionar">REGISTRAR NA EQUIPE</button>
              </form>
            </div>
            <div className="painel">
              <h2>💼 Quadro de Colaboradores</h2>
              <div className="tabela-container">
                <table>
                  <thead>
                    <tr><th>ID</th><th>Nome</th><th>Cargo</th><th>Salário</th><th>Ações</th></tr>
                  </thead>
                  <tbody>
                    {funcionarios.map(f => (
                      <tr key={f.id}>
                        <td>#{f.id}</td>
                        <td>{f.nome}</td>
                        <td>{f.cargo}</td>
                        <td>R$ {parseFloat(f.salario).toFixed(2)}</td>
                        <td><button className="btn-deletar" onClick={() => deletarItem('funcionarios', f.id)}>Excluir</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

      </main>
    </div>
  );
}