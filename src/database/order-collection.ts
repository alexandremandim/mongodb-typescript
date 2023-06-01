import { CollectionClient } from './collection-client';
import _ from 'lodash';

/**
 * Database to store orders history in a trading system.
 */

export type OrderType = 'market' | 'limit' | 'stop';

export type OrderSide = 'buy' | 'sell';

export type Order = {
  _id: string;
  price: number;
  quantity: number;
  side: OrderSide;
  symbol: string;
  timestamp: Date;
  type: OrderType;
  userId: string;
};

export class OrderCollection extends CollectionClient<Order> {
  constructor() {
    super('orders');
  }

  /**
   * Querying is lazy, which means that the results are returned in batches.
   */

  async getAllOrders() {
    return this.findAll();
  }

  /**
   * Example of querying with multiple keys and projection (which keys to return).
   */
  async getOrdersQuantityBySideAndType(
    orderSide: OrderSide,
    orderType: OrderType
  ) {
    return this.findAll(
      { side: orderSide, type: orderType },
      { projection: { quantity: 1, _id: 0 } }
    );
  }

  /**
   * Example of using query conditionals (eg: "$lt", "$lte", "$gt", "$gte", "$ne")
   */
  async getOrdersByPrice(quantity: number) {
    return this.findAll({ quantity: { $gte: quantity } });
  }

  /**
   * "$in" , "$nin", "$not", "$mod"
   */
  async getLimitAndMarketOrders() {
    return this.findAll({ type: { $in: ['limit', 'market'] } });
  }
}
