import {
  Collection,
  Document,
  Filter,
  FindOptions,
  MongoClient,
  OptionalUnlessRequiredId,
} from 'mongodb';
import config from 'config';

export class CollectionClient<T extends Document> {
  private client: MongoClient;
  private collection: Collection<T>;

  constructor(collectionName: string) {
    this.client = new MongoClient(
      config.get('database.url'),
      config.get('database.options')
    );
    const database = this.client.db(config.get<string>('database.name'));
    this.collection = database.collection<T>(collectionName);
  }

  async close() {
    await this.client.close();
  }

  async deleteOne(filter: Filter<T>) {
    const delRes = await this.collection.deleteOne(filter);

    console.log(`Deleted ${delRes.deletedCount} documents.`);

    return delRes;
  }

  async findOne(
    filter: Filter<T> = {},
    options: FindOptions<T> = {}
  ): Promise<T | null> {
    const element = await this.collection.findOne<T>(filter, options);

    if (!element) {
      console.log('Element not found');
    }

    return element;
  }

  async findAll(filter: Filter<T> = {}, options: FindOptions<T> = {}) {
    const allDocuments = await this.collection.find(filter, options).toArray();

    if (!allDocuments.length) {
      console.log('There are no documents in the collection!');
    }

    return allDocuments;
  }

  async insertOne(document: OptionalUnlessRequiredId<T>) {
    const insertOneResult = await this.collection.insertOne(document);

    console.log(`Created document with _id ${insertOneResult.insertedId}`);

    return insertOneResult;
  }

  async insertMany(documents: OptionalUnlessRequiredId<T>[]) {
    return await this.collection.insertMany(documents);
  }

  /**
   * There are 2 types of updates: document replacement that updates one document with another, and using modifiers.
   * With Modifiers we can modify only certain values of the document. "_id" cannot be changed with modifiers but
   * can be changed with document replacement.
   */
  async updateOne(filter: Filter<T>, partialDocument: Partial<T>) {
    /**
     * updateOne() will update the first element that matches the criteria.
     *
     * $set will update or create if not exists the value of a key.
     * $inc change the value of the key or create if not exists. It will add/subtract the passed value to the current value.
     *      only works for numeric types.
     * $push adds elt to the end of the array. If we want to add if only not exist, we can use $ne in the query.
     * $addToSet same as push but only adds if not exist in the array,
     *
     * Remove elements:
     * $pop removes last or first elt from the array
     * $pull removes elt based on some criteria.
     */
    const result = await this.collection.updateOne(filter, {
      $set: partialDocument,
    });

    this.collection.find;

    if (!result.acknowledged) {
      console.log('Failed to update');
      throw new Error('updateOne failed');
    }

    console.log(`Updated ${result.modifiedCount} document.`);
  }
}
