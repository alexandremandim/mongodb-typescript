import _ from 'lodash';
import { ObjectId } from 'mongodb';
import { OrderCollection, Order, OrderType } from './order-collection';

export class Utils {
  static async insertManyRandomOrders(
    numberOfOrders: number = 100,
    symbol: string[] = ['BTC-USD']
  ) {
    const orderCollection = new OrderCollection();

    const documents: Order[] = _.times(numberOfOrders, () => {
      let type: OrderType;

      switch (_.random(3)) {
        case 0:
          type = 'limit';
          break;
        case 1:
          type = 'market';
          break;
        default:
          type = 'stop';
      }

      return {
        _id: new ObjectId().toString(),
        price: _.random(10_000, 20_000, true),
        quantity: _.random(0.1, 3, true),
        side: _.random(0, 1) ? 'buy' : 'sell',
        symbol: symbol[_.random(symbol.length)],
        timestamp: new Date(),
        type,
        userId: _.random(0, 1_000_000, true).toString(),
      };
    });

    const { insertedCount } = await orderCollection.insertMany(documents);

    console.log(`Created ${insertedCount} documents.`);

    orderCollection.close();
  }
}
