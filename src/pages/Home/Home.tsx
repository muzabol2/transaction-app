import { useFetch } from '../../hooks/useFetch'
import { useState } from 'react';
import Balance from "./balance/Balance";
import Filter from "./filter/Filter";
import TransactionForm from "./transactionForm/TransactionForm";
import TransactionsTable from "./transactionsTable/TransactionsTable";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import styles from './Home.module.css';

export default function Home() {
   const { data, isPending, error, success, getData } = useFetch();
   const [currentFilter, setCurrentFilter] = useState<string | null>(null);

   
   const changeFilter = (newFilter: any) => {
      setCurrentFilter(newFilter);
   }

   const sum = data?.map(x => x.amount).reduce((a: number, b: number) => a + b, 0);

   const reloadData = () => getData();

   const beneficiary = data ?
      data?.filter(document => {
         if (currentFilter === null) {
            return true;
         }
         return document?.beneficiary === currentFilter;
      })
      :
      null;

   return (
      <main className={styles.main}>
         <ToastContainer />
         <div className={styles.container}>
            <div className={styles.upperpart}>
               <div className={styles.upperleftpart}>
                  <Balance sum={sum} />
                  <Filter data={data} changeFilter={changeFilter} />
               </div>
               <TransactionForm reloadData={reloadData} />
            </div>
            <TransactionsTable transactions={beneficiary} reloadData={reloadData} />
         </div>
      </main>
   )
}
