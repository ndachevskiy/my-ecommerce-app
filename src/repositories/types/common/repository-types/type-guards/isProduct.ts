import { Product } from "../../repository-entitites"

export const isProduct = (data: any): data is Product => data && typeof data.price === 'number';