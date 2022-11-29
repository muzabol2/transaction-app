import * as yup from 'yup';

const regExp = {
   account: /^\w{2}\d+$/,
   beneficiary: /^[\s\p{L}0-9]+$/u,
   amount: /^(\d{0,12})([.,]\d{0,2})?$/,
}

export const transactionSchema = yup.object({
   beneficiary: yup
      .string()
      .min(5, "5-35 characters\n")
      .max(35, "5-35 characters\n")
      .matches(regExp.beneficiary, "Only letters, numbers and spaces")
      .required("Required"),
   description: yup
      .string()
      .min(3, "3-100 characters\n")
      .max(100, "3-100 characters\n")
      .required("Required"),
   account: yup
      .string()
      .matches(regExp.account, "First 2 characters can be letters or digits, and other only digits")
      .required("Required"),
   amount: yup
      .string()
      .matches(regExp.amount, "\u2022 Only positive numbers\n\u2022 max 12 digits\n\u2022 dot(.) or comma(,) separator\n\u2022 only 2 decimal places")
      .required("Required"),
});
