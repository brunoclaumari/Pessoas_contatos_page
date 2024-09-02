
import styles from '@/styles/ListaCardPessoa.module.css';

export default function CardPessoa( props){  

    return (
        <div className={styles.card_div} >
            <div>
                <p>Nome: Fulano de tal</p>
                <p>Email: fulano@fulano.com</p>
            </div>
            <div>
            {/* <Button variant="outlined">Ver contatos</Button> */}
            <button>Ver contato</button>
            </div>
        </div>
    )
}