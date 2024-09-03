import CardListaContatos from "@/components/CardListaContatos";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/router";
import { IoArrowBackCircleSharp } from "react-icons/io5";




export default function Contatos(props){

    const router = useRouter();
    const pessoaId = router.query.pessoaId;

    function paginaAnterior(){
        router.back()
    }

    return (
        <div>
            
            <p>Pessoa passada: {pessoaId}</p>
            {/* <ArrowBack  onClick ={()=> router.back()}/> */}
            <IoArrowBackCircleSharp size={80} onClick={paginaAnterior} style={{ cursor: 'pointer' }}  />
            <CardListaContatos pessoaId={pessoaId} />

        </div>
    );
}