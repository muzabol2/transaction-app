import { Autocomplete, TextField } from '@mui/material';
import styles from './Filter.module.css';

export default function Filter({ data, changeFilter }: any) {

   let filterList = data?.map((x: any) => x.beneficiary);

   let nodupli = filterList?.filter((c: any, index: any) => {
      return filterList?.indexOf(c) === index;
   });

   return (
      <div className={styles.filter}>
         <Autocomplete
            options={nodupli ? nodupli : []}
            className={styles.autocomplete}
            renderInput={params => <TextField {...params} label="Beneficiary" />}
            onChange={(_, newValue) => changeFilter(newValue)}
         />
      </div>
   )
}
