import { config } from '../../../../config/config'

export const readCustomersPath = `/${config.API.Prefix}/${config.API.Version}/${config.API.Resources.Customers}/:id?`