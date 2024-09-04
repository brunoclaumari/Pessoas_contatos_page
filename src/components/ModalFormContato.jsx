import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Add } from "@mui/icons-material";
import { Api } from "@/services/api";
//import { toast } from 'react-toastify';
//import "react-toastify/dist/ReactToastify.css";

export default function ModalFormContato({ handleRenderiza, handleClose, handleClickOpen, open, contatoAtual }) {
  /* const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }; */ 
  const [nomeAtual, setNomeAtual] = React.useState("");
  const [emailAtual, setEmailAtual] = React.useState("");
  const [telefoneAtual, setTelefoneAtual] = React.useState("");
  const [whatsappAtual, setWhatsappAtual] = React.useState("");



  React.useEffect(()=>{
    setNomeAtual(contatoAtual._nome);
    setEmailAtual(contatoAtual._email); 
    setTelefoneAtual(contatoAtual._telefone); 
    setWhatsappAtual(contatoAtual._whatsapp); 
  },[open]) 

  async function handleSalva() {//
    const obj = {
      id:contatoAtual._id, //valor não muda aqui
      nome: nomeAtual,
      email: emailAtual,
      telefone:telefoneAtual,
      whatsapp:whatsappAtual,
      pessoaId:contatoAtual._pessoaId //valor não muda aqui
             
    }
    console.log(`obj: ${obj}`);
    let acao = contatoAtual._id <= 0?"salvo":"alterado";
    
    if(contatoAtual._id <= 0){
      //Cria novo
      await salvaNovoContato(obj, acao);
    }
    else {
      //Altera
      await alteraContato(obj, acao);
    } 
  }

  async function salvaNovoContato(obj,acao){
    await Api.post("api/Contato",obj)
        .then((response)=>{
          console.log(response.data);
          let mensagem = `O contato ${obj.nome} foi ${acao} com sucesso!!`;
          console.log(mensagem);
          handleRenderiza(1, mensagem);

        }).catch((error)=>{
          if (error.response){
            const msgErro = error.response.data?.erros[0];
            console.log("Erro :", error.response?.data?.erros);          
            handleRenderiza(0, msgErro);  
          } 

        });
  }


  
  async function alteraContato(obj,acao){    

    await Api.put(`api/Contato/${contatoAtual._id}`,obj)
        .then((response)=>{
          console.log(response.data);
          let mensagem = `O contato ${obj.nome} foi ${acao} com sucesso!!`;
          handleRenderiza(1, mensagem);
        }).catch((error)=>{
          if (error.response){
            const msgErro = error.response.data?.erros[0];
            console.log("Erro :", error.response?.data?.erros);          
            handleRenderiza(0, msgErro);  
          }
        });
  }

  

  return (
    <>

      {/* <ToastContainer limit={1} containerId={"modal1"} position={"top-right"} /> */}
      <div style={{ textAlign: "center", paddingTop: "12px" }}>
        <Button onClick={handleClickOpen} variant="contained" endIcon={<Add />}>
          Inserir novo contato
        </Button>
      </div>
      <br />

      <Dialog
        open={open}
        /* onClose={handleClose} */
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
/*             const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const nome = formJson.nome;
            const email = formJson.email; */
            //handleSalva(nome, email);
            handleSalva();
            console.log(`Nome: ${nome} | Email: ${email}`);
            handleClose();            
          },
        }}
      >
        <DialogTitle>{contatoAtual._id <=0?'Cadastro':'Alteração'} de Contato </DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            required
            margin="dense"
            id="nome"
            name="nome"
            label="Nome"
            value={nomeAtual}
            onChange={(e) => setNomeAtual(e.target.value)}
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus  required  margin="dense"
            id="email" name="email" label="Email" type="email"
            value={emailAtual}
            onChange={(e) => setEmailAtual(e.target.value)}
            fullWidth variant="outlined"
          />

          <TextField
            autoFocus  required  margin="dense"
            id="telefone" name="telefone" label="Telefone" type="text"
            value={telefoneAtual}
            onChange={(e) => setTelefoneAtual(e.target.value)}
            fullWidth variant="outlined" 
            //defaultValue={`(11) 98888-9999`}
            placeholder="(11) 98888-9999"
          />

          <TextField
            autoFocus  margin="dense"
            id="whatsapp" name="whatsapp" label="Whatsapp" type="text"
            placeholder="(11) 99999-8888"
            value={whatsappAtual}
            onChange={(e) => setWhatsappAtual(e.target.value)}
            fullWidth variant="outlined" 
            //defaultValue={`(11) 99999-8888`}
          />
          
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit">Salvar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
