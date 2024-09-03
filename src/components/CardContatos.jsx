import { Api } from "@/services/api";
import styles from "@/styles/CardPessoa.module.css";
import { Person } from "@mui/icons-material";
import { Button, IconButton, DeleteIcon } from "@mui/material";
import { useRouter } from "next/router";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { FcContacts } from "react-icons/fc";
import ModalTeste from "./ModalTeste";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";



export default function CardContatos({ 
  pessoaId, nome, email, telefone,whatsapp,
  handleRenderiza, handleClose, handleClickOpen, open,setPessoaAtual  }) {

  

  const idToast = `pes${pessoaId}`;
  //console.log(`toast: ${idToast}`);

    const router = useRouter();
    function handleVerContato(){
        router.push(`/${pessoaId}/contatos`);
    } 
    
    function handleEdit(){
      setPessoaAtual( { _id: pessoaId, _nome: nome, _email: email} );
      handleClickOpen();
    }

    function handleSubmit(){
      console.log("fez o submit")
    }

    async function handleDelete(){
      
      let confirmacaoUsuario = confirm(`Você tem certeza de que deseja deletar a pessoa ${nome}?`);
  
      if(confirmacaoUsuario){
        try {
        
          const response = await Api.delete(`api/Pessoa/${pessoaId}`);
          let mensagem = `Pessoa ${nome} foi excluído com sucesso`;
          console.log(mensagem);         
          
          handleRenderiza(1, mensagem);
          
        } catch (error) {
          let msgErro = error.response?.data?.erros[0];
          handleRenderiza(0,msgErro);
        }
      }
      else{
        let mensagem = "Usuário não confirmou a exclusão";
        console.log(mensagem);
        handleRenderiza(-1, mensagem);
        //toast.warning(mensagem);
      }
    }
  

  return (
    <>
{/*     <ModalTeste 
    handleRenderiza={handleRenderiza} handleClose={handleClose} 
    handleClickOpen={handleClickOpen} open={open} alteracao
    /> */}
    {/* <ToastContainer limit={1} containerId={idToast} position={"top-right"} /> */}
    <div className={styles.card_div} /* onSubmit={handleSubmit} */ >
      
      <div style={{display:'flex',alignItems:'center'}} >
        <Person sx={{ fontSize: 70,marginRight:'6px' }}/>
        <div>
            <input type="hidden" value={pessoaId}/>
            <p><b>Nome:</b> {nome??'Fulano de tal'}</p>
            <p><b>Email</b>: {email??'fulano@fulano.com'}</p>
        </div>
      </div>
      <div style={ { display:'flex', justifyContent:'space-between'} } >
        {/* <Button onClick={handleVerContato} variant="outlined">Ver contatos</Button>   */}
        <FcContacts size={36} onClick={handleVerContato} style={{ cursor: 'pointer' }} />
        <div>
            {/* <Button  variant="contained">Editar Pessoa</Button> delete-icon */}  

            <FaEdit className={styles.edit_icon} size={36} onClick={handleEdit}  style={{ cursor: 'pointer' }}  />
            <FaTrash  className={styles.delete_icon}  size={36} onClick={handleDelete} style={{ cursor: 'pointer' }} />
            
        </div>      

      </div>
    </div>
    </>
  );
}
