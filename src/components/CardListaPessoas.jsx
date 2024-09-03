
import styles from '@/styles/ListaCardPessoa.module.css';

import { useEffect, useState } from "react";
import CardPessoa from './CardPessoa';
import { Api } from '../services/api';
import ModalFormPessoa from './ModalFormPessoa';
import ModalTeste from './ModalTeste';
import { Button, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

class Pessoa {
    nome= "";
    email= "";
    contatos= [];
    id = 0;
  }

export default function CardListaPessoas() {
    const [pessoas, setPessoas] = useState([]);

    const [open, setOpen] = useState(false);
    const [renderiza, setRenderiza] = useState(false);

    const [pessoaAtual,setPessoaAtual] = useState({_id:0,  _nome:"",_email:""});


    //1 = sucesso,0 = erro, -1 = warning
    const handleRenderiza = (numero,mensagem) => {
        
        if(numero === 1){  
            fetchPessoas();           
            toast.success(mensagem);
        }
        else if(numero === 0){
            toast.error(mensagem);
        }
        else if(numero === -1){
            toast.warning(mensagem);
        }  
             
      };  

  const handleClickOpen = () => {
    setOpen(true);  
    
  };

  const handleClose = async () => {

    setOpen(false);  
    setPessoaAtual({_id:0,  _nome:"",_email:""});
  };

  

    function fetchPessoas() {
        try {
        
            //const response = await Api.get("api/Pessoa/semcontatos")
            Api.get("api/Pessoa/semcontatos")
            .then((response)=>{
                console.log(response.data)
                setPessoas(response.data);                
                //toast.success("Dados de pessoas carregados com sucesso",{position: 'top-center'})
            }).catch((error)=>{
                console.error("Erro ao carregar dados dos :", error);
                toast.error("Falha ao carregar os dados");
            });
            
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
        //{`${styles.main} ${inter.className}`}
        
        <div className={`${styles.conteinerLista} `} >
            <ToastContainer   limit={1}/* containerId={`lista`} */  position={"top-right"} />
            <h2 style={{textAlign : 'center', paddingTop:'12px' }} >Lista de Pessoas</h2>
            <ModalTeste pessoaAtual={pessoaAtual} setPessoaAtual={setPessoaAtual}
            handleRenderiza={handleRenderiza} handleClose={handleClose} handleClickOpen={handleClickOpen} open={open} />
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
                                    handleRenderiza = {handleRenderiza}   
                                    handleClose={handleClose} handleClickOpen={handleClickOpen} open={open}  
                                    setPessoaAtual={setPessoaAtual}                              
                                    />
                    })}
            </div>
        </div>
    );
}