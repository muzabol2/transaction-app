import { useFetch } from '../hooks/useFetch';
import dayjs from 'dayjs';

export default function TransactionsTable({ transactions, reloadData }: any) {
   const { error, deleteData } = useFetch();

   const deleteDocument = (id: string) => {
      deleteData(id);
      reloadData();
   }

   return (
      <ul className="transactions">
         {transactions ?
            transactions
               .sort((a: any, b: any) => Number(new Date(b.date)) - Number(new Date(a.date)))
               .map((t: any) => (
                  <li key={t.id}>
                     <p className='date'>{dayjs(t.date).format('DD.MM.YYYY').toString()}</p>
                     <div className="wrapper">
                        <p className='beneficiary'>{t.beneficiary.toUpperCase()}</p>
                        <p className='description'>{t.description}</p>
                        <p className={`amount ${t.amount < 0 ? "negative" : ""}`}>{t.amount.toFixed(2)}</p>
                        <p className='long'>account: {t.account}</p>
                        <p className='long'>address: {t.address}</p>
                     </div>
                     <button onClick={() => deleteDocument(t.id)}>x</button>
                  </li>
               ))
            :
            <p className='error'>{error}</p>
         }
      </ul>
   )
}
