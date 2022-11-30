import currencyFormat from '../../../utils/currencyFormat';
import styles from './Balance.module.css';

export default function Balance({ sum }: any) {
   return (
      <div className={styles.balance}>
         {sum ? `Saldo ${currencyFormat(sum)}` : "Balance: 0 PLN"}
      </div>
   )
}
