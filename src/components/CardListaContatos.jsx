

import { useEffect, useState } from "react";
import CardPessoa from './CardPessoa';
import { Api } from '../services/api';
import ModalFormPessoa from './ModalFormPessoaNaoo';

import { Button, IconButton, TextField, Tooltip } from '@mui/material';
import { Add } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import CardContatos from './CardContatos';
import { IoArrowBackCircleSharp } from 'react-icons/io5';
import ModalFormContato from './ModalFormContato';
import { useRouter } from "next/router";
import styles from '@/styles/ListaCardContatos.module.css';

import stylesHome from '@/styles/Home.module.css';



class Pessoa {
    nome= "";
    email= "";
    contatos= [];
    id = 0;
  }

export default function CardListaContatos( { pessoaId }) {

    const pessoaIdUltima = "pessoaIdUltima";
    const router = useRouter();

    const [idPessoa, setIdPessoa] = useState(pessoaId);
    const [nomePessoa, setNomePessoa] = useState("");
    const [emailPessoa, setEmailPessoa] = useState("");

    const [contatos, setContatos] = useState([]);

    const [open, setOpen] = useState(false);
    const [renderiza, setRenderiza] = useState(false);

    const [contatoAtual,setContatoAtual] = useState({ _id:0,  _nome:"",_email:"", _telefone:"",_whatsapp:"", _pessoaId:pessoaId } );


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
    setContatoAtual({ _id:0,  _nome:"",_email:"", _telefone:"",_whatsapp:"", _pessoaId:pessoaId } );
  };  

    async function fetchContatos() {
        try {
        
            /*
            {
                "nome": "Maria Santana teste",
                "email": "mariasanta@gmail.com",
                "contatos": [],
                "id": 1
            }            
            */
            let idPes = router.query.pessoaId ? router.query.pessoaId : localStorage.getItem(pessoaIdUltima);
            await Api.get(`api/Pessoa/${idPes}`) //busca uma pessoa e todos os seus contatos
            .then((response)=>{
                console.log(response.data)
                setNomePessoa(response.data.nome);
                setEmailPessoa(response.data.email);
                setContatos(response.data.contatos);                
                //toast.success("Dados de pessoas carregados com sucesso",{position: 'top-center'})
            }).catch((error)=>{
                console.error("Erro ao carregar dados dos :", error);
                //toast.error("Falha ao carregar os dados");
            }); 
            if(router.query.pessoaId){
                  
            }                    

        } catch (error) {
            console.error("Erro ao carregar dados dos :", error);
        }
    }

    function paginaAnterior(){
        router.back()
    }

    useEffect(() => {  
        
        if(router.query.pessoaId){
            localStorage.setItem(pessoaIdUltima, router.query.pessoaId);
        }
        
        setIdPessoa(router.query.pessoaId);
		fetchContatos();
	}, []);
    

    return (
        <>
        <div style={{ display:'flex', justifyContent:'center'}} >
            <h1 style={{ width:'70%', borderRadius:'20px', backgroundColor:'lawngreen'}}
            className={ stylesHome.tituloGeralCentro} >Contatos</h1>
        </div>
        
        <div className={`${styles.conteinerLista} `} >
            <ToastContainer   limit={1}/* containerId={`lista`} */  position={"top-right"} />

            <div className={styles.subtitulo} >
                <h2 style={{textAlign: 'center',  padding:'6px', backgroundColor:'lawngreen', width:'60%' 
                }} >{nomePessoa}</h2>
            </div>
            <div className={`${styles.voltar} `} style={{                
                display:'flex',  
                flexDirection:'row',                  
                alignItems:'center',
                alignContent:'center',
                justifyContent:'space-between'                                           
                
                }} >
                <Tooltip title="Voltar para Pessoas" >
                    <IconButton onClick={paginaAnterior} >
                        <IoArrowBackCircleSharp color="green" size={40} style={{ cursor: 'pointer' }}  />
                    </IconButton>                    
                </Tooltip>
                <div style={{alignItems:'center', justifyContent:'center'}} >
                <ModalFormContato contatoAtual={contatoAtual} /* setPessoaAtual={setContatoAtual}  */
                handleRenderiza={handleRenderiza} handleClose={handleClose} handleClickOpen={handleClickOpen} open={open} />
                </div>
                
                <IconButton>
                    <IoArrowBackCircleSharp  size={40} color="transparent"/>
                </IconButton>                    
            </div>
            
            <div className={`${styles.wrapper}`} > 
                    {contatos.map((item, index)=>{
                        
                        return <CardContatos 
                                    key={index} 
                                    contatoId = {item.id}
                                    nome = {item.nome}
                                    email = {item.email} 
                                    telefone = {item.telefone}
                                    whatsapp = {item.whatsapp}
                                    pessoaId = {pessoaId} 
                                    handleRenderiza = {handleRenderiza}   
                                    handleClose={handleClose} handleClickOpen={handleClickOpen} open={open}  
                                    setContatoAtual={setContatoAtual}                              
                                    />
                    })}
            </div>
        </div>
        </>
    );
}