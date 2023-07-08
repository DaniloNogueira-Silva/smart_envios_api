import * as yup from "yup";

export const intentionValidation = yup.object({
  id: yup.string().required(),
  zipcode_start: yup.string().required(),
  zipcode_end: yup.string().required(),
  lead_id: yup.string().required(),
});
