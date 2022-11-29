import { useFormik, FormikProvider, Form, Field } from 'formik';
import { transactionSchema } from './validateTransaction';
import { validateYupSchemaMultiErrors } from './validateFormikMultiErrors';
import dayjs from 'dayjs';
import { Grid } from '@mui/material';
import { ColorButton } from '../components/ColorButton';
import { useFetch } from '../hooks/useFetch';
import { TextFormField } from '../components/TextFormField';

export default function TransactionForm({ reloadData }: any) {
   const { postData, error, success } = useFetch();
   const transactionElements = ["amount", "beneficiary", "account", "address", "description"];
   const toNumber = (amount: string) => Number(amount.replace(/,/, '.')) * (-1);

   const transactionFormik = useFormik({
      initialValues: {
         amount: "",
         beneficiary: "",
         account: "",
         address: "",
         description: ""
      },
      validate: values => validateYupSchemaMultiErrors(values, transactionSchema),
      onSubmit: ({ amount, beneficiary, account, address, description }) => {
         postData({
            amount: toNumber(amount),
            beneficiary,
            account,
            address,
            description,
            date: dayjs().format('YYYY-MM-DDTHH:mm:ss').toString()
         })
         resetForm();
         reloadData();
      }
   });

   const { handleSubmit, resetForm } = transactionFormik;

   return (
      <FormikProvider value={transactionFormik}>
         <Form onSubmit={handleSubmit}>
            <div className="transaction-form">
               {transactionElements.map(element =>
                  <Grid mt={1} key={element}>
                     <Field
                        label={element}
                        name={element}
                        component={TextFormField}
                     />
                  </Grid>
               )}
               <Grid mt={1} mb={1}>
                  <ColorButton type="submit">
                     Add Transaction
                  </ColorButton>
               </Grid>
            </div>
         </Form>
      </FormikProvider>
   )
}
