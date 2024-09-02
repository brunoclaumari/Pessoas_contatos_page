
import styles from '@/styles/ListaCardPessoa.module.css';
import { Api } from '@/pages/services/api';
import { useEffect, useState } from "react";
import CardPessoa from './CardPessoa';

class Pessoa {
    nome= "";
    email= "";
    contatos= [];
    id = 0;
  }

export default function CardListaPessoas() {
    const [pessoas, setPessoas] = useState([]);

    async function fetchPessoas() {
        try {
        const response = await Api.get("api/Pessoa/semcontatos");
        console.log(response.data)
        setPessoas(response.data);
        /* setEducadorSocial(response.data.educador);
        setPsicólogos(response.data.psicologo); */
        } catch (error) {
        console.error("Erro ao carregar dados dos :", error);
        }
    }

    useEffect(() => {   

		 fetchPessoas();
	}, []);

    return (
        <div className={styles.conteinerLista} >
            
            <h2 style={{textAlign : 'center', paddingTop:'12px' }} >Lista de Pessoas</h2>
            <CardPessoa/>
            <div>
                {pessoas.map((item, index)=>{
                    return <p key={index}>{item.nome} - {item.email}</p> 
                })}
            </div>
        </div>
    );
}