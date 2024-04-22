import { config } from '../../../../config/config'

export const readOrdersPath = `/${config.API.Prefix}/${config.API.Version}/${config.API.Resources.Orders}/:id?`
export const createOrderPath = `/${config.API.Prefix}/${config.API.Version}/${config.API.Resources.Orders}`
export const updateOrderPath = `/${config.API.Prefix}/${config.API.Version}/${config.API.Resources.Orders}/:id?`