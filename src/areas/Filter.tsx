import { Autocomplete, TextField } from '@mui/material';

export default function Filter({ data, changeFilter }: any) {

   let filterList = data?.map((x: any) => x.beneficiary);
   
   let nodupli = filterList?.filter((c: any, index: any) => {
      return filterList?.indexOf(c) === index;
   });

   return (
      <div className="item filter">
         <Autocomplete
            options={nodupli ? nodupli : []}
            sx={{
               width: 300,
               backgroundColor: 'white',
               borderRadius: '10px'
            }}
            renderInput={(params) =>
               <TextField {...params} label="Beneficiary" />
            }
            onChange={(event, newValue) => {
               changeFilter(newValue);
            }}
         />
      </div>
   )
}
