import { FormControl, FormHelperText, TextField } from "@mui/material";
import { FieldProps, getIn } from "formik";


export const TextFormField: React.FC<FieldProps> = ({ field, form, ...props }) => {

   const errorText = getIn(form.touched, field.name) && getIn(form.errors, field.name);

   return (
      <FormControl error={!!errorText} style={{ width: '270px' }}>
         <TextField
            fullWidth
            size="small"
            style={{ backgroundColor: 'white', borderRadius: '10px' }}
            id={field.name}
            type="text"
            {...field}
            {...props}
            error={!!errorText}
         />
         {errorText && <FormHelperText error>{errorText}</FormHelperText>}
      </FormControl>
   );
};
