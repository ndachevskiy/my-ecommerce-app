import { isCustomer,isItem,isOrder,isProduct, Order, Customer, Product } from "../../../../../../repositories"
import { ResourceName } from "../../../../../domain/types/common/enums/resourceName"
import { getLinksPartOfResponse } from "./constructLinksPartOfResponse";
import { config } from "../../../../../config/config"

export const handleSingleEntity = (repositoryEntity: any) => {
    if (isCustomer(repositoryEntity)) {
      delete repositoryEntity.password;
      return {
        data: repositoryEntity,
        links: getLinksPartOfResponse (repositoryEntity.id, ResourceName.Customers)
      };
    } else if (isProduct(repositoryEntity)) {
      return {
        data: repositoryEntity,
        links: getLinksPartOfResponse (repositoryEntity.id, ResourceName.Products)
      };
    } else if (isOrder(repositoryEntity)) {
      return {
        data: {
          ...repositoryEntity,
          createdBy: {
            data: { id: repositoryEntity.createdBy },
            self: `/${config.API.Prefix}/${config.API.Version}/${config.API.Resources.Customers}/${repositoryEntity.createdBy}`
          },
          itemsIds: repositoryEntity.itemsIds.map(id => ({
            data: { id },
            self: `/${config.API.Prefix}/${config.API.Version}/${config.API.Resources.Items}/${id}`
          }))
        },
        links: getLinksPartOfResponse(repositoryEntity.id, ResourceName.Orders)
      };
    } else if (isItem(repositoryEntity)) {
      return {
        data: {
          ...repositoryEntity,
          productId: {
            data: { id: repositoryEntity.productId },
            self: `/${config.API.Prefix}/${config.API.Version}/${config.API.Resources.Products}/${repositoryEntity.productId}`
          },
          orderId: {
            data: { id: repositoryEntity.orderId },
            self: `/${config.API.Prefix}/${config.API.Version}/${config.API.Resources.Orders}/${repositoryEntity.orderId}`
          }
        },
        links: getLinksPartOfResponse(repositoryEntity.id, ResourceName.Items)
      };
    } else {
      throw new Error('Unrecognized entity type');
    }
  };
  