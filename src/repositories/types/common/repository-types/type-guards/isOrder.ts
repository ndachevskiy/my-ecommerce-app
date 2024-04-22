import { Order } from "../../repository-entitites"

export const isOrder = (data: any): data is Order => data && Array.isArray(data.itemsIds);