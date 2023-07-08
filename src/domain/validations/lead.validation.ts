import * as yup from "yup";

export const leadValidation = yup.object({
  id: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().required().email(),
});
