import { Item } from "../../repository-entitites"

export const isItem = (data: any): data is Item => data && typeof data.quantity === 'number';