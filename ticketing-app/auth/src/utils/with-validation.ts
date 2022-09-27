import { ValidationChain } from "express-validator";
import { validateRequest } from "@saymowtickets/common";

export function withValidation(...validationChain: ValidationChain[]) {
  return [validationChain, validateRequest];
}
