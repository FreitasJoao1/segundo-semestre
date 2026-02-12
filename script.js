const botaoAdicionar = document.getElementById('btnAdicionar');
const campoTexto = document.getElementById('novoAprovado');
const lista = document.getElementById('listaAprovados');

botaoAdicionar.addEventListener('click', function() {
    const nome = campoTexto.value;

    if (nome.trim() !== "") {
        const novoItem = document.createElement('li');

        novoItem.textContent = nome;

        lista.appendChild(novoItem);

        campoTexto.value = "";
        campoTexto.focus();
    } else {
        alert("Por favor, digite um nome!");
    }
})