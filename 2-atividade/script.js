function calcularTudo() {
    // 1. Pegar os elementos do HTML
    const campo1 = document.getElementById('n1');
    const campo2 = document.getElementById('n2');
    const divResultado = document.getElementById('resultadoTabuada');

    // 2. Transformar o texto dos inputs em números reais
    let num1 = parseFloat(campo1.value);
    let num2 = parseFloat(campo2.value);

    // 3. Limpar o que estava escrito antes
    divResultado.innerHTML = "";

    // 4. Verificar se os dois campos foram preenchidos
    if (isNaN(num1) || isNaN(num2)) {
        divResultado.innerHTML = "<p style='color: #ffde00;'>Preencha os dois números, mizerê!</p>";
        return;
    }

    // 5. Realizar as Operações
    let soma = num1 + num2;
    let media = (num1 + num2) / 2;
    let produto = num1 * num2;
    let maior = Math.max(num1, num2);
    let menor = Math.min(num1, num2);

    // 6. Criar o HTML para mostrar na tela
    divResultado.innerHTML = `
        <h2 style="color: #ffd700;">Resultados:</h2>
        <div class="stats">
            <p><strong>Soma:</strong> ${soma}</p>
            <p><strong>Média:</strong> ${media.toFixed(2)}</p>
            <p><strong>Produto (Multiplicação):</strong> ${produto}</p>
            <p><strong>Maior Número:</strong> ${maior}</p>
            <p><strong>Menor Número:</strong> ${menor}</p>
        </div>
    `;
}

// 7. Configurar o botão para rodar a função ao clicar
document.getElementById('gerarBtn').addEventListener('click', calcularTudo);

// 8. Efeito do mouse no fundo (o que você já tinha)
document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    document.body.style.setProperty('--mouse-x', `${x}%`);
    document.body.style.setProperty('--mouse-y', `${y}%`);
});