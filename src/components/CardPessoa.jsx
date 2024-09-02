import styles from "@/styles/CardPessoa.module.css";
import { Person } from "@mui/icons-material";
import { Button, IconButton, DeleteIcon } from "@mui/material";
import { useRouter } from "next/router";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { FcContacts } from "react-icons/fc";



export default function CardPessoa(props) {

    const router = useRouter();
    function handleVerContato(){
        router.push(`/${props.pessoaId}/contatos`);
    }

    function handleEdit(){}
    function handleDelete(){}

  return (
    <>
    <div className={styles.card_div}>
      
      <div style={{display:'flex',alignItems:'center'}} >
        <Person sx={{ fontSize: 70,marginRight:'6px' }}/>
        <div>
            <input type="hidden" value={props.id}/>
            <p><b>Nome:</b> {props.nome??'Fulano de tal'}</p>
            <p><b>Email</b>: {props.email??'fulano@fulano.com'}</p>
        </div>
      </div>
      <div style={ { display:'flex', justifyContent:'space-between'} } >
        {/* <Button onClick={handleVerContato} variant="outlined">Ver contatos</Button>   */}
        <FcContacts size={36} onClick={handleVerContato} />
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
