// Selecionando o botão para adicionar o evento de clique
document.getElementById('gerarBtn').addEventListener('click', calcularMedia);

function calcularMedia() {
    const campo1 = document.getElementById('n1');
    const campo2 = document.getElementById('n2');
    const campo3 = document.getElementById('n3');
    const divresultado = document.getElementById('resultado');

    let n1 = parseFloat(campo1.value);
    let n2 = parseFloat(campo2.value);
    let n3 = parseFloat(campo3.value);

    divresultado.innerHTML = '';

    if (isNaN(n1) || isNaN(n2) || isNaN(n3)) {
        divresultado.innerHTML = 'Por favor, preencha todos os campos com números válidos.';
        return; // Para a execução se os campos estiverem vazios
    }

    // --- NOVIDADE: Efeito de Explosão e Dinheiro ---
    efeitoDinheiro();

    // --- NOVIDADE: Temporizador de 3 segundos com estilo de polícia ---
    let segundos = 3;
    divresultado.className = "police-flash"; // Aplica o CSS de cores piscantes
    
    const intervalo = setInterval(() => {
        divresultado.innerHTML = `CALCULANDO ROTA DE FUGA: ${segundos}s`;
        segundos--;

        if (segundos < 0) {
            clearInterval(intervalo);
            divresultado.className = ""; // Remove o efeito de piscar para mostrar o resultado final

            // --- SEU CÁLCULO ORIGINAL MANTIDO ---
            let soma = n1 + n2 + n3;
            let media = soma / 3;
            divresultado.innerHTML = `A média é: ${media.toFixed(2)}`;
            
            if (media >= 7) {
                divresultado.innerHTML += '<br>💰 Parabéns, o assalto foi um sucesso! (Aprovado)';
            } else {
                divresultado.innerHTML += '<br>🚔 A casa caiu! Você foi preso. (Reprovado)';
            }
        }
    }, 1000);
}

// Função auxiliar para criar a chuva de dinheiro sem sujar sua função principal
function efeitoDinheiro() {
    for (let i = 0; i < 40; i++) {
        const money = document.createElement('div');
        money.innerHTML = Math.random() > 0.5 ? '💵' : '💰';
        money.style.position = 'fixed';
        money.style.left = Math.random() * 100 + 'vw';
        money.style.top = '-50px';
        money.style.fontSize = '24px';
        money.style.zIndex = '1000';
        money.style.transition = `transform ${Math.random() * 2 + 1}s linear, opacity 2s`;
        
        document.body.appendChild(money);

        // Animação simples de queda
        setTimeout(() => {
            money.style.transform = `translateY(110vh) rotate(${Math.random() * 360}deg)`;
            money.style.opacity = '0';
        }, 100);

        // Remove do HTML após a queda
        setTimeout(() => money.remove(), 3000);
    }
}