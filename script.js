// 1. Seleciona os elementos que vamos usar
const botaoAdicionar = document.getElementById('btnAdicionar');
const campoTexto = document.getElementById('novoAprovado');
const lista = document.getElementById('listaAprovados');

// 2. Cria uma função para adicionar o nome na lista numerada
botaoAdicionar.addEventListener('click', function() {
    // Pega o valor digitado no input
    const nome = campoTexto.value;

    // Verificamos se o campo não está vazio
    if (nome.trim() !== "") {
        // Cria um novo elemento <li> (item de lista)
        const novoItem = document.createElement('li');
        
        // Colocamos o nome dentro desse novo <li>
        novoItem.textContent = nome;

        // Adicionamos o novo <li> dentro da nossa lista <ol>
        lista.appendChild(novoItem);

        // Limpamos o campo de texto e voltamos o foco para ele
        campoTexto.value = "";
        campoTexto.focus();
    } else {
        alert("Por favor, digite um nome!");
    }
});