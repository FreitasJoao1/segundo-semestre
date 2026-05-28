const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize('nexus_store', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

function registrarMudanca(acao, tabela, dados) {
    const caminhoArquivo = path.join(__dirname, 'historico.txt');
    const dataHora = new Date().toLocaleString('pt-BR');
    
    const linhaLog = `[${dataHora}] - AÇÃO: ${acao} | TABELA: ${tabela} | DADOS: ${JSON.stringify(dados)}\n`;

    fs.appendFile(caminhoArquivo, linhaLog, (err) => {
        if (err) console.error('Erro ao escrever no arquivo de histórico:', err);
    });
}

const Cliente = sequelize.define('Cliente', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});
const Funcionarios = sequelize.define('Funcionários', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cargo: {
        type: DataTypes.STRING,
        allowNull: false
     
    },
    setor: {
        type: DataTypes.STRING,
        allowNull: false
       
    }
});

const Produtos = sequelize.define('Produtos', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lote: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    preco: {
        type: DataTypes.FLOAT, 
        allowNull: false
    }
}); 

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

app.get('/clientes', async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar clientes' });
    }
});

app.get('/Funcionários', async (req, res) => {
    try {
        const listaFuncionarios = await Funcionarios.findAll(); 
        res.json(listaFuncionarios);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar Funcionários' });
    }
});

app.get('/produtos', async (req, res) => {
    try {
        const todosProdutos = await Produtos.findAll();
        res.json(todosProdutos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
});

app.get('/clientes/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        if (cliente) res.json(cliente);
        else res.status(404).json({ error: 'Cliente não encontrado' });
    } catch (error) { res.status(500).json({ error: 'Erro ao buscar cliente' }); }
});

app.get('/Funcionários/:id', async (req, res) => {
    try {
        const funcionario = await Funcionarios.findByPk(req.params.id);
        if (funcionario) res.json(funcionario);
        else res.status(404).json({ error: 'Funcionário não encontrado' });
    } catch (error) { res.status(500).json({ error: 'Erro ao buscar funcionário' }); }
});

app.get('/produtos/:id', async (req, res) => {
    try {
        const produto = await Produtos.findByPk(req.params.id);
        if (produto) res.json(produto);
        else res.status(404).json({ error: 'Produto não encontrado' });
    } catch (error) { res.status(500).json({ error: 'Erro ao buscar produto' }); }
});

app.post('/clientes', async (req, res) => {
    const { nome, email, telefone, cpf } = req.body;
    try {
        const novoCliente = await Cliente.create({ nome, email, telefone, cpf });
        registrarMudanca('ADICIONADO', 'Clientes', novoCliente);
        res.status(201).json(novoCliente);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar cliente' });
    }
});

app.post('/Funcionários', async (req, res) => {
    const { nome, email, telefone, cargo, setor } = req.body;
    try {
        const novoFuncionario = await Funcionarios.create({ nome, email, telefone, setor, cargo });
        registrarMudanca('ADICIONADO', 'Funcionários', novoFuncionario);
        res.status(201).json(novoFuncionario);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar funcionário' });
    }
});

app.post('/produtos', async (req, res) => {
    const { nome, lote, quantidade, preco } = req.body;
    try {
        const novoProduto = await Produtos.create({ nome, lote, quantidade, preco });
        registrarMudanca('ADICIONADO', 'Produtos', novoProduto);
        res.status(201).json(novoProduto);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar produto' });
    }
});

app.put('/clientes/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
        
        await cliente.update(req.body);
        registrarMudanca('EDITADO', 'Clientes', { id: req.params.id, modificacoes: req.body });
        res.json(cliente);
    } catch (error) { res.status(500).json({ error: 'Erro ao atualizar cliente' }); }
});

app.put('/Funcionários/:id', async (req, res) => {
    try {
        const funcionario = await Funcionarios.findByPk(req.params.id);
        if (!funcionario) return res.status(404).json({ error: 'Funcionário não encontrado' });
        
        await funcionario.update(req.body);
        registrarMudanca('EDITADO', 'Funcionários', { id: req.params.id, modificacoes: req.body });
        res.json(funcionario);
    } catch (error) { res.status(500).json({ error: 'Erro ao atualizar funcionário' }); }
});

app.put('/produtos/:id', async (req, res) => {
    try {
        const produto = await Produtos.findByPk(req.params.id);
        if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });
        
        await produto.update(req.body);
        registrarMudanca('EDITADO', 'Produtos', { id: req.params.id, modificacoes: req.body });
        res.json(produto);
    } catch (error) { res.status(500).json({ error: 'Erro ao atualizar produto' }); }
});

app.delete('/clientes/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
        
        const dadosAntigos = { id: cliente.id, nome: cliente.nome, cpf: cliente.cpf };
        await cliente.destroy();
        registrarMudanca('DELETADO', 'Clientes', dadosAntigos);
        res.json({ message: 'Cliente deletado' });
    } catch (error) { res.status(500).json({ error: 'Erro ao deletar cliente' }); }
});

app.delete('/Funcionários/:id', async (req, res) => {
    try {
        const funcionario = await Funcionarios.findByPk(req.params.id);
        if (!funcionario) return res.status(404).json({ error: 'Funcionário não encontrado' });
        
        const dadosAntigos = { id: funcionario.id, nome: funcionario.nome, cargo: funcionario.cargo };
        await funcionario.destroy();
        registrarMudanca('DELETADO', 'Funcionários', dadosAntigos);
        res.json({ message: 'Funcionário deletado' });
    } catch (error) { res.status(500).json({ error: 'Erro ao deletar funcionário' }); }
});

app.delete('/produtos/:id', async (req, res) => {
    try {
        const produto = await Produtos.findByPk(req.params.id);
        if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });
        
        const dadosAntigos = { id: produto.id, nome: produto.nome, lote: produto.lote };
        await produto.destroy();
        registrarMudanca('DELETADO', 'Produtos', dadosAntigos);
        res.json({ message: 'Produto deletado' });
    } catch (error) { res.status(500).json({ error: 'Erro ao deletar produto' }); }
});

sequelize.sync({ alter: true }).then(() => {
    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
        console.log('Banco de dados sincronizado com sucesso!');
    });
}).catch(error => {
    console.error('Erro ao conectar com o banco de dados:', error);
});