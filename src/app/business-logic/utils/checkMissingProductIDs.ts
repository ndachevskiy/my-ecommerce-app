import { Context } from '../../domain/types/context/context';

export const checkMissingProductIDs = async (
  productIds: string[],
  context: Context
) => {
  const uniqueProductIds = [...new Set(productIds)];
  const products = await context.repositories.productRepository.findByParams({
    filter: `ids=${uniqueProductIds.join(',')}`,
  });
  const foundIds = products.map((product) => product.id);
  const missingIds = uniqueProductIds.filter(
    (id) => !foundIds.includes(id as string)
  );

  return missingIds;
};
