import * as Yup from 'yup';

export const todoValidationSchema = Yup.object({
  name: Yup.string()
    .min(3)
    .required(),
  description: Yup.string()
    .min(5)
    .required()
}); 