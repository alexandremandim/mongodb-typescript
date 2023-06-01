import { OrderCollection } from './database/order-collection';

(async () => {
  const orderCollection = new OrderCollection();

  try {
    const documentsFound = await orderCollection.getOrdersQuantityBySideAndType(
      'sell',
      'limit'
    );

    console.log(`Found ${documentsFound.length} documents.`);
  } catch (e) {
    console.log(e);
  } finally {
    orderCollection.close();
  }
})();
