// Função comum no Javascript

function somar(a, b) {
    return a + b
}   

function subtrair(a, b) {
    return a - b
} 
function multiplicar(a, b) {
    return a * b
}
function dividir(a, b) {
    if (b === 0 ) {
        console.log("Não é possível dividir por zero")
        return null
    } 
    else {
        return a / b
    }
}

const soma = somar(2, 3)
const subtracao = subtrair(2, 3)
const multiplicacao = multiplicar(2, 3)
const divisao = dividir(2, 3)

console.log("Soma: ", soma)
console.log("Subtração: ", subtracao)   
console.log("Multiplicação: ", multiplicacao)
console.log("Divisão: ", divisao)