import { useFetch } from '../../../hooks/useFetch';
import styles from './TransactionsTable.module.css';
import currencyFormat from '../../../utils/currencyFormat';
import { dateFormat } from '../../../utils/dateFormat';

export default function TransactionsTable({ transactions, reloadData }: any) {
   const { error, deleteData } = useFetch();

   const deleteDocument = (id: string) => {
      deleteData(id);
      reloadData();
   }
   const negativeAmount = (t: any) => t.amount < 0 ? styles.negative : '';

   return (
      <ul className={styles.transactions}>
         {transactions ?
            transactions
               .sort((a: any, b: any) => Number(new Date(b.date)) - Number(new Date(a.date)))
               .map((t: any) => (
                  <li key={t.id}>
                     <p className={styles.date}>{dateFormat(t.date)}</p>
                     <div className={styles.wrapper}>
                        <p className={styles.beneficiary}>{t.beneficiary.toUpperCase()}</p>
                        <p className={styles.description}>{t.description}</p>
                        <p className={`${styles.amount} ${negativeAmount(t)}`}>{currencyFormat(t.amount)}</p>
                        <p className={styles.long}>account: {t.account}</p>
                        <p className={styles.long}>address: {t.address}</p>
                     </div>
                     <button onClick={() => deleteDocument(t.id)}>x</button>
                  </li>
               ))
            :
            <p className={styles.error}>{error}</p>
         }
      </ul>
   )
}
