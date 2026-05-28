import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000';

export default function App() {
  const [abaAtiva, setAbaAtiva] = useState('dashboard');
  
  const [produtos, setProdutos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);

  // BUSCAR DADOS (ATUALIZAÇÃO AO VIVO)
  const buscarTodosDados = async () => {
    try {
      const resProd = await fetch(`${API_URL}/produtos`);
      if (resProd.ok) setProdutos(await resProd.json());

      const resCli = await fetch(`${API_URL}/clientes`);
      if (resCli.ok) setClientes(await resCli.json());

      const resFunc = await fetch(`${API_URL}/Funcionários`);
      if (resFunc.ok) setFuncionarios(await resFunc.json());
    } catch (erro) {
      console.error("Erro ao conectar com o backend:", erro);
    }
  };

  // Carrega tudo assim que abre o site
  useEffect(() => {
    buscarTodosDados();
  }, []);

  // CADASTRO DE PRODUTO
  const cadastrarProduto = async (e) => {
    e.preventDefault();
    const form = e.target;
    const novo = {
      nome: form.nome.value,
      lote: form.lote.value,
      quantidade: parseInt(form.quantidade.value),
      preco: parseFloat(form.preco.value)
    };
    
    try {
      const resposta = await fetch(`${API_URL}/produtos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novo)
      });

      if (resposta.ok) {
        alert("✅ Produto cadastrado com sucesso!");
        form.reset();
        buscarTodosDados(); // Atualiza a tabela na mesma hora
      } else {
        alert("❌ Erro ao cadastrar. Verifique se o Lote já não está cadastrado!");
      }
    } catch (erro) {
      alert("❌ Erro de comunicação com o servidor.");
    }
  };

  // CADASTRO DE CLIENTE
  const cadastrarCliente = async (e) => {
    e.preventDefault();
    const form = e.target;
    const novo = {
      nome: form.nome.value,
      email: form.email.value,
      telefone: form.telefone.value,
      cpf: form.cpf.value
    };
    
    try {
      const resposta = await fetch(`${API_URL}/clientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novo)
      });

      if (resposta.ok) {
        alert("✅ Cliente cadastrado com sucesso!");
        form.reset();
        buscarTodosDados();
      } else {
        alert("❌ Erro! Este CPF ou E-mail já pode estar cadastrado no banco.");
      }
    } catch (erro) {
      alert("❌ Erro de comunicação com o servidor.");
    }
  };

  // CADASTRO DE FUNCIONÁRIO
  const cadastrarFuncionario = async (e) => {
    e.preventDefault();
    const form = e.target;
    const novo = {
      nome: form.nome.value,
      email: form.email.value,
      telefone: form.telefone.value,
      cargo: form.cargo.value,
      setor: form.setor.value
    };
    
    try {
      const resposta = await fetch(`${API_URL}/Funcionários`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novo)
      });

      if (resposta.ok) {
        alert("✅ Funcionário registrado com sucesso!");
        form.reset();
        buscarTodosDados();
      } else {
        alert("❌ Erro! Verifique se os dados (E-mail) não estão duplicados no banco de dados.");
      }
    } catch (erro) {
      alert("❌ Erro de comunicação com o servidor.");
    }
  };

  // EXCLUSÃO
  const deletarItem = async (rota, id) => {
    if (confirm("Tem certeza que deseja excluir permanentemente?")) {
      await fetch(`${API_URL}/${rota}/${id}`, { method: 'DELETE' });
      buscarTodosDados();
    }
  };

  // CÁLCULOS DO DASHBOARD
  const totalItensEstoque = produtos.reduce((acc, item) => acc + (item.quantidade || 0), 0);
  const topProdutosGrafico = [...produtos]
    .sort((a, b) => (b.quantidade || 0) - (a.quantidade || 0))
    .slice(0, 5);
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
            <div className="painel">
              <h2>📊 Top 5 Produtos com Maior Estoque</h2>
              {topProdutosGrafico.length === 0 ? (
                <p style={{ color: '#7a8b9b', textAlign: 'center', padding: '40px' }}>Nenhum produto cadastrado.</p>
              ) : (
                <div className="chart-container">
                  <ul>
                    {topProdutosGrafico.map(p => (
                       <li key={p.id} style={{marginBottom: '10px'}}>
                          <strong>{p.nome}</strong>: {p.quantidade} unidades
                       </li>
                    ))}
                  </ul>
                </div>
              )}
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
                  <div className="form-grupo"><label>Preço (R$)</label><input type="number" step="0.01" name="preco" required /></div>
                  <div className="form-grupo"><label>Quantidade</label><input type="number" name="quantidade" required /></div>
                  <div className="form-grupo"><label>Lote (Único)</label><input type="text" name="lote" required /></div>
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
                        <td style={{ fontWeight: 'bold' }}>{p.nome}</td>
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
                  <div className="form-grupo"><label>CPF (Único)</label><input type="text" name="cpf" required /></div>
                  <div className="form-grupo"><label>E-mail (Único)</label><input type="email" name="email" required /></div>
                  <div className="form-grupo"><label>Telefone</label><input type="text" name="telefone" required /></div>
                </div>
                <button type="submit" className="btn-adicionar">SALVAR CLIENTE</button>
              </form>
            </div>
            <div className="painel">
              <h2>👥 Clientes Registrados</h2>
              <div className="tabela-container">
                <table>
                  <thead>
                    <tr><th>ID</th><th>Nome</th><th>CPF</th><th>E-mail</th><th>Telefone</th><th>Ações</th></tr>
                  </thead>
                  <tbody>
                    {clientes.map(c => (
                      <tr key={c.id}>
                        <td>#{c.id}</td>
                        <td>{c.nome}</td>
                        <td>{c.cpf}</td>
                        <td>{c.email}</td>
                        <td>{c.telefone}</td>
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
                  <div className="form-grupo"><label>Nome Completo</label><input type="text" name="nome" required /></div>
                  <div className="form-grupo"><label>E-mail (Único)</label><input type="email" name="email" required /></div>
                  <div className="form-grupo"><label>Telefone</label><input type="text" name="telefone" required /></div>
                  <div className="form-grupo"><label>Cargo</label><input type="text" name="cargo" required /></div>
                  
                  {/* CAMPO DE SETOR EM LISTA */}
                  <div className="form-grupo" style={{ gridColumn: 'span 2' }}>
                    <label>Setor</label>
                    <select name="setor" required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}>
                      <option value="">Selecione um setor...</option>
                      <option value="Frente de Loja / Caixa">Frente de Loja / Caixa</option>
                      <option value="Estoque / Reposição">Estoque / Reposição</option>
                      <option value="Açougue">Açougue</option>
                      <option value="Padaria / Confeitaria">Padaria / Confeitaria</option>
                      <option value="Hortifruti">Hortifruti</option>
                      <option value="Frios e Laticínios">Frios e Laticínios</option>
                      <option value="Prevenção de Perdas">Prevenção de Perdas</option>
                      <option value="Administrativo / RH">Administrativo / RH</option>
                      <option value="Limpeza">Limpeza</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn-adicionar">REGISTRAR NA EQUIPE</button>
              </form>
            </div>
            <div className="painel">
              <h2>💼 Quadro de Colaboradores</h2>
              <div className="tabela-container">
                <table>
                  <thead>
                    <tr><th>ID</th><th>Nome</th><th>E-mail</th><th>Telefone</th><th>Cargo</th><th>Setor</th><th>Ações</th></tr>
                  </thead>
                  <tbody>
                    {funcionarios.map(f => (
                      <tr key={f.id}>
                        <td>#{f.id}</td>
                        <td>{f.nome}</td>
                        <td>{f.email}</td>
                        <td>{f.telefone}</td>
                        <td>{f.cargo}</td>
                        <td>{f.setor}</td>
                        <td><button className="btn-deletar" onClick={() => deletarItem('Funcionários', f.id)}>Excluir</button></td>
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