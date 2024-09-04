import { Api } from "@/services/api";
import styles from "@/styles/CardContato.module.css";
import { Person } from "@mui/icons-material";
import { Button, IconButton, DeleteIcon, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import { FaEdit, FaTrash } from 'react-icons/fa';


/* import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"; */



export default function CardContatos({ 
  contatoId, nome, email, telefone,whatsapp, pessoaId,
  handleRenderiza, handleClose, handleClickOpen, open, setContatoAtual  }) {  

  const idToast = `pes${contatoId}`;
  //console.log(`toast: ${idToast}`);

    const router = useRouter();
    function handleVerContato(){
        router.push(`/${contatoId}/contatos`);
    } 
    
    function handleEdit(){
      setContatoAtual( 
        { 
          _id: contatoId, 
          _nome: nome, 
          _email: email, 
          _telefone:telefone, 
          _whatsapp:whatsapp, 
          _pessoaId:pessoaId
        } 
      );
      
      handleClickOpen();
    }

    function handleSubmit(){
      console.log("fez o submit")
    }

    async function handleDelete(){
      
      let confirmacaoUsuario = confirm(`Você tem certeza de que deseja deletar o contato ${nome}?`);
  
      if(confirmacaoUsuario){
        try {
        
          const response = await Api.delete(`api/Contato/${contatoId}`);
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

    <div className={styles.card_div} /* onSubmit={handleSubmit} */ >
      
      <div style={{display:'flex',alignItems:'center'}} >        
      <Person sx={{ fontSize: 50,marginRight:'6px' }}/>
        <div style={{fontSize:'16px', lineHeight:'10px'}} >
            <input type="hidden" value={contatoId}/>
            <p><b>Nome:</b> {nome??'Fulano de tal'}</p>
            <p><b>Email</b>: {email??'fulano@fulano.com'}</p>
            <p><b>Telefone</b>: {telefone??'(11) 99999-9999'}</p>
            <p><b>Whatsapp</b>: {whatsapp??'(11) 98888-8888'}</p>
        </div>
      </div>
      <div style={ { display:'flex', justifyContent:'flex-end', alignContent:'flex-end'} } >
        <div>  
          <Tooltip title="Editar">
            <IconButton onClick={handleEdit}>
              <FaEdit className={styles.edit_icon} size={36}   style={{ cursor: 'pointer' }}  />              
            </IconButton>
          </Tooltip>
          <Tooltip title="Excluir">
            <IconButton onClick={handleDelete}>
              <FaTrash  className={styles.delete_icon}  size={36}  style={{ cursor: 'pointer' }} />
            </IconButton>
          </Tooltip>            
        </div>      
        
      </div>
    </div>
    </>
  );
}
