import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Add } from "@mui/icons-material";
import { Alert } from "@mui/material";
import { Api } from "@/services/api";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function ModalTeste({ handleRenderiza, handleClose, handleClickOpen, open, pessoaAtual }) {
  /* const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }; */ 
  const [nomeAtual, setNome] = React.useState("");
  const [emailAtual, setEmail] = React.useState("");

  React.useEffect(()=>{
    setNome(pessoaAtual._nome);
    setEmail(pessoaAtual._email); 
  },[open]) 

  function handleSalvaPessoa( nome, email) {
    try {
      //let mensagem = "";
      const obj = {
        id:pessoaAtual._id,
        nome: nomeAtual,
        email: emailAtual,
        contatos: []        
      }
      
      let acao = pessoaAtual._id <= 0?"salvo":"alterado";
      
      if(pessoaAtual._id <= 0){
        //Cria novo
        salvaNovaPessoa(obj, acao);
      }
      else {
        //Altera
        alteraPessoa(obj, acao);
      } 
      
    } catch (error) {
/*       let msgErro = error.response?.data?.erros;
      console.error("Erro :", error.response?.data?.erros);
      //toast.error(`Erro: ${msgErro}`); 
      handleRenderiza(0, msgErro);   */   
    }
  }

  async function salvaNovaPessoa(obj,acao){
    await Api.post("api/Pessoa",obj)
        .then((response)=>{
          console.log(response.data);
          let mensagem = `A pessoa ${nome} foi ${acao} com sucesso!!`;
          console.log(mensagem);
          handleRenderiza(1, mensagem);

        }).catch((error)=>{
          let msgErro = error.response?.data?.erros;
          console.log("Erro :", error.response?.data?.erros);                   
          handleRenderiza(0, msgErro);   

        });

  }

  async function alteraPessoa(obj,acao){
    await Api.put(`api/Pessoa/${pessoaAtual._id}`,obj)
        .then((response)=>{
          console.log(response.data);
          let mensagem = `A pessoa ${nome} foi ${acao} com sucesso!!`;
          handleRenderiza(1, mensagem);
        }).catch((error)=>{
          let msgErro = error.response?.data?.erros;
          console.log("Erro :", error.response?.data?.erros);          
          handleRenderiza(0, msgErro);   
        });
  }

  

  return (
    <>
      {/*       <Button variant="outlined" onClick={handleClickOpen}>
        Inserir novo
      </Button> */}
      {/* <ToastContainer limit={1} containerId={"modal1"} position={"top-right"} /> */}
      <div style={{ textAlign: "center", paddingTop: "12px" }}>
        <Button onClick={handleClickOpen} variant="contained" endIcon={<Add />}>
          Inserir nova pessoa
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
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const nome = formJson.nome;
            const email = formJson.email;
            handleSalvaPessoa(nome, email);
            console.log(`Nome: ${nome} | Email: ${email}`);
            handleClose();            
          },
        }}
      >
        <DialogTitle>{pessoaAtual._id <=0?'Cadastro':'Alteração'} de pessoa - id: {pessoaAtual._id}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            required
            margin="dense"
            id="nome"
            name="nome"
            label="Nome"
            value={nomeAtual}
            onChange={(e) => setNome(e.target.value)}
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Email"
            value={emailAtual}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            fullWidth
            variant="outlined"
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
