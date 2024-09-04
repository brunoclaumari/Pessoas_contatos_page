import CardListaContatos from "@/components/CardListaContatos";


import { Inter } from "next/font/google";
import styles from '@/styles/ListaCardContatos.module.css'
import { useRouter } from "next/router";





export default function Contatos(props){

    const router = useRouter();
    const pessoaId = router.query.pessoaId;

    //const inter = Inter({ subsets: ["latin"] });

    /* function paginaAnterior(){
        router.back()
    } */

    return (
        <>
        <div className={`${styles.main} `} >
            {/* ${inter.className} */}
            {/* <IoArrowBackCircleSharp size={80} onClick={paginaAnterior} style={{ cursor: 'pointer' }}  /> */}            
            <CardListaContatos pessoaId={pessoaId} />

        </div>
        </>
    );
}