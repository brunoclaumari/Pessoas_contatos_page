
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
import CardContatos from './CardContatos';


class Pessoa {
    nome= "";
    email= "";
    contatos= [];
    id = 0;
  }

export default function CardListaContatos( {pessoaId}) {
    const [contatos, setContatos] = useState([]);

    const [open, setOpen] = useState(false);
    const [renderiza, setRenderiza] = useState(false);

    const [contatoAtual,setContatoAtual] = useState({_id:0,  _nome:"",_email:""});


    //1 = sucesso,0 = erro, -1 = warning
    const handleRenderiza = (numero,mensagem) => {
        
        if(numero === 1){  
            fetchContatos();           
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
    setContatoAtual({_id:0,  _nome:"",_email:""});
  };

  

    function fetchContatos() {
        try {
        
            //pessoaId
            Api.get(`api/Pessoa/${pessoaId}`)
            .then((response)=>{
                console.log(response.data)
                setContatos(response.data);                
                //toast.success("Dados de pessoas carregados com sucesso",{position: 'top-center'})
            }).catch((error)=>{
                console.error("Erro ao carregar dados dos :", error);
                toast.error("Falha ao carregar os dados");
            });           

        } catch (error) {
            console.error("Erro ao carregar dados dos :", error);
        }
    }

    useEffect(() => {       

		  fetchContatos();
	}, []);
    

    return (
        //{`${styles.main} ${inter.className}`}
        
        <div className={`${styles.conteinerLista} `} >
            <ToastContainer   limit={1}/* containerId={`lista`} */  position={"top-right"} />
            <h2 style={{textAlign : 'center', paddingTop:'12px' }} >Lista de Contatos</h2>
            <ModalTeste pessoaAtual={contatoAtual} setPessoaAtual={setContatoAtual} 
            handleRenderiza={handleRenderiza} handleClose={handleClose} handleClickOpen={handleClickOpen} open={open} />

            <div className={`${styles.wrapper}`} >                

                {/* <CardPessoa pessoaId={1} /> */}
                    {contatos !==null && contatos.map((item, index)=>{
                        /* return <p key={index}>{item.nome} - {item.email}</p>  */
                        return <CardContatos 
                                    key={index} 
                                    pessoaId = {item.id}
                                    nome = {item.nome}
                                    email = {item.email} 
                                    telefone = {item.telefone}
                                    whatsapp = {item.whatsapp} 
                                    handleRenderiza = {handleRenderiza}   
                                    handleClose={handleClose} handleClickOpen={handleClickOpen} open={open}  
                                    setPessoaAtual={setContatoAtual}                              
                                    />
                    })}
            </div>
        </div>
    );
}