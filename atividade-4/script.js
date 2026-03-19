// Corrigido: Apontando para a ID correta 'verificarBtn'
document.getElementById('verificarBtn').addEventListener('click', verificaridade);

function verificaridade() {
    var idadeInput = document.getElementById('i1');
    var idade = parseInt(idadeInput.value);
    var resultado = document.getElementById('resultado'); 
    var buttonContainer = document.querySelector('.button-container'); // Para os emojis laterais

    // Reset de estado
    resultado.innerHTML = "";
    buttonContainer.classList.remove('justice-active'); // Esconde os emojis laterais anteriores

    // Validação
    if (isNaN(idade)) {
        resultado.innerHTML = "Por favor, digite uma idade válida.";
        return; // Para a execução
    }

    if (idade < 0) {
        resultado.innerHTML = "Idade inválida.";
        return; // Para a execução
    }

    // Lógica Original (com pequenas correções de fluxo e ortografia)
    let mensagem = "";
    
    if (idade < 16) {
        mensagem = "🧑‍⚖️ Menores de 16 anos não podem votar.";
    } else if (idade >= 16 && idade < 18) {
        mensagem = "🧑‍⚖️ O voto é opcional para pessoas entre 16 e 17 anos.";
    } else if (idade >= 18 && idade < 65) {
        // Correção: Adicionei a mensagem para idade obrigatória que faltava
        mensagem = "🧑‍⚖️ Você tem idade para votar. O voto é obrigatório.";
    } else if (idade >= 65) {
        mensagem = "🧑‍⚖️ O voto é opcional para pessoas com 65 anos ou mais.";
    }

    // Mostra o resultado final
    resultado.innerHTML = mensagem;
    buttonContainer.classList.add('justice-active'); // Mostra os emojis laterais
}