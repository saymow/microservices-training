import { ValidationChain } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";

export function withValidation(...validationChain: ValidationChain[]) {
  return [validationChain, validateRequest];
}
