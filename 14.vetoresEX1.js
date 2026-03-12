// Exercício.

// Crie um vrtor com nome de seus familiares. 
// Com 6 nomes.

// Use todos os comandos vistos em Vetores Após criar a listas 

const listaDeNomes = ["Silvo", "José", "Maria", "Maitê", "Natali",] 

console.log("Exibindo todos os elementos: ")
console.log(listaDeNomes) 

console.log("\nExibindo o primeiro elemento: ")
console.log(listaDeNomes[0])

console.log("\nExibindo o segundo elemento: ")
console.log(listaDeNomes[1])

console.log("\nExibindo o terceiro elemento: ")
console.log(listaDeNomes[2])

console.log("\nExibindo o quarto elemento: ")
console.log(listaDeNomes[3])

console.log("\nExibindo o quinta elemento: ")
console.log(listaDeNomes[4])

console.log("\nAdicionado um elemento: ")
listaDeNomes.push("Patrick")
console.log(listaDeNomes) 


// A partir do índice 2, remover 1 elemento.
console.log("\nRemovendo um elemento: ")
listaDeNomes.splice(2,1)
console.log(listaDeNomes)

console.log("\nRemovendo o segundo elemento: ")
listaDeNomes.splice(1,1)
console.log(listaDeNomes) 