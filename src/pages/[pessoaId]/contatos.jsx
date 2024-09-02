import { useRouter } from "next/router";




export default function Contatos(props){

    const router = useRouter();
    const pessoaId = router.query.pessoaId;

    return (
        <div>
            
            <p>Pessoa passada: {pessoaId}</p>
            <button onClick ={()=> router.back()}>
                    {'< Voltar'}
                </button>
            {/* <button onClick ={()=> window.history.back()}>
                    {'< Voltar'}
                </button> */}
        </div>
    );
}