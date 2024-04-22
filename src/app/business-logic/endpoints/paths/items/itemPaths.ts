import { config } from '../../../../config/config'

export const readItemsPath = `/${config.API.Prefix}/${config.API.Version}/${config.API.Resources.Items}/:id?`