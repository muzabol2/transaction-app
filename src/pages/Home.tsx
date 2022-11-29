import { useFetch } from '../hooks/useFetch'
import { useState } from 'react';
import Balance from "../areas/Balance";
import Filter from "../areas/Filter";
import TransactionForm from "../areas/TransactionForm";
import TransactionsTable from "../areas/TransactionsTable";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

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
      <main>
         <ToastContainer />
         <div className="container">
            <div className="upper-part">
               <div className="upperleft-part">
                  <Balance sum={sum} />
                  <Filter
                     data={data}
                     changeFilter={changeFilter}
                  />
               </div>
               <TransactionForm reloadData={reloadData} />
            </div>
            <TransactionsTable
               transactions={beneficiary}
               reloadData={reloadData} />
         </div>
      </main>
   )
}
