// Exemplo com vetor de nomes
const listaDeNomes = ["Ana", "Maria", "Joana"]

// Exemplo com vetor de números
const listaDeNumeros = [1, 2, 3, 4, 5]

// Vetor de objetos com dados de nome e idade.
// Um objeto carrega dados como uma classe.
const listaDeUsuarios = [
    {nome: "Ana", idade: 25},
    {nome: "Maria", idade: 35},
    {nome: "Joana", idade: 45},
    {nome: "José", idade: 15},
    {nome: "silvana", idade: 17},
]

// Percorrendo e exibindo os elementos do vetor.
console.log("Exibindo todos os usuários do vetor.")
listaDeUsuarios.forEach( usuario => {
    console.log(`${usuario.nome} tem ${usuario.idade} anos.`)
    
})
for (let i = 0; i < listaDeUsuarios.length; i++) {
     console.log(`${listaDeUsuarios[i].nome} tem ${listaDeUsuarios[i].idade} anos.`)
 }


console.log("\nFiltrando maiores de 18 anos: ")
const maioridade = listaDeUsuarios.filter(usuario => usuario.idade >= 18)
// use {} caso precise de mais de uma linha.
// Nesse caso não precisa, por isso não vamos usar. 
maioridade.forEach( usuario => 
    console.log(`${usuario.nome} tem ${usuario.idade} anos.`)
)


console.log("\nFiltrando menores de 18 anos: ")
const menoridade = listaDeUsuarios.filter(usuario => usuario.idade < 18)
menoridade.forEach( usuario =>
    console.log(`${usuario.nome} tem ${usuario.idade} anos.`)
)


console.log("\nNa lista de números, filtre e mostre os números pares: ")
const numerospares = listaDeNumeros.filter(n => n % 2 === 0)
numerospares.forEach(n => console.log(n))


console.log("\n Na lista de nomes, mostre todos os nomes com forEach: ")
listaDeNomes.forEach(nome => console.log(nome))