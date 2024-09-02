
import styles from '@/styles/ListaCardPessoa.module.css';

import { useEffect, useState } from "react";
import CardPessoa from './CardPessoa';
import { Api } from '../services/api';
import ModalFormPessoa from './ModalFormPessoa';
import ModalTeste from './ModalTeste';
import { Button, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';

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

    async function handleSalvaPessoa(){

    }

    return (
        //{`${styles.main} ${inter.className}`}
        <div className={`${styles.conteinerLista} `} >
            
            <h2 style={{textAlign : 'center', paddingTop:'12px' }} >Lista de Pessoas</h2>
            <ModalTeste/> 
            {/* <div>
                <TextField
                autoFocus
                required
                margin="dense"
                id="nome" name="nome" label="Nome" type="text"
                fullWidth
                size='80%'
                variant="outlined"
            />
                <TextField
                autoFocus  required  margin="dense"
                id="email"  name="email"  label="Email"
                type="email"
                fullWidth
                variant="outlined"
            />
            <Button onClick={handleSalvaPessoa}  variant="contained" endIcon={<Add />}>
                Inserir nova pessoa
            </Button>
            </div> */}
            <div className={`${styles.wrapper}`} >                

                {/* <CardPessoa pessoaId={1} /> */}
                    {pessoas.map((item, index)=>{
                        /* return <p key={index}>{item.nome} - {item.email}</p>  */
                        return <CardPessoa 
                                    key={index} 
                                    pessoaId = {item.id}
                                    nome = {item.nome}
                                    email = {item.email}
                                    />
                    })}
            </div>
        </div>
    );
}