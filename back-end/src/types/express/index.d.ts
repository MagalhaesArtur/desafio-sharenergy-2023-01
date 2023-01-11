import { AdmProps } from "../../interfaces";

declare global {
  namespace Express {
    export interface Request {
      userAux: Partial<AdmProps>;
    }
  }
}
