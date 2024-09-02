


import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Add } from '@mui/icons-material';
import { Alert } from '@mui/material';

export default function ModalTeste() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSalvaPessoa(nome, email){
    try {
        
        /* const response = await Api.post("api/Pessoa/semcontatos");
        console.log(response.data) ; */
        alert(`O ${nome} foi salvo com sucesso`);
        

        } catch (error) {
            console.error("Erro :", error);
            alert(`Ocorreu um erro ${error}`);
/*            return <Alert variant="filled" severity="error">
            
            </Alert> */
        }
    }

  return (
    <>
        
{/*       <Button variant="outlined" onClick={handleClickOpen}>
        Inserir novo
      </Button> */}
      <div style={{textAlign : 'center', paddingTop:'12px' }}>
      <Button onClick={handleClickOpen}  variant="contained" endIcon={<Add />}>
        Inserir nova pessoa
        </Button>
      </div>
        <br />
        
      
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const nome = formJson.nome;
            const email = formJson.email;
             handleSalvaPessoa(nome,email);
            console.log(`Nome: ${nome} | Email: ${email}`);
            handleClose();
          },
        }}
      >
        <DialogTitle>Cadastro de pessoa</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            required
            margin="dense"
            id="nome" name="nome"
            label="Nome"
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