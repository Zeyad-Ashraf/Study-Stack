import { WhereOptions } from 'sequelize';
import { Model, ModelStatic } from 'sequelize-typescript';

export abstract class DbRepoServices<TDocument extends Model> {
  constructor(private readonly model: typeof Model & ModelStatic<TDocument>) {}

  async create(
    data: Partial<TDocument['_creationAttributes']>,
  ): Promise<TDocument> {
    return await this.model.create(data as TDocument['_creationAttributes']);
  }

  async findOne(
    query: WhereOptions<TDocument['_attributes']>,
  ): Promise<TDocument | null> {
    return await this.model.findOne({ where: query });
  }

  async findById(id: number | string): Promise<TDocument | null> {
    return await this.model.findByPk(id);
  }

  async findOneAndUpdate(
    id: number | string,
    query: Partial<TDocument['_attributes']>,
  ): Promise<TDocument | null> {
    const [affectedCount] = await this.model.update(query, {
      where: { id } as unknown as WhereOptions<TDocument['_attributes']>,
    });

    if (affectedCount === 0) {
      return null;
    }
    return await this.model.findByPk(id);
  }

  async findOneAndUpdateByEmail(
    query: WhereOptions<TDocument['_attributes']>,
    data: Partial<TDocument['_attributes']>,
  ): Promise<TDocument | null> {
    const [affectedCount] = await this.model.update(data, {
      where: query,
    });

    if (affectedCount === 0) {
      return null;
    }
    return await this.model.findOne({ where: query });
  }

  async findOneAndDelete(id: number | string): Promise<TDocument | null> {
    const instance = await this.model.findByPk(id);
    if (!instance) return null;
    await instance.destroy();
    return instance;
  }
}
