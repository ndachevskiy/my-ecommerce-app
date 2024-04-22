export const mapEntityToRepository = (entity: string) => {
    if (entity === 'products') return 'productRepository'
    if (entity === 'orders') return 'orderRepository'
    if (entity === 'customers') return 'customerRepository'
    if (entity === 'items') return 'itemRepository'
}