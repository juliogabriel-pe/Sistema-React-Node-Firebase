import React, { useEffect, useState } from "react";
import api from "../src/Services/api";
import "./Style/style.css"

export default function Lista() {
    const [list, setList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("list");
                setList(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };

        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="lista">
            <h2>Lista de Usuários</h2>
            <div className="paiList">
                {list.map((user) => (
                    <div key={user.id}>
                        <h3 className="itens">ID: {user.id}</h3>
                        <h3 className="itens">Nome: {user.Nome}</h3>
                        <h3 className="itens">CNPJ: {user.CNPJ}</h3>
                        <h3 className="itens">Endereço: {user.Endereco}</h3>
                        <h3 className="itens">Número: {user.Numero}</h3>
                        <h3 className="itens">Bairro: {user.Bairro}</h3>
                        <h3 className="itens">Cidade: {user.Cidade}</h3>
                        <h3 className="itens">Estado: {user.Estado}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}
