const listaDeAlunos = [
    { nome: "Ana", nota: 5.0 },
    { nome: "Bruno", nota: 10.0 },
    { nome: "Carla", nota: 2.0 },
    { nome: "Andrea", nota: 7.0 },
    { nome: "Marta", nota: 6.0 }
];

console.log("Encontre a aluna Marta e mostra o nome e a média dela.")
const alunaMarta = listaDeAlunos.find(aluno => aluno.nome === "Marta")
console.log(alunaMarta)
console.log(`${alunaMarta.nome} tem média ${alunaMarta.nota}.`)

console.log("Mostre a média geral da turma.")
const MediaGeral = listaDeAlunos.reduce((total, aluno) => total + aluno.media / aluno )
console.log(MediaGeral)
console.log("Mostre o nome e a nota dos alunos com nota abaixo de 7.0.")

console.log("Mostre apenas o nome dos alunos com nota maior ou igual a 7.0.")