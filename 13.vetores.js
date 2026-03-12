// Vetores. 
const listaDeNomes = ["Marta", "José", "Maria"]

console.log("Exibindo todos os elementos: ")
console.log(listaDeNomes) 

console.log("\nExibindo o primeiro elemento: ")
console.log(listaDeNomes[0])

console.log("\nAdicionado um elemento: ")
listaDeNomes.push("Marília")
console.log(listaDeNomes) 

console.log("\nAdicionado um elemento: ")
listaDeNomes.push("Everaldo")
console.log(listaDeNomes) 

// A partir do índice 2, remover 1 elemento.
console.log("\nRemovendo um elemento: ")
listaDeNomes.splice(2,1)
console.log(listaDeNomes)

console.log("\nRemovendo o segundo elemento: ")
listaDeNomes.splice(1,1)
console.log(listaDeNomes)