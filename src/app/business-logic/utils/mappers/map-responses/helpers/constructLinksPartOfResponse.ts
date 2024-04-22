import { ResourceName } from "../../../../../domain/types/common/enums/resourceName"
import { config } from "../../../../../config/config"

export const getLinksPartOfResponse = (id: string, resourceName: ResourceName) => {
  const links = {
    self: `/${config.API.Prefix}/${config.API.Version}/${resourceName}/${id}`,
    update: {
      href: `/${config.API.Prefix}/${config.API.Version}/${resourceName}/${id}`,
      method: 'PATCH',
    },
    delete: `/${config.API.Prefix}/${config.API.Version}/${resourceName}/${id}`,
  };
  return links;
};
