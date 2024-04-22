import { Customer } from "../../repository-entitites"

export const isCustomer = (data: any): data is Customer => data && typeof data.password === 'string';