function gerarTabuada() {
    const numeroInput = document.getElementById('numeroInput');
    let numero = parseInt(numeroInput.value);


    // ELEMENTO do HTML onde o resultado será exibido
    const resultadoDiv = document.getElementById("ResultadoTabuada");
    resultadoDiv.innerHTML="";




// Verificar se a entrada é um número válido

if (isNaN(numero) || numero === null || numero === "") {
    resultadoDiv.innerHTML = "<p>Por favor, digite um número válido.</p>"
    return; // Este comando sai da função.
}

    // Adicionar título para a tabuada.
    resultadoDiv.innerHTML += `<h2>Tabuada do número ${numero}</h2>`;

    // Laço de repetição para gerar tabuada.
    for (let i = 1; i <= 10; i++) {
        let resultado = numero * i;
        resultadoDiv.innerHTML += `<p>${numero} x ${i} = ${resultado}</p>`;
    }
}

const botaoGerar = document.getElementById("gerarBtn");
botaoGerar.addEventListener("click", gerarTabuada);

// Adiciona o efeito interativo do mouse no fundo
document.body.addEventListener('mousemove', e => {
    // Calcula a posição do mouse em porcentagem da tela
    const x = e.clientX / window.innerWidth * 100;
    const y = e.clientY / window.innerHeight * 100;
    
    // Atualiza as variáveis CSS no body
    document.body.style.setProperty('--mouse-x', `${x}%`);
    document.body.style.setProperty('--mouse-y', `${y}%`);
});