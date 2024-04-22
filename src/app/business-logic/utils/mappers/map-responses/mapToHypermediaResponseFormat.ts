import { EntityType } from "../../../../../repositories"
import { handleSingleEntity } from "./helpers/handleSingleEntity";

export const mapToHypermediaResponseFormat = (repositoryEntity: EntityType | EntityType[]) => {
    if (Array.isArray(repositoryEntity)) {
      return repositoryEntity.map(entity => handleSingleEntity(entity));
    } else {
      return handleSingleEntity(repositoryEntity);
    }
  };
  