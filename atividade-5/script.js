document.getElementById('calcularBtn').addEventListener('click', calcularTotal);

function calcularTotal() {
    // Pegamos a quantidade e garantimos que é um número inteiro (parseInt)
    var inputQtd = document.getElementById('quantidade').value;
    var quantidade = parseInt(inputQtd);
    var resultado = document.getElementById('resultado');

    // Validação de erro
    if (isNaN(quantidade) || quantidade < 0) {
        resultado.style.display = 'block';
        resultado.style.color = '#ff9999';
        resultado.innerHTML = "❌ Por favor, digite uma quantidade válida.";
        return; // Para a execução
    }

    // Lógica de Preços
    let precoPorMaca = 0;
    
    if (quantidade < 12) {
        precoPorMaca = 1.30;
    } else {
        precoPorMaca = 1.00;
    }

    // Cálculo do total
    let valorTotal = quantidade * precoPorMaca;

    // Formatar para moeda brasileira (R$)
    let valorFormatado = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    // Exibir o resultado
    resultado.style.display = 'block';
    resultado.style.color = '#ffffff'; // Volta para a cor normal

    if (quantidade >= 12) {
        resultado.innerHTML = `🍎 Você comprou <b>${quantidade}</b> maçãs.<br>Preço de atacado aplicado!<br><span style="color:#a8e6cf; font-size:1.2em;">Total: ${valorFormatado}</span>`;
    } else {
        resultado.innerHTML = `🍎 Você comprou <b>${quantidade}</b> maçãs.<br><span style="color:#ffd3b6; font-size:1.2em;">Total: ${valorFormatado}</span>`;
    }
}