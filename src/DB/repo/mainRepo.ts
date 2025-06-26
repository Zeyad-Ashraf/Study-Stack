import { UpdateOptions, WhereOptions } from 'sequelize';
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
    query: UpdateOptions<TDocument['_attributes']>,
  ): Promise<TDocument | null> {
    const [affectedCount] = await this.model.update(query, {
      where: { id } as unknown as WhereOptions<TDocument['_attributes']>,
    });

    if (affectedCount === 0) {
      return null;
    }
    return await this.findById(id);
  }

  async findOneAndDelete(id: number | string): Promise<TDocument | null> {
    const instance = await this.findById(id);
    if (!instance) return null;
    await instance.destroy();
    return instance;
  }
}
