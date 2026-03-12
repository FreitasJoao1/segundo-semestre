// NOVOS recursos es6.

// vetor números
const listaDeNumeros = [1, 2, 3, 4, 5]

console.log("Exibindo Números do vetor:")
console.log(listaDeNumeros)

console.log("\nMultiplicando números do vetor:") 
const dobrados = listaDeNumeros.map(n => n* 2)
console.log(dobrados)

// filtrar números pares
console.log("\nFiltrar Números pares do vetor:")
const pares = listaDeNumeros.filter(n => n % 2 == 0)
console.log(pares)

//filtrar números impares
console.log("\nFiltrar Números impares do vetor:")
const impares = listaDeNumeros.filter(n => n % 2 !== 0)
console.log(impares) 

// somar dos numeros
console.log("\nSomando todos os números do vetor: ")
const soma = listaDeNumeros.reduce((soma, atual) => soma + atual , 0 )
console.log(soma)