import { useFormik, FormikProvider, Form, Field } from 'formik';
import { transactionSchema } from './helpers/validateTransaction';
import { validateYupSchemaMultiErrors } from './helpers/validateFormikMultiErrors';
import { currentLongDateFormat } from '../../../utils/dateFormat';
import { Grid } from '@mui/material';
import { useFetch } from '../../../hooks/useFetch';
import { TextFormField } from '../../../components/TextFormField';
import styles from './TransactionForm.module.css';

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
            date: currentLongDateFormat()
         })
         resetForm();
         reloadData();
      }
   });

   const { handleSubmit, resetForm } = transactionFormik;

   return (
      <FormikProvider value={transactionFormik}>
         <Form onSubmit={handleSubmit}>
            <div className={styles.transactionform}>
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
                  <button type="submit">
                     ADD TRANSACTION
                  </button>
               </Grid>
            </div>
         </Form>
      </FormikProvider>
   )
}
