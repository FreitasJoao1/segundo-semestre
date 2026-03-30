import "./style.css"


function InfoAluno() {

    const nome = "João Silva";
    const idade = 23;
    const curso = "Engenharia de Software";


    return (
        <div className="info-aluno">
            <h1>Informações do Aluno</h1>
            <p>Nome: {nome}</p>
            <p>Idade: {idade}</p>
            <p>Curso: {curso}</p>

        </div>
    )
}

export default InfoAluno