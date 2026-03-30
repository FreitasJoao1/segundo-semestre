import './style.css'
import { useState } from 'react'

function InfoCurso() {
    const [nome, setNome] = useState("Programação de aplicativos")
    const [cargaHoraria, setCargaHoraria] = useState(90)
    const [local, setlocal] = useState("Senai")

    return (
        <div className="info-curso">
            <h2>Dados do Curso</h2>
            <p>Nome: {nome}</p>
            <p>Carga Horária: {cargaHoraria} horas</p>
            <p>Local: {local}</p>
        </div>
    )
}

